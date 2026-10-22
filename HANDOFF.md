# HANDOFF — SOFEIN Procurement (Auditoría y Validación Final)

## 2026-10-22 · Claude · rama `procurement` · assets `?v=procurement-v29`

**Hecho — Administración SOFEIN + catálogos maestros**
- El perfil de admin de la sidebar ahora lleva a `#admin/administracion` (antes, a `#admin/overview`). Es un hub con tarjetas para Visión global (destacada), Productos, Conformidades y Configuración.
- Pestañas comunes (Resumen · Visión global · Productos · Conformidades) en las cuatro vistas, y migas `SOFEIN Admin / Administración / …`. Visión global no cambia (KPIs y filtros siguen funcionando).
- `#admin/productos` y `#admin/conformidades`: tablas editables en línea (añadir, editar, activar/desactivar, eliminar y buscar; Enter guarda y Esc cancela). Contador de proveedores que usan cada elemento.
- Fuente de datos: `CATALOGOS.productos` y `CATALOGOS.conformidades` en `app.js`, que se persisten en localStorage (`sofein_catalogo_productos_v1`, `sofein_catalogo_conformidades_v1`). Alimentan:
  - el selector «Tipo de Suministro» del constructor de expedientes (`renderProductoOptions()`);
  - el modal de alta/edición de proveedor, que muestra chips de productos y casillas de conformidades más un campo «Otras»;
  - el datalist del modal «Subir certificado» del perfil de proveedor.
- Al renombrar una conformidad (o la etiqueta de un producto) el cambio se propaga a `DIRECTORIO_PROVEEDORES`. Desactivar o eliminar quita el elemento de los selectores, pero no lo borra de las fichas existentes.
- Verificado con Chrome headless: 0 errores de JS, ningún `undefined`/`NaN` y sin desbordamiento en 390 px.

**Pendiente / decisiones**
- Persistencia solo local (localStorage). Si se migra a Supabase, crear las tablas `catalogo_productos` y `catalogo_conformidades` con los grants de PostgREST.
- Para restablecer los catálogos por defecto hay que borrar esas dos claves de localStorage.

