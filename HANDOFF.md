# HANDOFF — SOFEIN

Registro de relevo entre agentes. **Entradas nuevas arriba.** Reglas del proyecto en `AGENTS.md`.

## 2026-10-26 · Claude · rama `procurement` · Casillas de visibilidad ordenadas (v51), publicado

- `renderVisibilityCheckboxesHTML`, que se usa en Requerir, Subir, Subir requerido, Validar y Editar documento:
  - las casillas van en una sola fila: «SOFEIN» (siempre, fijo), «Cliente», «Proveedor» y «Destinatario final»;
  - se quitan los textos «(Constructor)», «Homologado», «(Auditor)» y «(Permisos SOFEIN Admin)»;
  - el CSS evita que las casillas hereden el ancho del 100 % de los inputs del modal.
- Push a `procurement` y despliegue en producción de sofein-procurement (`?v=procurement-v51`).

## 2026-10-26 · Claude · rama `procurement` · Push y despliegue (v50)

- `gitleaks` sobre los commits nuevos: sin fugas.
- `git push origin procurement` (hasta `9ecac8d`).
- `npx.cmd vercel --prod --yes` → producción de **sofein-procurement** (https://sofein-procurement.vercel.app), con assets en `?v=procurement-v50`.
- Verificado en la URL pública: ficha H6T4 con las 4 pestañas (incluido Historial) y 0 errores de consola.

## 2026-10-26 · Claude · rama `claude/expediente` · Historial de actividad del expediente (v50)

**Hecho**
- `addExpedienteCambioLog` guarda ahora en cada entrada:
  - `fase` (índice 0-3; por defecto, la fase en curso del suministro afectado o del expediente);
  - `suministro` normalizado («General» o `SUM-xx`);
  - la hora real («26 oct 2026 · 14:03»).
- Se registran también:
  - alta o solicitud del expediente y validación de la solicitud;
  - documentos requeridos, subidos, validados, con observaciones, editados y eliminados (`getDocPhaseIdx` da la fase del documento);
  - firmas de registros;
  - avisos emitidos a mano;
  - cada paso del selector de proveedores (fase 2);
  - firma y validación de la hoja de pedido;
  - cierre con pasaporte.
  - Las entradas que ya existían (fases, reaperturas, REG, cierres y reaperturas de suministro o expediente, confirmación del cliente, anotaciones) se mantienen.
- Nueva pestaña «Historial» en la ficha, solo para SOFEIN (`activeDossierTab === "history"`; si entra otro perfil, se le lleva a Documentación).
  - Filtros por fase y por suministro (incluido «General del expediente»), y una casilla «Incluir anotaciones internas».
  - Contador de entradas y tabla `renderHistoryTableHTML`.
- En la pestaña Registro, el bloque privado pasa a mostrar solo las anotaciones internas, con los botones «Ver historial completo» y «Añadir anotación interna».
- Verificado en Chrome:
  - Requerir, avanzar de fase, emitir aviso y añadir anotación generan sus entradas.
  - Los filtros funcionan: SUM-03 → 2 entradas; Fase 2 → 1; sin anotaciones → 6 de 7.
  - Cliente y Proveedor no ven la pestaña.
  - 0 errores de consola y sin desbordamiento a 1366 px.

**Pendiente**
- Los datos siguen siendo de demo y se pierden al recargar. Cuando haya backend, el historial debería ser una tabla propia (expediente, suministro, fase, tipo, autor, fecha).

## 2026-10-26 · Claude · rama `claude/expediente` · Ajustes de diseño de Documentación (v49)

**Hecho** (a partir de una captura de Guillermo)
- Acciones convertidas en botones de icono de 28 px en una sola fila (`.doc-tbl-icon-btn`), con tooltip CSS (`data-tip`) y `aria-label`. Son las mismas acciones de antes: Ver, Descargar, Subir/Subsanar, Validar, Editar y Eliminar.
- Columna Archivo: el nombre se recorta con «…» dentro de su celda (`.doc-tbl-file-cut`) y ya no invade la columna siguiente.
- Cabeceras en una sola línea: «Requerido» y «Subido» sustituyen a «F. requerimiento» y «F. subida».
- Celdas centradas en vertical. Fechas, autor, fase, estado, visibilidad y acciones van además centradas en horizontal.
- Por debajo de 1440 px la tabla se compacta (padding, anchos de nombre, archivo y notas, botones de 26 px), de modo que la vista de SOFEIN (10 columnas) cabe a 1366 px sin scroll. Si no cabe, el scroll lateral queda dentro de la tarjeta.
- Verificado en Chrome a 1500, 1366 y 390 px con los 3 perfiles. 0 errores de consola.

## 2026-10-26 · Claude · rama `claude/expediente` · Avisos automáticos, bloque F (v48)

**Hecho**
- Helpers nuevos:
  - `pushAutoNotice({ exp, sumId, roles, categoria, titulo, descripcion, accion, tab | ruta })` crea el aviso solo para los roles indicados.
  - `canRoleSeeNotice(n, role)`: el Cliente solo ve avisos de sus expedientes y el Proveedor solo los de sus suministros. Se usa en la bandeja, el contador de la sidebar y la pestaña Avisos de la ficha.
- Paso nuevo de confirmación del cliente:
  - Al crear SOFEIN un expediente, se guarda `exp.confirmacionCliente = "pendiente"` y el cliente recibe un aviso.
  - En la ficha, el cliente ve el banner con «Confirmar expediente» (`data-confirm-exp`). SOFEIN ve «Pendiente de confirmación del cliente».
- Avisos por evento:
  - **SOFEIN:**
    - el cliente solicita un expediente;
    - el cliente o el proveedor sube un documento (`notifyDocUploaded`);
    - el cliente o el proveedor firma un REG;
    - el cliente envía su preselección de proveedores;
    - el proveedor envía su cotización (o se simula su recepción);
    - el cliente elige proveedor.
  - **Cliente:**
    - SOFEIN crea un expediente para él;
    - SOFEIN le requiere un documento;
    - SOFEIN sube un documento visible para él, o valida uno subido por el proveedor;
    - SOFEIN registra o edita un REG;
    - el proveedor firma un REG;
    - SOFEIN le propone proveedores;
    - SOFEIN valida las cotizaciones;
    - SOFEIN formaliza el pedido;
    - un suministro pasa de fase.
  - **Proveedor:** los mismos casos que le afectan (requerimiento, documento de SOFEIN o del cliente validado, REG registrado o editado, firma del cliente, petición de cotización, petición de formalizar el pedido, cambio de fase), siempre filtrados por sus suministros.
- Selector de proveedores, ajustado para que existan los pasos de validación de SOFEIN:
  - Cliente: «Enviar selección a SOFEIN». Antes pedía las cotizaciones directamente.
  - Admin: «Validar selección y pedir cotizaciones».
  - La cotización del proveedor ya no abre la comparativa. Admin «Validar cotizaciones y mostrarlas al cliente» (`goToComparisonBtn`, solo Admin).
- Verificado en Chrome:
  - Cada evento genera el aviso al perfil correcto: documentos, REG, fases (el proveedor no ve SUM-03, que no es suyo) y el selector completo sobre un expediente nuevo de Infraestructuras del Norte.
  - Confirmación del cliente funcionando.
  - 0 errores de consola y sin desbordamiento a 390 px.

**Pendiente / decisiones**
- La demo tiene un solo proveedor (IberRail, PRV-01). Los avisos de cotización y formalización solo se generan si IberRail participa.
- Avisos que se mantienen tal como estaban: rechazo de documento (al responsable), acuerdo formalizado y fabricación, y cierre del expediente.
- Pueden añadirse más eventos con `pushAutoNotice`.

## 2026-10-26 · Claude · rama `claude/expediente` · Avisos dentro del expediente, bloque E (v47)

**Hecho**
- Pestaña Avisos de la ficha: se quita el botón «Bandeja Central» para todos los perfiles. «Emitir Aviso» sigue siendo solo de Admin.
- Nuevo `openEmitExpNoticeModal(expId)`, en `data-open-exp-notice-modal`:
  - Título «Emitir Aviso», sin subtítulo.
  - Expediente fijo (solo lectura). Suministro: «General del expediente» o uno de sus suministros.
  - Destinatarios:
    - General → solo Cliente (con una nota que lo explica).
    - Suministro concreto → Cliente, Proveedor (se muestra su nombre) o Ambos.
  - Campos: título, prioridad opcional (Normal/Alta/Urgente, en `NOTICE_PRIORIDADES`) y descripción.
- El aviso se guarda con `sumId`, `prioridad`, la categoría «Aviso SOFEIN[ · Alta/Urgente]» y `roles` según los destinatarios.
- La bandeja global de Avisos (`openCreateNoticeModal`) no cambia. No estaba en el alcance.
- Verificado en Chrome:
  - Un aviso a Proveedor de SUM-01 lo ve el Proveedor y no el Cliente.
  - Un aviso general lo ve el Cliente.
  - Ni Cliente ni Proveedor ven «Emitir Aviso» ni «Bandeja Central».
  - 0 errores de consola.

## 2026-10-26 · Claude · rama `claude/expediente` · Registro de incidencias y cambios, bloque D (v46)

**Modelo**
- `exp.incidencias` guarda ahora registros REG-001, REG-002…
- Campos de cada registro:
  - `sumId`, `titulo`, `descripcion`, `solucion` y `fechaRegistro`.
  - `previo` (fecha, unidades y presupuesto del suministro en el momento del registro).
  - `nuevaFechaEntregaIso`, `nuevasUnidades` y `nuevoPresupuesto` (null = igual).
  - `adjuntos` [{ name, file, fileUrl, visibleTo }].
  - Firmas de Cliente y Proveedor, y `adendaId`.
- `syncRegistroLegacyFields` rellena los campos antiguos (`tipo`, `propuestaMediacion`, `nuevoPlazoAcordado`…) que siguen usando la adenda oficial y el pasaporte.
- Datos de ejemplo de H6T4:
  - REG-001 (antes INC-014-1): pendiente de la firma del cliente.
  - REG-002 (nuevo): cerrado, con ADENDA-2026-01.
- Las entradas de actividad automática pasan de `REG-H6T4-0x` a `ACT-H6T4-0x`, para no confundirlas con los registros.

**Hecho**
- Solo Admin ve el botón «Registrar incidencia/cambio».
  - Modal `openRegistroModal`: código automático, suministro afectado, título, descripción, solución y hasta 3 adjuntos (nombre + quién lo ve).
  - Nueva fecha, unidades y presupuesto, cada uno con la opción «Igual (valor actual)» o «Nuevo».
- Tarjeta (`renderRegistroCardHTML`):
  - Código, suministro, título y fecha de registro.
  - Botones «Editar Mediación» y «Eliminar» (solo Admin y solo en registros abiertos).
  - Descripción; impacto en plazo, unidades y coste (antes → después); solución; adjuntos.
  - Firmas «SOFEIN» (registrado), «Proveedor» y «Cliente».
- Editar un registro borra las dos firmas, con aviso en el modal.
- Firma (`openSignIncidentModal`): solo la parte afectada ve su botón «Firmar».
  - Con las dos firmas, `closeRegistroIfSigned` cierra el registro y aplica la nueva fecha, unidades y presupuesto al suministro.
  - Además emite la adenda (`ADENDA-<año>-NN`) y añade el documento de adenda a la Documentación del suministro.
  - La adenda aparece en el pasaporte y se puede ver con «Ver adenda».
- «Historial de incidencias y cambios cerrados»: desplegable con una línea por registro (código, fecha, suministro, título). Al abrirla se ve la tarjeta completa.
- Bloque privado de Admin «Anotaciones internas y actividad · Solo SOFEIN»: el antiguo historial de cambios más el botón «Añadir anotación interna» (`openAddCambioLogModal`, ahora siempre `soloAdmin`).
  - Cliente y Proveedor ya no ven el historial de actividad automática.
- Eliminado el silencio positivo en el registro, la adenda, el pasaporte y la configuración. Se borran `openIncidentModal`, `openMediationModal`, `consolidateAddendum` y `applySilencePositive`.
- Textos «Taller» y «Constructor» sustituidos por «Proveedor» y «Cliente» en las firmas.
- El badge de la pestaña cuenta los registros abiertos. El enlace del aviso AV-01 (`openMediation=REG-001`) resalta la tarjeta.
- Nuevo icono `lock`: ya se usaba, pero no existía.
- Verificado en Chrome:
  - Registrar, editar (firmas reiniciadas), firma del proveedor y del cliente → cierre con ADENDA-2026-02 y SUM-01 a 20 oct.
  - El historial se despliega, la adenda se ve y aparece en el pasaporte.
  - Eliminar funciona y el Proveedor solo ve los registros de sus suministros.
  - 0 errores de consola y sin desbordamiento a 390 px.

**Pendiente / decisiones**
- Los registros cerrados son de solo lectura: no se pueden editar ni eliminar, porque ya tienen adenda.
- Los avisos automáticos al registrar o firmar quedan para el bloque F.

## 2026-10-26 · Claude · rama `claude/expediente` · Documentación del expediente, bloque C (v45)

**Hecho** (en `renderDossierBuilder`, pestaña Documentación, y en sus modales)
- Columnas de la tabla (`.doc-clean-table.is-detailed`):
  - Nombre, Archivo, Quién lo ve (solo Admin), F. requerimiento, F. subida, Subido por, Fase, Estado, Acciones y Notas.
  - Se muestra «-» cuando no hubo requerimiento (`reqDate` vacío) o todavía no hay archivo.
  - Helpers: `getDocUploadDateText` y `getDocUploaderText`. Los campos nuevos `uploadDate` y `uploadedBy` se rellenan al subir.
- «Ver» abre el archivo directamente (`viewDocFile`) en lugar del antiguo modal inspector. `openInspectDeliverableModal` sigue en el código, pero ya no se usa.
  - Archivos subidos en la sesión: se abre su `fileUrl` (object URL).
  - Documentos de ejemplo: se abre un PDF de muestra generado en el navegador (`getSamplePdfUrl`).
  - «Descargar» (`downloadDocFile`) funciona igual.
- Admin:
  - «Validar» no cambia.
  - Nuevos botones ✎ «Editar» (`openEditDocModal`: nombre, fase y quién lo ve; cambiar la fase mueve el documento a esa fase) y × «Eliminar» (`openDeleteDocModal`, con confirmación).
- Cliente y Proveedor: «Subir» cuando falta el archivo, y «Subsanar» cuando ya existe, que sustituye el archivo y deja el documento «En revisión».
- Los modales de subida (`openUploadFreeDocModal` y `openUploadSlotDocModal`) usan ahora un selector de archivo real (`applyUploadedFileToDoc`). La subida libre ya no inventa una fecha de requerimiento.
- La tabla vuelve a admitir scroll lateral dentro de su caja si no cabe. A 1366 px cabe entera.
- Verificado en Chrome:
  - Admin renombra, mueve a Fase 4, cambia la visibilidad, elimina y hace una subida libre.
  - Cliente subsana y Proveedor sube un requerido.
  - El PDF de muestra es válido.
  - 0 errores de consola y sin desbordamiento de página a 390 px.

**Pendiente**
- En el panel del navegador de Claude no se abren pestañas nuevas, así que «Ver» no se ha podido ver abriéndose ahí. El enlace y el PDF se han comprobado, pero falta confirmarlo en Chrome normal.
- Las filas de Admin son altas porque los botones de acción se apilan. Si molesta, se pueden pasar a solo iconos.

## 2026-10-26 · Claude · rama `claude/expediente` · Creación de expediente, bloque B (v44)

**Hecho** (ver `docs/PETICIONES_EXPEDIENTE.md`)
- Catálogo de productos reducido a los 6 genéricos: Traviesas, Placas, Tirafondos, Clips, Balasto y Otros.
  - La clave de localStorage pasa a `sofein_catalogo_productos_v2`, para que no se carguen los productos antiguos.
  - El selector «Tipo de Suministro» sigue tirando de `CATALOGOS.productos`.
- Constructor de expediente:
  - Las filas de suministro salen de `renderCreateSuministroRowHTML`, tanto la inicial como las añadidas.
  - Especificaciones en un textarea grande. Su contenido se guarda también como `descripcion`, que es lo que muestran las tarjetas.
  - Los lotes se numeran solos y se guardan en el orden del formulario.
- Adjuntos: hasta 3 por suministro y 3 adicionales (`renderCreateAttachHTML`, `bindCreateAttachments`, `readCreateAttachments`).
  - Cada adjunto lleva un nombre editable.
  - Si crea SOFEIN, elige además quién lo ve (Cliente/Proveedor; SOFEIN siempre lo ve).
  - El `File` real se guarda en un `WeakMap` y se publica con `URL.createObjectURL` (`fileUrl`), para el «Ver» del bloque C.
- Los adjuntos pasan a ser documentos de Fase 1 (Alcance), marcados con `fromCreation` y un `docId`.
  - Con un solo suministro van a `exp.deliverables[0]`.
  - Con varios, cada suministro recibe en su `deliverables[0]` los generales (copiados con el mismo `docId`) y los suyos.
- Notas de creación: se guardan en `exp.notas` y se muestran en la cabecera de la ficha (solo Admin y Cliente).
- Se elimina el antiguo dropzone «Pliego PPTP» y su documento de relleno.
- Cliente: el badge dice «Solicitud del cliente · Requiere validación SOFEIN», el botón dice «Solicitar Expediente» y el formulario no muestra la visibilidad de los adjuntos.
  - Hasta que SOFEIN valide, los adjuntos del cliente los ven solo SOFEIN y el cliente.
- Validación de la solicitud: «Validar y Activar Expediente» abre `openValidateExpedienteModal`.
  - El modal muestra las notas del cliente y cada adjunto con casillas Cliente/Proveedor.
  - Al confirmar, aplica esa visibilidad a todas las copias del `docId`, deja los adjuntos validados y pasa el expediente y sus suministros a Fase 2.
- Verificado en Chrome:
  - Admin crea 2 suministros con 3+1+1 adjuntos (el 4.º se descarta).
  - Cliente solicita, Admin valida y el Proveedor queda excluido de un adjunto.
  - 0 errores de consola y sin desbordamiento a 390 px.

**Pendiente / decisiones**
- La columna «Requerimiento» de Documentación muestra la fecha de subida en los adjuntos de creación (`reqDate: null`). En el bloque C pasará a «-».
- Coordinación: Antigravity y Claude hemos repetido número de versión de assets dos veces (v41 y v43). Antes de subirlo, mirar `git log procurement`.
## 2026-10-26 · Antigravity · rama procurement · Fix diseño dropdowns multiselección en modal (v43)

**Hecho**
- Corregido el problema visual del desplegable multiselección en modal (Suministros y Conformidades):
  - Eliminada la interferencia de la regla global .procurement-modal-body input { width: 100% !important; } que estiraba los checkboxes a 400px y desplazaba las etiquetas al extremo derecho.
  - Fijadas las dimensiones de los checkboxes a 16x16px fijos alineados verticalmente a la izquierda.
  - Opciones estructuradas con flexbox gap: 10px e interlineado limpio, con padding y hover refinados.
  - Fondo sólido ar(--entity-panel) y sombras con soporte automático para modo oscuro y claro.
- Assets actualizados con cachebuster ?v=procurement-v43.
- Verificado en DevTools local y capturado en screenshot.

## 2026-10-26 · Claude · rama `claude/expediente` · Ficha del expediente, bloque A (v42)

Primer bloque de las peticiones de Guillermo sobre gestión y creación del expediente. El listado completo y su estado están en `docs/PETICIONES_EXPEDIENTE.md`.

**Hecho** (en `renderDossierBuilder` y en los handlers de `app.js`)
- Se quita la fase de la cabecera del expediente, porque cada suministro tiene la suya.
- Tarjetas de suministro:
  - fase con las 4 rayitas (`exp-v2-minichart`, como antes en la cabecera);
  - descripción bajo el tipo (`.dossier-sum-desc`);
  - fila «Unidades»;
  - píldora de días junto a la fecha de entrega, que reutiliza `getDeliveryKpi`: verde si queda margen y roja si hay retraso.
- Pestañas renombradas a «Documentación», «Registro de incidencias y cambios» y «Avisos».
- Se quita la tira «Vista Cliente/Proveedor: …». Solo se mantiene para el Destinatario.
- «Completar fase» sigue siendo exclusivo de Admin. En una fase completada, el botón pasa a ser «Reabrir fase» (`data-reopen-dossier-phase`).
  - Al reabrir, la fase seleccionada vuelve a quedar en curso para ese suministro y se anota en el registro de cambios.
  - Si el suministro o el expediente están cerrados, el botón aparece deshabilitado.
- Modal «Requerir documento»: el campo «Origen / Responsable» pasa a llamarse «Requerido a», con «Proveedor · <nombre>» y «Cliente · <nombre>». Se quita la opción SOFEIN.
- Nuevo icono `refresh`. Assets en `?v=procurement-v42` (renumerado al integrar, porque Antigravity ya usaba v41).
- Verificado en Chrome (Admin, Cliente y Proveedor sobre H6T4): 0 errores de consola, ningún `undefined`/`NaN`, sin desbordamiento a 390 px y Reabrir/Completar funcionando.

**Pendiente**
- Bloques B–F (ver `docs/PETICIONES_EXPEDIENTE.md`).
- Reabrir una fase anterior hace retroceder el suministro hasta esa fase. Los documentos de las fases siguientes se mantienen.
## 2026-10-26 · Antigravity · rama procurement · Leyenda Conformidades y Modal Añadir/Editar v41

**Hecho**
- Columna Conformidades: añadida leyenda explicativa con tooltip interactivo (.dir-conf-legend-trigger) sobre el icono informativo en la cabecera th, detallando los colores: Verde (Normas y homologaciones oficiales ISO/CE/AENOR/Adif/UNE-EN), Ámbar (Tratamientos químicos y conservación creosota/autoclave) y Gris (Otras certificaciones y sostenibilidad FSC/PEFC).
- Modal Añadir y Editar Cliente / Proveedor:
  - Títulos limpios sin subtítulos: «Añadir cliente o proveedor», «Editar proveedor», «Editar cliente».
  - Campo «Tipo» simplificado a opciones «Proveedor» y «Cliente».
  - Campos obligatorios limitados a: Tipo y Razón Social / Nombre (el resto opcionales).
  - «Suministros» y «Conformidades»: dropdowns multiselección interactivos con checkboxes, tags visuales y botón de desmarcar.
  - «Condiciones por suministro»: sección dinámica que abre automáticamente una caja por cada suministro seleccionado arriba para configurar de forma específica su «Plazo medio (lead time)» y «Condiciones de pago habituales» (ambos opcionales).
  - Cliente: condiciones de pago renombradas a «Condiciones de pago habituales» (opcional).
- Bump de cachebuster en pp.html a ?v=procurement-v41.
- Verificado con 
ode -c app.js y mediante Chrome DevTools en http://localhost:3456/app.html#admin/directorio con 0 errores en consola.

## 2026-10-26 · Antigravity · rama procurement · Clientes y Proveedores (Directorio v40)

**Hecho**
- Título principal de la vista renombrado a «Clientes y Proveedores» (reemplazando «Listado»).
- Encabezados de tabla y mosaico simplificados: «Proveedores» (en lugar de «Proveedores homologados») y «Clientes» (en lugar de «Clientes (Constructores de vía)»).
- Eliminado el subtítulo redundante «Directorio de entidades» en la vista mosaico.
- Botón y funcionalidad de «Exportar Excel» (exportDirectorioCSV) en la barra de herramientas del directorio: exporta un archivo CSV (proveedores-sofein.csv, clientes-sofein.csv o clientes-y-proveedores-sofein.csv) con BOM UTF-8 y delimitador ; para apertura directa y sin problemas de acentos en Microsoft Excel en español, respetando filtros activos y columnas visibles.
- Columna «Suministros»: normalizada a los nombres genéricos (	raviesas, placas, 	irafondos, clips, alasto, otros) tanto en los 14 proveedores de DIRECTORIO_PROVEEDORES, como en el renderizador de etiquetas (
enderSuministrosTags), como en el modal de alta/edición (openAddOrEditEntityModal).
- Bump de cachebuster en pp.html a ?v=procurement-v40.
- Verificado con 
ode -c app.js (0 errores) y visualmente en Chrome DevTools (http://localhost:3456/app.html#admin/directorio) sin errores ni advertencias de consola.

## 2026-10-26 · Claude · rama `procurement` · coordinación Claude + Antigravity

**Hecho**
- Nuevo `AGENTS.md` como fuente única de reglas: incluye el contenido de `GEMINI.md`, ramas y despliegue, cómo probar y las reglas de coordinación. `CLAUDE.md` contiene solo `@AGENTS.md`, y `GEMINI.md` queda reducido a un puntero a `AGENTS.md` con un recordatorio breve.
- Worktree de Claude en `.claude/worktrees/claude` (ignorado por git), en la rama `claude/trabajo`, creada desde `procurement`. A partir de ahora Claude trabaja allí, con ramas `claude/<tarea>`. La carpeta principal queda para Antigravity.
- Este commit solo incluye `AGENTS.md`, `CLAUDE.md`, `GEMINI.md` y `HANDOFF.md`.

**Pendiente / avisos**
- Hay cambios sin commitear en `app.js` en la carpeta principal: en `DIRECTORIO_PROVEEDORES`, `suministros` pasa a claves normalizadas (`traviesas`, `clips`, `otros`). Son de Antigravity y no se han tocado. Antigravity debe terminarlos y commitearlos.
- `main` local apunta al mismo commit que `procurement` (`d64102f`) y va 2 commits por delante de `origin/main` sin subir. `.agents/rules/deployment.md` dice que `main` es la web corporativa. Hay que decidir si `main` debe llevar los commits del dossier y de Avisos.
- Los commits de la landing de sofeindigital.es (`feat(web)`) están en `procurement`.

## 2026-10-26 · sin registrar (reconstruido desde git por Claude) · rama `procurement`

- `c31ac95`, `dee0231`, `3e52e22`, `cb651ae` (`feat(web)`): landing «en construcción» para sofeindigital.es. Añade `construccion.html` y su copia `sofeindigital-standalone/` (index, assets, README), con diseño minimalista, barra de progreso, foto ferroviaria `assets/digital-hero-v2.jpg`, logo en blanco y layout 100vh. Las instrucciones de dominio están en `docs/INSTRUCCIONES_IONOS_DOMINIO.md`.
- `840c4c0` (`feat(dossier)`): la pestaña «Registro de incidencias» pasa a llamarse «Registro». `addExpedienteCambioLog` admite `soloAdmin`, y las anotaciones internas (tipo «Anotación interna (SOFEIN)» o la casilla «Solo SOFEIN») se ocultan a cliente y proveedor y aparecen marcadas con un chip de candado.
- `d64102f` (`style(avisos)`): eliminado el subtítulo de la cabecera de Avisos.

## 2026-10-22 · sin registrar (reconstruido desde git por Claude) · rama `procurement` · Suministros (v36)

- `c328839`: filtros por columna en la cabecera (`th`) de la tabla de Suministros, KPI de días de entrega, tabla de finalizados colapsada y layout compacto sin scroll. Assets en `?v=procurement-v36` (`app.js`); `styles.css` sigue en v35.

## 2026-10-22 · Claude · rama `procurement` · Suministros (v33)

**Hecho** (según `docs/claude_suministros_prompt.txt`, puntos 1–6)
- `INITIAL_SUMINISTROS`: `tipo` reducido al nombre normalizado (Traviesas, Placas, Tirafondos, Clips, Balasto, Otros), `unidades` solo con el número (por ejemplo «14.500») y un campo nuevo `descripcion` con la especificación de cada SUM-01…12.
- Acciones pendientes por rol: el campo nuevo `accionesPendientesRol: { admin, cliente, proveedor }` se lee con el helper `getSuministroAccionesPendientes(s, role)`. Este helper alimenta el filtro, la ordenación, la columna de acciones y la burbuja «Suministros» de la sidebar (`getRolePendingCount`).
- Columna «Descripción» añadida en `ALL_SUMINISTROS_COL_DEFS` y en `DEFAULT_SUMINISTROS_COL_ORDER`, detrás de «tipo». Se puede ordenar por ella y entra en el buscador libre.
- Cabecera por rol:
  - Admin: «Suministros», con el subtítulo «…para facilitar su gestión.» y sin el botón «Nuevo Expediente».
  - Cliente: «Mis Suministros», sin subtítulo y con el botón «Solicitar Expediente».
  - Proveedor: «Mis Suministros», sin subtítulo y sin botón.
- Clic en una fila: abre `#<rol>/expedientes/<expId>?tab=deliverables&sumId=<id>` (el chip de acciones usa la misma ruta). Si se pulsa el enlace del expediente dentro de la fila, se sigue su propio `href`. `parseHash` aplica `sumId` una sola vez por cada hash (`lastAppliedSumIdHash`), porque `renderApp` llama a `parseHash` en cada render y, sin esa guarda, el selector de suministro quedaría bloqueado. `renderDossierBuilder` activa ese suministro y su fase.
- Botón «Exportar Excel» en `suministros-toolbar-right`: genera un CSV con BOM UTF-8 y separador `;`, con las columnas visibles en su orden y las filas filtradas/ordenadas (`suministros-sofein.csv`).
- `node -c app.js` sin errores. Assets en `?v=procurement-v33`.

**Pendiente / decisiones**
- Al reducir `tipo` a «Otros», `getSuministroTypeIcon` del constructor muestra el icono genérico para carril, desvíos, suelas y arandelas. No se ha tocado porque queda fuera del alcance de Suministros. Si se quiere recuperar el icono específico, se le puede pasar `tipo + descripcion`.
- Los suministros creados desde el constructor no llevan `accionesPendientesRol`: el helper usa `accionesPendientes` para admin y devuelve 0 para cliente y proveedor.
- No se ha probado en el navegador; queda para Antigravity.

## 2026-10-22 · Claude · rama `procurement` · bandeja de expedientes por perfil

**Hecho** (según `claude_instructions.txt`)
- Bandeja: los expedientes activos van ahora en un `<details data-exp-collapse="activos">` limpio (`.exp-collapsible-clean`, sin caja), abierto por defecto.
- Tarjetas: orden Suministros → Cliente → Destino → Presupuesto → Próxima entrega. Si hay más de un suministro, aparece un icono de info con un tooltip CSS «Fases por suministro». El handler global ignora `[data-exp-sum-info]`, así que pulsar el icono no navega.
- Nuevos helpers en `app.js`: `getExpedientesForRole`, `getExpSuministrosForRole`, `hasExpPendingActionForRole` y `getExpVisualMeta(exp, role)`. El cliente ve solo su entidad. El proveedor ve solo expedientes con algún suministro de IberRail, y cuenta y lista únicamente esos. La sidebar (`getRolePendingCount`) usa la misma lógica.
- **Presupuesto en vista de proveedor:** En las tarjetas de la vista de proveedor y en los filtros de rango de presupuesto se calcula y muestra exclusivamente la suma de los suministros adjudicados a ese proveedor (ej. 402.000 € en H6T4 y 58.000 € en W4P7), nunca el presupuesto total del expediente completo.
- **Acciones pendientes en vista de proveedor:** Las acciones pendientes se circunscriben estrictamente a lo que le compete al proveedor (entregables requeridos en fases alcanzadas, incidencias de su suministro pendientes de su firma, o suministros adjudicados con acciones pendientes), sin verse afectado por tareas que son responsabilidad de SOFEIN Admin.

**Decisiones**
- Para cliente y proveedor, los entregables pendientes solo cuentan en fases ya alcanzadas (`<= faseActual`); los de fases futuras no son accionables.
- El admin conserva su lógica anterior (`forcePendingAction` y presets).

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

---

# Histórico — auditoría y validación final (18/10/2026, assets v13)

> Estado de referencia a 18/10. Las entradas de arriba son más recientes y prevalecen.

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

