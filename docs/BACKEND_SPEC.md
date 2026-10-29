# BACKEND_SPEC — SOFEIN Procurement en Supabase

Especificación para pasar la maqueta actual (front en `app.js` con datos de ejemplo en memoria y `localStorage`) a una aplicación real con **Supabase** (Postgres + Auth + RLS + Storage + Edge Functions). El front seguirá en Vercel (`sofein-procurement`).

Este documento recoge **la lógica que hoy vive en el navegador** para que no se pierda al crear la base de datos. Estado de referencia: assets `?v=procurement-v60` (29/10/2026).
Las decisiones de producto vienen de `docs/PETICIONES_EXPEDIENTE.md` y de las entradas de `HANDOFF.md`.

---

## 1. Principios

1. **La base de datos es la fuente de verdad.** Ninguna regla de negocio importante se queda solo en el front: visibilidad, estados, firmas, cierres y avisos se garantizan en Postgres (RLS, constraints y triggers) o en Edge Functions.
2. **Permisos por fila (RLS) en todas las tablas.** Un proveedor nunca recibe filas de suministros que no le afectan, aunque manipule el front.
3. **Acciones de negocio = funciones del servidor.** Validar un expediente, cerrar un registro, adjudicar o avanzar de fase se hacen con RPC (`supabase.rpc`) o Edge Functions transaccionales, no con varios `update` sueltos desde el navegador.
4. **Todo evento deja rastro.** Cada acción escribe en `actividad` (historial) y, si corresponde, en `avisos`. Lo genera el servidor, no el front.
5. **Sin claves en el cliente.** El front solo usa la `anon key` y la sesión del usuario. La `service_role` vive únicamente en Edge Functions (regla de `../CLAUDE.md`).
6. **Catálogos maestros.** `productos` y `conformidades` alimentan el resto: tipos de suministro, candidatos del selector, conformidades de proveedores y cotizaciones.

---

## 2. Arquitectura

| Pieza | Uso |
| :--- | :--- |
| Supabase Auth | Usuarios con email y contraseña o magic link. Cada usuario pertenece a una organización. |
| Postgres | Modelo de datos (sección 4), enums, constraints y triggers de historial y avisos. |
| RLS | Matriz de permisos (sección 6). |
| Storage | Adjuntos, documentos, certificados, adendas y pasaporte (sección 8). |
| RPC / Edge Functions | Acciones de negocio (sección 7): validaciones, firmas, cierres, adjudicación y PDFs. |
| Realtime (opcional) | Refrescar avisos y estados sin recargar. |
| Vercel | Front (`app.html` + `app.js`), que pasará de los arrays en memoria a la capa de datos (sección 10). |

Proyecto Supabase: uno por entorno (`sofein-dev`, `sofein-prod`). Las migraciones van versionadas en `supabase/migrations/` con la CLI de Supabase.

---

## 3. Identidad, organizaciones y roles

Perfiles de la plataforma (`rol_plataforma`):

| Rol | Quién | Qué ve |
| :--- | :--- | :--- |
| `admin` | Equipo SOFEIN | Todo. |
| `cliente` | Constructora (p. ej. Infraestructuras del Norte) | Sus expedientes y todo lo que SOFEIN marque visible para el cliente. |
| `proveedor` | Fabricante o suministrador (p. ej. IberRail) | Solo los suministros donde está adjudicado o donde se le pidió cotización, y lo marcado visible para el proveedor. |
| `destinatario` | Administrador de infraestructura (Adif, Metro…), modo auditoría | Pasaporte y documentos marcados para el destinatario; nunca importes. |

Modelo:
- `organizaciones` (tipo: `sofein` · `cliente` · `proveedor` · `destinatario`) ↔ fichas del directorio.
- `usuarios_perfil` (1:1 con `auth.users`): `organizacion_id` y `rol` (derivado del tipo de organización), más nombre y cargo.
- Helpers SQL `auth_rol()` y `auth_org_id()` (`security definer`, `stable`) para usarlos en las políticas RLS.

> Hoy la demo tiene un único usuario por perfil (IberRail = `PRV-01`, `SELECTOR_MY_PROVIDER_ID`). Con base de datos habrá N proveedores y N clientes. Todo lo que hoy compara con «IberRail» pasa a ser `organizacion_id = auth_org_id()`.

---

## 4. Modelo de datos