**Fecha:** 18 de Octubre de 2026  
**Rama Git:** `procurement`  
**Entorno de Producción:** [https://sofein-procurement.vercel.app](https://sofein-procurement.vercel.app) (Proyecto Vercel: `sofein-procurement`)  
**Versión de Assets:** `?v=procurement-v13`

---

## 1. Estado General del Proyecto

Las **7 pantallas funcionales** requeridas en las reuniones con Ángel Plaza y especificadas en [`docs/DISENO_SOFEIN_PROCUREMENT.md`](file:///c:/Users/gyust/GY%20Antigravity/SOFEIN/docs/DISENO_SOFEIN_PROCUREMENT.md) se encuentran **100% implementadas, integradas y verificadas**:

| Pantalla | Funcionalidad Clave | Estado |
|---|---|:---:|
| **1. Constructor de Expedientes** | Alta por SOFEIN Admin y Solicitud estructurada del Cliente. Fases 1 a 7 con metadatos técnicos. | ✅ Operativo |
| **2. Selector & Matching (Fase 1/2)** | 4 sub-pasos (Preselección SOFEIN, Selección Cliente, Cotizaciones, Matriz Comparativa). Confidencialidad estricta entre proveedores competidores. | ✅ Operativo |
| **3. Formalización de Pedido** | Hoja de Pedido vinculante, cláusula de delimitación de responsabilidad SOFEIN y firma electrónica tripartita. | ✅ Operativo |
| **4. Fabricación & Calidad** | Ranuras documentales por fase, validación de certificados EN 13230 y ensayos ENAC. | ✅ Operativo |
| **5. Incidencias & Mediación** | Notificación bilateral de incidencias, formulación de acuerdos por SOFEIN Admin, silencio positivo tras 5 días hábiles y generación de Adendas Oficiales. | ✅ Operativo |
| **6. Comunicaciones & Avisos** | Bandeja de avisos centralizada y pestaña contextual por expediente con enlaces dinámicos según rol. | ✅ Operativo |
| **7. Pasaporte Digital SOFEIN** | Trazabilidad completa lote a lote, catálogo dinámico de ensayos según material (hormigón, madera, fijaciones), adendas consolidadas, sellado criptográfico SHA-256 e impresión A4/PDF. | ✅ Operativo |

---

## 2. Auditoría Integral y Verificaciones de Calidad

### A. Prueba Headless con Chrome (Claude Code)
- Se ejecutaron **27 rutas de la aplicación** en Chrome headless cubriendo los 4 perfiles (`admin`, `cliente`, `proveedor`, `destinatario`) y todas las submallas de expedientes:
  - **0 errores de JavaScript** en consola.
  - Ausencia total de valores `undefined`, `NaN` o `[object Object]` en pantalla.
  - Validación sintáctica `node --check app.js` sin advertencias.

### B. Correcciones Críticas de Permisos y Roles (P0 / P1)
1. **Rol `destinatario` (Auditor / Propietario de Infraestructura):**
   - Incorporado al diccionario `PLAYERS` en `app.js` y al selector de rol en la barra superior (`renderTopbar`).
   - Navegación estanca sin caída en *fallback* hacia `admin`.
   - Ocultación total de precios comerciales, márgenes y documentos privados de contratistas.
2. **Confidencialidad B2B de Proveedores (Paso 4 - Matriz Comparativa):**
   - Cuando `activeRole === "proveedor"`, las ofertas de talleres competidores muestran `[Confidencial]`, condiciones reservadas y bloqueo de descarga del archivo de oferta.
3. **Control Estricto de Mediación Oficial:**
   - La redacción y emisión de acuerdos de mediación (`openMediationModal`) queda reservada exclusivamente a `admin`.
   - Si un cliente o proveedor accede a través de un aviso con parámetro de mediación, el sistema lo sitúa en la pestaña de incidencias y resalta visualmente la tarjeta de la incidencia correspondiente para su firma/revisión.
4. **Preservación Global de Rol en Navegación (`data-go`):**
   - El manejador delegado de navegación reescribe dinámicamente cualquier prefijo de rol (`#admin/...`, `#cliente/...`) manteniendo inalterado el rol activo de la sesión.
5. **Rigor Normativo Ferroviario:**
   - Actualizada la Directiva 2008/57/CE a la vigente **Directiva (UE) 2016/797 / RD 929/2020** de Interoperabilidad.
   - Clarificado el requisito de concurrencia técnica mínima de 3 talleres bajo pliegos SOFEIN y Ley 38/2015 del Sector Ferroviario.
6. **Estilos y Exportación de Adendas:**
   - Variantes `.entity-status.warning` y `.entity-status.rejected` declaradas en `styles.css`.
   - Soporte de impresión mediante la clase `body.printing-modal` y evento nativo `afterprint` para exportar copias PDF de adendas oficiales desde el modal sin que se oculten por `@media print`.

---

## 3. Optimización y Auditoría Mobile UX (360px - 768px)

Se realizó un repaso y rediseño completo de la experiencia móvil y táctil en todas las pantallas y flujos:

1. **Cero Desbordamiento Horizontal (Zero Overflow):**
   - Corregida la inflación de pistas en CSS Grid (`grid-template-columns: minmax(0, 1fr)`) en `.dossier-builder`, `.admin-main` y `.admin-view`.
   - Verificado con Chrome DevTools en anchos estándar de 360px y 375px: `document.documentElement.scrollWidth === window.innerWidth` en las 7 pantallas.
2. **Drawer de Navegación Móvil y Backdrop Scrim:**
   - Inserción de elemento nativo `.admin-scrim` (`#adminScrim`) en `app.js` con cierre táctil intuitivo al pulsar fuera del menú lateral.
   - Acceso con una sola mano mediante botón hamburguesa flotante en cabecera.
3. **Pestañas y Steppers con Scroll Horizontal Nativo y Snap:**
   - `.dossier-tabs` y `.dossier-stepper` convertidos a carruseles horizontales con `-webkit-overflow-scrolling: touch`, barras ocultas y alineación suave (`scroll-snap-align: start`).
4. **Modales Adaptados a Bottom-Sheet:**
   - En pantallas `<= 640px`, todos los modales (Incidencias, Mediación, Adenda, Firma, Solicitudes) se anclan a la base de la pantalla como hojas emergentes (*bottom sheets*) con esquinas redondeadas (`12px 12px 0 0`) y desplazamiento vertical interno.
   - Orden de botones invertido (`flex-direction: column-reverse`) para situar la acción primaria más cerca del pulgar.
5. **Matriz Comparativa y Ranuras Documentales Móviles:**
   - Tabla comparativa con primera columna estática fijada (`position: sticky; left: 0`) con sombreado de separación para comparar especificaciones de talleres deslizando horizontalmente.
   - Ranuras documentales de Fabricación y tarjetas de Avisos adaptadas a formato de tarjeta apilada táctil con botones de acción a pantalla completa.
6. **Ergonomía Táctil y Prevención de Zoom en iOS:**
   - Entradas de formulario (`input`, `select`, `textarea`) ajustadas a `16px` para evitar el molesto zoom automático de iOS Safari.
   - Objetivos táctiles mínimos de `44px` en botones, controles y filtros de estado.
7. **Rediseño y Desacoplamiento de Visión Global (`#admin/overview`):**
   - Subsanado el solapamiento de gráficos métricos y barras documentales causado por la regla rígida de dos columnas (`230px minmax(0, 1fr)`).
   - Conversión de las métricas en un grid de tarjetas KPI (`repeat(4, 1fr)` en escritorio, `repeat(2, 1fr)` en móviles/tabletas) con tipografía sólida e indicadores de filtro activo.
   - Histograma de 'Estado de ranuras documentales' integrado como panel con ancho completo, barras centradas por colores de estado (`var(--entity-accent)`, `var(--entity-blue)`, `var(--entity-warning)`, `#74867a`) y textos legibles sin colisiones.
8. **Eliminación de Sombra Parásita en Borde Izquierdo Móvil:**
   - Corregido el sangrado visual de sombra en `.admin-sidebar` y `.entity-sidebar`. Al estar ocultos fuera de pantalla con `translateX(-100%)`, el radio de desenfoque de 45px penetraba en el borde izquierdo del viewport.
   - La sombra ahora se mantiene en `none` mientras el menú lateral está cerrado y solo se proyecta cuando el menú está desplegado (`.nav-open`).

---

## 4. Guía de Despliegue y Comandos

Para desplegar actualizaciones en la rama `procurement`:

```powershell
# 1. Verificar estado de la rama
git status

# 2. Subir cambios a GitHub (rama procurement)
git push origin procurement

# 3. Publicar en Vercel Producción (proyecto sofein-procurement)
npx.cmd vercel --prod --yes
```

> **NOTA IMPORTANTE:** Mantener siempre aislada la rama `procurement` respecto a `main` para evitar sobreescrituras con la web corporativa institucional (`sofein.vercel.app`).