Convenciones:
- `id uuid default gen_random_uuid()` como clave primaria, más un **código legible** con su propio formato y `unique`.
- Siempre `created_at` y `updated_at`. `created_by uuid references auth.users`.
- Las fechas son `date` o `timestamptz`; nunca texto formateado (hoy hay `"14 oct 2026"` en los datos de ejemplo).
- Los importes son `numeric(14,2)` en EUR; nunca texto (hoy hay `"280.000 €"`).
- Toda tabla nueva del esquema `public` lleva los grants de PostgREST:

```sql
grant select on public.<tabla> to anon;
grant select, insert, update, delete on public.<tabla> to authenticated;
grant select, insert, update, delete on public.<tabla> to service_role;
```
(RLS activado: el `select` para `anon` no expone nada si no hay política para `anon`.)

### 4.1 Enums

```sql
create type rol_plataforma    as enum ('admin','cliente','proveedor','destinatario');
create type tipo_organizacion as enum ('sofein','cliente','proveedor','destinatario');
create type estado_expediente as enum ('pendiente_validacion','activo','cerrado');
create type confirmacion_cliente as enum ('no_aplica','pendiente','confirmado');
create type estado_suministro as enum ('activo','finalizado','cerrado');
create type fase as enum ('alcance','proveedores','pedido','cierre');             -- índices 0..3 del front (PHASES)
create type estado_documento as enum ('pendiente','en_revision','validado','con_observaciones');
create type paso_selector as enum ('busqueda','preseleccion','cotizacion','seleccion','adjudicado');
create type estado_cotizacion as enum ('pendiente','enviada','rechazada','adjudicada');
create type prioridad_aviso as enum ('normal','alta','urgente');
```

Correspondencia con el front:

| Front | Base de datos |
| :--- | :--- |
| `exp.estado: "pending_validation"` / `"review"` | `estado_expediente.pendiente_validacion` / `activo` |
| `doc.state: pending / review / complete / rejected` | `pendiente / en_revision / validado / con_observaciones` |
| `matching.faseSelector: preseleccion / seleccion_cliente / peticion_cotizaciones / comparativa / adjudicado` | `busqueda / preseleccion / cotizacion / seleccion / adjudicado` |
| `faseActual` 0..3 | `fase` enum (`alcance`…`cierre`) |

### 4.2 Catálogos maestros

**`productos`** (front: `CATALOGOS.productos`)
| Campo | Tipo | Notas |
| :--- | :--- | :--- |
| codigo | text unique | `PRD-01`… |
| tipo | text not null | Traviesas, Placas, Tirafondos, Clips, Balasto, Otros, o creados («Crear»). |
| subtipo | text null | Hormigón, Madera… («-» si no hay). |
| normas | text[] | Etiquetas («Añadir»). |
| activo | bool | Los inactivos no se ofrecen en los selectores, pero se conservan en lo existente. |

Única `(tipo, coalesce(subtipo,''))`. Vista `tipos_suministro` = `select distinct tipo from productos where activo`, que alimenta el «Tipo de Suministro» del constructor.

**`conformidades`** (front: `CATALOGOS.conformidades`)
| Campo | Tipo | Notas |
| :--- | :--- | :--- |
| codigo | text unique | `CNF-01`… |
| nombre | text unique | ISO 9001, AENOR EN 13230, Adif NAV-2026… |
| tipo | text | Sistema de gestión, Norma de producto, Homologación Adif, Marcado / Certificado, Sostenibilidad… («Crear»). |
| emisores | text[] | ENAC, AENOR… («Añadir»). |
| ambitos | text[] | Incluye tipos de producto («Añadir»). |
| activo | bool | |

> Renombrar una conformidad o un tipo debe propagarse (hoy lo hace `syncCatalogRename`). En base de datos conviene referenciar por `id` (tablas puente) en lugar de por nombre, y así el renombrado no rompe nada.

### 4.3 Directorio

**`organizaciones`**: codigo (`CLI-xx` / `PRV-xx`), tipo, nombre / razón social, cif (unique), sede, email, telefono, representante, actividad y condiciones de pago generales.

**`proveedor_suministros`** (front: `prv.suministros` y `prv.suministrosCondiciones[tipo]`)
`proveedor_id → organizaciones`, `tipo` (de `tipos_suministro`), `plazo_medio_dias int`, `condiciones_pago text`. Clave primaria `(proveedor_id, tipo)`.
Las condiciones por tipo tienen prioridad sobre las generales (`getProveedorCondiciones`).

**`organizacion_conformidades`** (front: `prv.conformidades` + `certificadosDetalle`)
`organizacion_id`, `conformidad_id`, `documento_id → documentos` (acreditación), `vigencia_hasta date`, `emisor`, `norma`, `estado` (vigente / caducada, calculado a partir de la fecha).
Una conformidad sin documento se muestra con «Subir».

**`acuerdos_marco`** (front: `prv.acuerdoMarco` y las acreditaciones del cliente)
`organizacion_id`, `estado` (firmado / pendiente), `vigencia`, `documento_id`.

### 4.4 Expedientes y suministros

**`expedientes`**
| Campo | Tipo | Notas |
| :--- | :--- | :--- |
| codigo | text unique | `SFN-YYYY-XXXX` (`generateExpedienteId`). |
| titulo | text | `tituloGenerico`. |
| cliente_id | uuid → organizaciones | |
| destinatario_id | uuid → organizaciones null | `destinatarioFinal`. |
| destino_texto | text | Texto libre con sugerencias (destinatarios ya usados). |
| fecha_objetivo | date | |
| presupuesto_estimado | numeric null | |
| notas | text | Visibles para SOFEIN y el cliente (cabecera de la ficha). |
| estado | estado_expediente | Solicitud del cliente → `pendiente_validacion`. |
| confirmacion_cliente | confirmacion_cliente | Creado por SOFEIN → `pendiente` hasta que el cliente pulsa «Confirmar expediente». |
| creado_por_rol | rol_plataforma | admin o cliente. |
| cerrado_at | timestamptz null | Cierre con pasaporte. |

**`suministros`**
| Campo | Tipo | Notas |
| :--- | :--- | :--- |
| codigo | text unique | `SUM-xx` (en producción conviene `SUM-<exp>-NN`). |
| expediente_id | uuid → expedientes | |
| tipo | text | De `tipos_suministro`. |
| descripcion | text | Se muestra bajo el tipo en las tarjetas. |
| especificaciones | text | Caja de texto amplia en la creación. |
| unidades | integer | **Siempre unidades contables** (decisión del 27/10). Hoy es texto («14.500»). |
| presupuesto | numeric null | Al adjudicar pasa a ser el precio total de la oferta ganadora. |
| fecha_entrega | date | La KPI «±N d» se calcula contra hoy. |
| proveedor_id | uuid → organizaciones null | null = «Por determinar». |
| fase | fase | Fase en curso. La del expediente se deriva como el máximo de sus suministros. |
| estado | estado_suministro | |

### 4.5 Documentación

**`documentos`** (front: `deliverables` por fase, en el expediente o en cada suministro)
| Campo | Tipo | Notas |
| :--- | :--- | :--- |
| expediente_id | uuid | |
| suministro_id | uuid null | null = general del expediente. Los adjuntos generales de creación se muestran en todos los suministros. |
| fase | fase | Se puede mover de fase (editar documento). |
| nombre | text | Nombre legible (independiente del nombre del archivo). |
| requerido_a | rol_plataforma null | `owner` del front: Cliente o Proveedor. null = subido sin requerimiento. |
| requerido_at | timestamptz null | «Requerido» («-» si null). |
| archivo_path | text null | Ruta en Storage. null = pendiente de subir. |
| archivo_nombre | text null | |
| subido_por_rol | rol_plataforma null | «Subido por». |
| subido_por | uuid null | |
| subido_at | timestamptz null | «Subido» («-» si null). |
| estado | estado_documento | |
| visible_cliente | bool | SOFEIN siempre lo ve. |
| visible_proveedor | bool | |
| visible_destinatario | bool | |
| notas | text | |
| motivo_observaciones | text null | |
| origen | text | `creacion` · `requerimiento` · `subida_libre` · `adenda` · `hoja_pedido` · `pasaporte`. |
| hash | text null | Sello SHA-256 (adendas y pasaporte). |

Reglas:
- Si suben el cliente o el proveedor, el documento queda `en_revision` y visible solo para SOFEIN y quien lo subió, hasta que SOFEIN lo valida y decide la visibilidad.
- Si sube SOFEIN, queda `validado` con la visibilidad elegida.
- «Subsanar» = nueva versión del archivo, que vuelve a `en_revision`. Conviene guardar versiones en `documento_versiones` (path, subido_por, subido_at) para no perder la anterior.
- Adjuntos de una solicitud de cliente: visibles solo para SOFEIN y el cliente hasta que SOFEIN valida la solicitud y asigna la visibilidad de cada adjunto.

### 4.6 Registro de incidencias y cambios

**`registros`** (front: `exp.incidencias`, REG-001…)
| Campo | Tipo | Notas |
| :--- | :--- | :--- |
| codigo | text | `REG-001` correlativo **por expediente**; único `(expediente_id, codigo)`. |
| expediente_id, suministro_id | uuid | |
| titulo, descripcion, solucion | text | La solución la propone SOFEIN. |
| registrado_at | timestamptz | Solo SOFEIN registra. |
| previo_fecha_entrega, previo_unidades, previo_presupuesto | | Foto del suministro al registrar (o al editar). |
| nueva_fecha_entrega, nuevas_unidades, nuevo_presupuesto | null | null = «Igual». |
| firma_cliente_at, firma_cliente_por, firma_cliente_nombre | | |
| firma_proveedor_at, firma_proveedor_por, firma_proveedor_nombre | | |
| adenda_codigo | text null | `ADENDA-<año>-NN` correlativo por expediente. |
| adenda_documento_id | uuid null | |
| cerrado_at | timestamptz null | Cerrado = las dos firmas. |

**`registro_adjuntos`**: registro_id, documento_id (con su visibilidad). **Sin límite** de adjuntos (decisión del 29/10).
**`anotaciones_internas`**: solo SOFEIN; texto, suministro, fase y autor. En el front tienen su propia pestaña «Anotaciones» (a la derecha de Avisos) y se guardan en el historial con `soloAdmin`.

Reglas (en RPC, no en el front):
- **Editar un registro borra las dos firmas** y vuelve a pedirlas.
- **Cerrar** (trigger al completarse la segunda firma):
  1. aplica `nueva_*` al suministro;
  2. genera la adenda (PDF + hash) como documento `validado`, visible para todos, en la fase en curso del suministro;
  3. escribe en el historial y lanza los avisos.
- Los registros cerrados son de solo lectura (no se editan ni se eliminan).
- **No hay silencio positivo** (eliminado el 26/10).
- Los registros cerrados aparecen en el pasaporte como adendas.

### 4.7 Selector de proveedores (por suministro)

**`selecciones`** (front: `sum.matching`), una por suministro
| Campo | Tipo | Notas |
| :--- | :--- | :--- |
| suministro_id | uuid unique | |
| paso | paso_selector | |
| preseleccion_cliente_enviada | bool | El cliente pulsó «Confirmar preselección y solicitar ofertas». |
| adjudicacion_confirmada_cliente | bool | El cliente pulsó «Confirmar adjudicación». |
| proveedor_elegido_id | uuid null | |
| validada_at | timestamptz null | SOFEIN «Validar adjudicación». |

**`seleccion_candidatos`**: seleccion_id, proveedor_id, `incluido_busqueda bool` (SOFEIN, paso 1), `pedir_cotizacion bool` (cliente o SOFEIN, paso 2).
Los candidatos iniciales son los proveedores con `proveedor_suministros.tipo = suministro.tipo`. **Sin mínimo de proveedores** (decisión del 29/10: no limitar a 3).

**`cotizaciones`**: seleccion_id, proveedor_id, `precio_unitario numeric`, `precio_total numeric` (**calculado en servidor** = unitario × unidades), `fecha_entrega date`, `condiciones_pago text`, `validez_dias int check (validez_dias >= 45)`, `enviada_at`, `estado estado_cotizacion`.
**`cotizacion_conformidades`**: cotizacion_id, conformidad_id (conformidades a las que se compromete).
**`seleccion_requisitos`**: seleccion_id, conformidad_id; las que el cliente exige de entre las que ofrece el proveedor elegido.

Confidencialidad: un proveedor **solo** lee su propia cotización. El cliente no ve las cotizaciones hasta `paso >= seleccion`. En el paso de cotización el cliente solo ve «En espera».

### 4.8 Formalización y pasaporte

- **`pedidos`** (front: `ensureExpedienteFormalizacion`; hoy es por expediente y conviene pasarlo **por suministro**): suministro_id, codigo (`PED-SOF-…`), proveedor_id, importe, fecha_entrega, condiciones_pago, firmas de cliente y proveedor (at y por) y validado_sofein_at. La hoja de pedido es un documento con `origen = 'hoja_pedido'`.
- **Pasaporte**: se genera al cerrar el expediente. Consolida hitos por fase, ensayos y certificados validados y adendas, con un hash SHA-256 por bloque. Se guarda como documento `origen = 'pasaporte'`, visible para todos (destinatario incluido).

### 4.9 Avisos e historial

**`avisos`** (front: `NOTICES` + `pushAutoNotice`)
| Campo | Tipo | Notas |
| :--- | :--- | :--- |
| expediente_id, suministro_id | | |
| categoria | text | Catálogo `NOTICE_CATEGORIAS` + las automáticas. |
| prioridad | prioridad_aviso | |
| titulo, descripcion | text | |
| accion_label | text | «Firmar», «Validar documento»… |
| ruta | text | Ruta del front sin el prefijo de rol (`expedientes/SFN-…?tab=…`, `selector/SFN-…?sum=SUM-…`). |
| automatico | bool | false = emitido a mano por SOFEIN. |
| creado_por | uuid | |

**`aviso_destinatarios`**: aviso_id, `organizacion_id` (o `rol` para todo el equipo SOFEIN), `completado_at` (hoy `completedNotices` / `discardedNotices` en memoria). Así un aviso al proveedor llega solo a **ese** proveedor.

**`actividad`** (front: `exp.registroCambios` + `addExpedienteCambioLog`; pestaña «Historial», solo SOFEIN)
expediente_id, suministro_id null, `fase`, tipo, titulo, detalle, autor_id, autor_rol, `interna bool` (anotación interna) y created_at. Solo inserción (sin update ni delete).

> **Historial oculto en la plataforma (29/10).** La pestaña «Historial» está oculta (`SHOW_HISTORY_TAB = false` en `app.js`), pero el registro sigue activo. Se apuntarán **todos** los eventos y **quién** los hace para diseñar el **backoffice** de SOFEIN; no se mostrará nada de esto en la plataforma hasta entonces. Al diseñar el backoffice: `actividad` + `auth.users`, con filtros por expediente, suministro, fase, tipo, persona y fecha. Hay que evitar entregar de más: primero registrar bien y después decidir qué se muestra.

---

## 5. Estados y transiciones

**Expediente**
- SOFEIN lo crea: `activo` + `confirmacion_cliente = pendiente` → el cliente confirma y pasa a `confirmado`.
- El cliente lo solicita: `pendiente_validacion` → SOFEIN valida (asigna la visibilidad de cada adjunto) → `activo`, y los suministros pasan a `proveedores`.
- Cualquier estado → `cerrado` (SOFEIN, con pasaporte) → reabrir (SOFEIN).

**Suministro (fase)**
- `alcance → proveedores → pedido → cierre`.
- «Completar fase» y «Reabrir fase» (al reabrir vuelve a esa fase) son solo de SOFEIN.
- **Se puede avanzar con documentación incompleta** (decisión del 29/10). El servidor devuelve la lista de documentos sin validar, el front avisa antes y, una vez avanzado, la fase sigue mostrando «N sin validar». Los documentos **no** se dan por validados al avanzar.
- Al validar la adjudicación pasa a `pedido`, con proveedor, precio y fecha de la oferta ganadora.
- Cerrar o reabrir el suministro es de SOFEIN.

**Documento**
`pendiente` (requerido) → `en_revision` (subido por cliente o proveedor) → `validado` | `con_observaciones` → subsanar → `en_revision`.

**Registro**
abierto (sin firmas) → firma de una parte → firma de la otra → **cerrado** (adenda). Editar con firmas → vuelve a sin firmas.

**Selector (por suministro)**
1. `busqueda`: SOFEIN marca candidatos (al menos uno) y pulsa «Validar».
2. `preseleccion`: el cliente marca «Pedir cotización» y confirma (aviso a SOFEIN); SOFEIN confirma y pide las ofertas.
3. `cotizacion`: cada proveedor envía o actualiza su oferta; SOFEIN pulsa «Validar cotizaciones».
4. `seleccion`: el cliente elige proveedor y requisitos y confirma; SOFEIN pulsa «Validar adjudicación».
5. `adjudicado`.

**Cotización (vista del proveedor)**
`pendiente` → `enviada` (actualizable mientras `paso = cotizacion`) → `adjudicada` | `rechazada` al validar la adjudicación.

---

## 6. Matriz de permisos (RLS)

Leyenda: L = leer · E = escribir/crear · — = nada. «Suyos» significa:
- cliente: `expedientes.cliente_id = auth_org_id()`;
- proveedor: el suministro tiene `proveedor_id = auth_org_id()` **o** existe una cotización suya en su selección.

| Tabla | admin | cliente | proveedor | destinatario |
| :--- | :--- | :--- | :--- | :--- |
| productos, conformidades | L/E | L | L | L |
| organizaciones | L/E | L (la suya + nombre y sede de proveedores en el selector) | L (la suya) | L (la suya) |
| proveedor_suministros, organizacion_conformidades | L/E | L (candidatos de sus selecciones) | L/E (las suyas) | — |
| expedientes | L/E | L (suyos), E (crear solicitud; confirmar) | L (con suministros suyos; sin importes globales) | L (los suyos, sin importes) |
| suministros | L/E | L (suyos) | L (suyos) | L |
| documentos | L/E | L si `visible_cliente` o lo subió; E (subir o subsanar los requeridos a cliente) | L si `visible_proveedor` y el suministro es suyo, o lo subió; E (los requeridos a proveedor) | L si `visible_destinatario` |
| registros, registro_adjuntos | L/E | L (suyos), firma vía RPC | L (de sus suministros), firma vía RPC | — |
| anotaciones_internas, actividad | L/E | — | — | — |
| selecciones, seleccion_candidatos | L/E | L desde `preseleccion`; E (`pedir_cotizacion`, requisitos y elección) vía RPC | — | — |
| cotizaciones | L/E | L desde `seleccion` | L/E (solo la suya, mientras `paso = cotizacion`) | — |
| pedidos | L/E | L (suyos), firma vía RPC | L (suyos), firma vía RPC | — |
| avisos / aviso_destinatarios | L/E | L (destinatario = su org), marcar como completado | ídem | ídem |

Notas:
- Los importes del suministro (presupuesto) no se muestran al destinatario: se resuelve con una vista sin columnas económicas o con `column privileges`.
- El proveedor solo ve el presupuesto de **sus** suministros (en el front, `formatSuministrosBudgetSum`).
- Las escrituras de negocio (firmas, validaciones, adjudicación, fases) **no** se permiten por `update` directo: van por RPC `security definer` que comprueban rol, estado y propiedad.

---

## 7. Acciones de servidor (RPC / Edge Functions)

Cada acción: comprueba permisos y estado → hace el cambio en una transacción → escribe en `actividad` → crea `avisos`.

| Acción | Quién | Efectos |
| :--- | :--- | :--- |
| `crear_expediente(datos, suministros[], adjuntos[])` | admin / cliente | Códigos, documentos de creación (fase alcance), notas. Si crea SOFEIN: `confirmacion_cliente = pendiente`. |
| `validar_solicitud(exp, visibilidad_por_documento)` | admin | → `activo`, adjuntos validados, suministros a `proveedores`. |
| `confirmar_expediente(exp)` | cliente | `confirmacion_cliente = confirmado`. |
| `requerir_documento(sum, fase, nombre, requerido_a, visibilidad, notas)` | admin | Documento `pendiente`. |
| `subir_documento(…)` / `subsanar_documento(doc, archivo)` | todos según permiso | Versión nueva, estado según quién sube. |
| `validar_documento(doc, decision, visibilidad, notas)` | admin | validado / en revisión / con observaciones. |
| `editar_documento` / `eliminar_documento` | admin | Nombre, fase y visibilidad. |
| `avanzar_fase(sum)` / `reabrir_fase(sum, fase)` | admin | |
| `cerrar_suministro` / `reabrir_suministro` / `cerrar_expediente` (pasaporte) / `reabrir_expediente` | admin | |
| `registrar(reg)` / `editar_registro(reg)` | admin | Al editar, borra las firmas. |
| `eliminar_registro(reg)` | admin | Solo los abiertos. |
| `firmar_registro(reg, nombre)` | cliente / proveedor (su parte) | Con las dos firmas: cierre, cambios en el suministro y adenda (Edge Function que genera el PDF y el hash). |
| `selector_validar_busqueda(sum, candidatos[])` | admin | Al menos un candidato. Paso → preselección. |
| `selector_enviar_preseleccion(sum, proveedores[])` | cliente | |
| `selector_pedir_ofertas(sum, proveedores[])` | admin | Crea cotizaciones `pendiente`. Paso → cotización. |
| `enviar_cotizacion(sum, precio_unitario, fecha, pago, validez, conformidades[])` | proveedor | Total calculado; validez ≥ 45. |
| `selector_validar_ofertas(sum)` | admin | Paso → selección. |
| `selector_confirmar_adjudicacion(sum, proveedor, requisitos[])` | cliente | Los requisitos deben estar entre las conformidades de la oferta elegida. |
| `selector_validar_adjudicacion(sum)` | admin | Paso → adjudicado; cotizaciones adjudicada/rechazada; suministro a `pedido`; hoja de pedido. |
| `emitir_aviso(exp, sum?, destino, categoria, prioridad, titulo, descripcion)` | admin | General del expediente → solo cliente. Con suministro → cliente, proveedor o ambos. |
| `anotar(exp, sum?, titulo, detalle)` | admin | Anotación interna. |

---

## 8. Eventos → avisos (a quién llega cada uno)

(Front: `pushAutoNotice`. La lista puede crecer.)

| Evento | SOFEIN | Cliente | Proveedor (del suministro) |
| :--- | :---: | :---: | :---: |
| Cliente solicita expediente | ✔ | | |
| SOFEIN crea expediente para el cliente (confirmar) | | ✔ | |
| SOFEIN requiere un documento | | ✔ si `requerido_a = cliente` | ✔ si `requerido_a = proveedor` |
| Cliente o proveedor sube un documento (validar) | ✔ | | |
| SOFEIN sube un documento visible | | ✔ si visible | ✔ si visible |
| SOFEIN valida un documento de la otra parte | | ✔ si visible y no lo subió él | ✔ ídem |
| SOFEIN registra o edita un REG (firmar) | | ✔ | ✔ |
| Una parte firma un REG | ✔ | ✔ si firmó el proveedor | ✔ si firmó el cliente |
| SOFEIN valida la búsqueda (preseleccionar) | | ✔ | |
| Cliente envía su preselección | ✔ | | |
| SOFEIN pide ofertas | | | ✔ (cada proveedor al que se pide) |
| Proveedor envía o actualiza su cotización | ✔ | | |
| SOFEIN valida las ofertas (elegir) | | ✔ | |
| Cliente confirma la adjudicación | ✔ | | |
| SOFEIN valida la adjudicación / formaliza | | ✔ | ✔ adjudicatario (formalizar) |
| SOFEIN avanza la fase de un suministro | | ✔ | ✔ |
| Aviso manual de SOFEIN | | según destino | según destino |

Además, **todas** estas acciones escriben en `actividad` con su fase y su suministro: alta y validación de expediente; documentos requeridos, subidos, validados, editados y eliminados; fases y cierres; REG (alta, edición, firma, cierre, eliminación); pasos del selector; firma y validación del pedido; avisos manuales; anotaciones. La pestaña Historial filtra por fase y suministro.

Opcional (fase 2): enviar los avisos también por email (Brevo / Resend) desde una Edge Function que lea `aviso_destinatarios`.

---

## 9. Storage

Bucket privado `documentos` con rutas:
```
expedientes/<expediente_codigo>/<suministro_codigo|general>/<fase>/<documento_id>/<version>-<archivo>
organizaciones/<org_codigo>/conformidades/<conformidad_codigo>/<archivo>
organizaciones/<org_codigo>/acuerdo-marco/<archivo>
```
- Descarga por **URL firmada** generada en servidor tras comprobar la visibilidad del documento (las políticas de Storage reutilizan las de `documentos`).
- Tamaño máximo de 25 MB; tipos permitidos: pdf, dwg, xlsx, docx, jpg y png.
- Adendas, hojas de pedido y pasaporte los genera una Edge Function (PDF) y se guardan con su hash.

---

## 10. Migración del front

`app.js` hoy trabaja con arrays globales (`EXPEDIENTES`, `SUMINISTROS`, `NOTICES`, `DIRECTORIO_*`, `CATALOGOS`) y los modifica directamente desde los manejadores. Plan:

1. Crear una **capa de datos** (`data/` o un módulo dentro de `app.js`) con funciones `async` que usen `supabase-js` (CDN), una por lectura y otra por acción de la sección 7.
2. Sustituir las lecturas por cargas al entrar en cada vista (con caché sencilla) y las escrituras por las RPC. Los `render*` pueden seguir igual si reciben los mismos objetos: conviene un **adaptador** que convierta filas de la base de datos al formato que ya usa el front.
3. Funciones del front cuya lógica pasa al servidor (no deben quedar como fuente de verdad):

| Front (`app.js`) | Servidor |
| :--- | :--- |
| `generateExpedienteId`, códigos REG, ADENDA y SUM | secuencias o funciones SQL |
| `canRoleSeeDeliverable`, `canRoleUploadToSlot`, `getRoleVisibleExpSuministros`, `isSuministroRelevantForRole`, `canRoleSeeNotice` | RLS |
| `closeRegistroIfSigned`, `syncRegistroLegacyFields` (adenda) | RPC `firmar_registro` + trigger |
| `ensureSuministroMatching`, `getSelectorCandidates`, `getQuoteEstado` | tablas del selector + RPC |
| `pushAutoNotice`, `notifyDocUploaded` | dentro de cada RPC |
| `addExpedienteCambioLog` | trigger / RPC → `actividad` |
| `saveCatalog` / `loadCatalog` (localStorage) | tablas `productos` y `conformidades` |
| `URL.createObjectURL` de adjuntos, `getSamplePdfUrl` | Storage + URL firmada |

4. Auth: pantalla de acceso; el selector de rol de la barra superior desaparece (el rol sale del usuario). Se puede conservar en desarrollo para que SOFEIN «vea como» otro rol.
5. Mantener la maqueta actual (`procurement` en Vercel) como demo hasta que la versión con base de datos tenga paridad funcional.

---

## 11. Datos semilla

Para arrancar el entorno de desarrollo, migrar los datos de ejemplo de `app.js`:
- `DEFAULT_CATALOGO_PRODUCTOS`, `DEFAULT_CATALOGO_CONFORMIDADES`;
- `DIRECTORIO_CLIENTES`, `DIRECTORIO_PROVEEDORES` (con `suministros`, `suministrosCondiciones` y `conformidades`);
- `EXPEDIENTES`, `INITIAL_SUMINISTROS`, `deliverables` y los REG-001/REG-002 de H6T4;
- usuarios de prueba: uno de SOFEIN, Infraestructuras del Norte (cliente), IberRail (proveedor) y un destinatario.

Script: `supabase/seed.sql`, generado desde los arrays (normalizando fechas, importes y unidades a tipos reales).

---

## 12. Decisiones abiertas

0. **Historial y backoffice.** Pendiente de activar: definir qué ve SOFEIN de la actividad y las personas (ver 4.9).
1. **Pedidos y formalización por suministro.** Hoy siguen por expediente. Recomendado: por suministro (cada uno puede tener un proveedor distinto).
2. **Firma electrónica.** Hoy es un clic con nombre y declaración. ¿Basta con eso (con registro de IP y fecha) o se integra un proveedor de firma (Signaturit, DocuSign…) para registros y hojas de pedido?
3. **Usuarios por organización.** Varios usuarios por cliente o proveedor y, si hace falta, roles internos (quién puede firmar).
4. **Emails de aviso.** Si se envían, con qué proveedor y para qué eventos.
5. **Versionado de documentos.** Confirmar que se conservan las versiones anteriores al subsanar.
6. **Destino del suministro.** Pasar de texto a una entidad (el destinatario y su ubicación).
7. **Unidades.** Confirmado que siempre son unidades contables (sin volumen ni longitud). Si en el futuro hiciera falta, añadir `unidad_medida` al producto.

---

## 13. Checklist para empezar

- [ ] Crear el proyecto Supabase `sofein-dev` (región UE) y guardar URL y anon key como variables de entorno del front (nunca la `service_role`).
- [ ] Migraciones: enums → catálogos → organizaciones → expedientes/suministros → documentos → registros → selector/cotizaciones → pedidos → avisos/actividad; cada tabla con los `grant` de la sección 4.
- [ ] Helpers `auth_rol()` y `auth_org_id()` y políticas RLS (sección 6), con tests SQL por rol.
- [ ] RPC de la sección 7, empezando por expediente → documentos → registro → selector.
- [ ] Bucket `documentos` y políticas de Storage.
- [ ] `seed.sql` con los datos de ejemplo.
- [ ] Capa de datos en el front y migración vista a vista (expedientes → ficha → documentación → registro → selector → avisos → catálogos → perfiles).
- [ ] `get_advisors` de Supabase (seguridad y rendimiento) antes de abrirlo a usuarios.
