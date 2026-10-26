# Peticiones — Gestión y creación del expediente (26/10/2026)

Peticiones de Guillermo para https://sofein-procurement.vercel.app/ (ejemplo: `app.html#admin/expedientes/SFN-2026-H6T4`).
Las va implementando Claude por bloques, en ramas `claude/…`, y las integra en `procurement` cuando Guillermo da el visto bueno.
**Mientras haya un bloque en curso, Antigravity no debe editar `app.js`.**

## Estado por bloques

| Bloque | Alcance | Estado |
|---|---|---|
| A. Ficha y tarjetas (3 perfiles) | Fase fuera de la cabecera; en las tarjetas, rayitas de fase, días hasta la entrega, descripción y unidades; pestañas renombradas; quitar «Vista …»; Completar/Reabrir fase solo Admin; «Requerido a» | ✅ Hecho (v42, integrado en `procurement`) |
| B. Creación de expediente (Admin y Cliente) | Especificaciones en textarea; tipo genérico del catálogo; hasta 3 adjuntos por suministro y 3 adicionales, con nombre y visibilidad; textos del cliente; notas visibles; validación de la solicitud con visibilidad de adjuntos | Pendiente |
| C. Documentación | Columnas nuevas; editar visibilidad, nombre y fase, y eliminar (Admin); «Ver» abre el archivo; «Subsanar» sustituye el archivo | Pendiente |
| D. Registro de incidencias y cambios | Registro único REG-xxx creado solo por Admin; firmas de Cliente y Proveedor; editar borra las firmas; eliminar; sin silencio positivo; historial de cerrados | Pendiente |
| E. Avisos dentro del expediente | Quitar «Bandeja Central»; solo Admin emite; modal «Emitir Aviso» simplificado con reglas de destinatario | Pendiente |
| F. Avisos automáticos por evento | Matriz de qué avisos le llegan a cada perfil | Pendiente |

## Dudas abiertas (Guillermo responde al llegar a cada bloque)

Entre paréntesis, la propuesta por defecto de Claude.

1. **(B)** ¿Dónde se muestran las notas de creación? Hoy se pierden al crear el expediente. (Propuesta: en la cabecera del expediente, visibles para SOFEIN y el cliente.)
2. **(B)** ¿Dónde aparecen los adjuntos de creación? (Propuesta: en Documentación, Fase 1; los de cada suministro, ligados a ese suministro, y los adicionales, al expediente en general.)
3. **(C)** «Ver» el documento: la plataforma es una maqueta sin almacenamiento. (Propuesta: abrir los archivos subidos durante la sesión y un PDF de muestra para los documentos de ejemplo.)
4. **(D)** Unificar las incidencias con mediación y el historial de cambios en un registro REG único. ¿Qué pasa con las «anotaciones internas solo SOFEIN» que se añadieron el 26/10? ¿Se mantiene el enlace con las adendas y el pasaporte?
5. **(F)** El paso «el cliente confirma el expediente que SOFEIN creó para él» no existe todavía: hay que añadirlo.

## Listado original

### Creación de expediente - SOFEIN (Admin)
- El campo de «Especificaciones» de suministro, que sea una caja de texto más grande, para incitar a escribir algo más detallado si fuese necesario.
- El «Tipo de Suministro», que sea solo uno de los genéricos: traviesas, placas, tirafondos, clips, balasto, otros. Que tire de la lista de productos que incluirá SOFEIN en la plataforma.
- Que haya la posibilidad de subir varios adjuntos (hasta 3 por cada suministro).
- Que, para cada adjunto de suministro que se suba, haya un campo donde se indique el nombre de ese adjunto (por si el archivo tiene un nombre raro, para tenerlo bien identificado). En el futuro estaría bien estandarizar la categoría y/o la nomenclatura de cada archivo que se suba.
- Que SOFEIN elija quién tendrá acceso a los adjuntos que se suben aquí: SOFEIN, cliente, proveedor.
- Dar la posibilidad de añadir hasta 3 adjuntos adicionales.
- Que, para cada adjunto adicional que se suba, haya un campo donde se indique el nombre de ese adjunto (mismo motivo que en los adjuntos de suministro).
- ¿Dónde se visualizan las notas que se pueden dejar ahí en la creación del expediente?

### Creación de expediente - Cliente
- Mismos cambios que los indicados para SOFEIN (Admin).
- La indicación azul de arriba donde pone «Solicitud constructor…», que ponga mejor «Solicitud del cliente…».
- ¿Dónde valida SOFEIN (Admin) la solicitud de expediente creada por un cliente?
- Que, al validar el expediente, SOFEIN seleccione quién tiene acceso a cada documento adjunto: SOFEIN, cliente, proveedor.
- El botón de abajo que pone «Crear Expediente», que ponga mejor «Solicitar Expediente».

### Gestión del expediente - SOFEIN (Admin)
- En la parte de arriba donde se describe el expediente, quitar la fase en la que se encuentra el expediente, porque en realidad hay una fase diferente para cada suministro.
- En las tarjetas de cada suministro, poner la fase en la que está, igual que está ahora arriba en el expediente (con las 4 rayitas marcando en verde la actual).
- En las tarjetas de cada suministro, incluir al lado de la fecha los días que quedan hasta la fecha, en verde, o en rojo si hay retraso.
- En la tarjeta de suministro, añadir la descripción debajo del tipo de suministro.
- En la tarjeta de suministro, añadir las unidades que se piden.
- El botón de completar fase solo debe estar visible para SOFEIN (Admin) y debe decir «Reabrir fase» cuando la fase está marcada como completada.
- Los apartados de abajo se llamarían: «Documentación», «Registro de incidencias y cambios», «Avisos».
- En la pestaña «Requerir documento» falta indicar a quién se le requiere.

### Gestión del expediente Documentación - SOFEIN (Admin)
- En la parte de documentación, poder editar quién puede ver el documento, cambiarle el nombre, cambiarle la fase o incluso eliminarlo.
- Campos de cada fila de documento: nombre, archivo, quién lo puede ver, fecha de requerimiento («-» si se ha subido sin requerir), fecha de subida («-» si todavía no se ha subido), quién lo ha subido, fase a la que corresponde, estado (validado, en revisión, pendiente, con observaciones), acciones (ver, descargar, subir, validar), notas.
- En «ver», simplemente abrir el documento, no abrir una pestaña con información.
- En «validar» está bien como está, y está bien que se pueda indicar quién ve ese documento.

### Gestión del expediente Registro de incidencias y cambios - SOFEIN (Admin)
- Simplificar mucho el registro de incidencias y cambios:
  - Un solo botón, «Registrar incidencia/cambio». En principio solo SOFEIN (Admin) puede registrar incidencias o cambios, cuando el proveedor o el cliente se lo comuniquen.
  - Datos del formulario de registro:
    - Código de incidencia/cambio automático (REG-001).
    - Suministro afectado.
    - Título de la incidencia/cambio.
    - Descripción detallada de la incidencia/cambio.
    - Solución propuesta por SOFEIN.
    - Adjuntos (hasta 3): archivo, nombre, quién lo ve.
    - Nueva fecha de entrega: igual o una distinta.
    - Nueva cantidad de unidades: igual o una distinta.
    - Nuevo presupuesto: igual o uno distinto.
  - Cómo se muestra cada registro:
    - Código de incidencia/cambio (REG-001).
    - Suministro afectado.
    - Título de la incidencia/cambio.
    - Fecha de registro (por SOFEIN (Admin)).
    - Botón «Editar Mediación» (solo SOFEIN Admin), con los mismos campos que al registrar una incidencia/cambio nuevo. Si se edita, se borran todas las firmas y hay que volver a pedirlas.
    - Botón de eliminar incidencia/cambio (solo SOFEIN Admin).
    - Descripción detallada de la incidencia/cambio.
    - Impacto en plazo, cambio en unidades e impacto económico.
    - Solución propuesta por SOFEIN.
    - Adjuntos (nombre y archivo).
    - Espacio para las firmas y fechas de cliente y proveedor. SOFEIN aparece como quien lo ha registrado, pero en principio no tiene por qué firmar. Los nombres que aparecen ahí serán simplemente SOFEIN, Proveedor y Cliente (quitar «Taller» y «Constructor»).
    - Quitar el silencio positivo.
  - Cuando las dos partes hayan firmado, el registro pasa abajo, al desplegable «Historial de incidencias y cambios cerrados». Ahí aparece una línea por registro con lo más importante (código, fecha, suministro, título); al pinchar, se despliegan todos los detalles, igual que arriba.

### Gestión del expediente Avisos - SOFEIN (Admin)
- En la parte de avisos:
  - En principio, solo SOFEIN (Admin) puede emitir avisos que no sean automáticos.
  - Quitar el botón «Bandeja Central», porque no tiene que ver exclusivamente con el expediente y se accede fácilmente desde el menú de la izquierda.
  - Simplificar la pestaña que se abre al pulsar «Emitir Aviso»:
    - Quitar el subtítulo.
    - Título: simplemente «Emitir Aviso».
    - Expediente: el código del expediente abierto, sin poder modificarlo, ya que se envía desde un expediente concreto.
    - Suministro: «General del expediente» o un suministro del expediente.
    - Destinatarios: si se elige «General del expediente», el aviso solo puede ir al cliente, porque en el expediente puede haber varios proveedores. Si se elige un suministro concreto, el aviso puede ir al cliente, al proveedor o a ambos.
    - Campos adicionales: título del aviso, prioridad normal/alta/urgente (opcional) y descripción del aviso.
- Avisos que deben llegar a SOFEIN (Admin):
  - Cuando un cliente crea un expediente y SOFEIN tiene que validarlo.
  - Cuando un proveedor o un cliente sube un documento y SOFEIN tiene que validarlo.
  - Cuando un proveedor o un cliente firma un registro de cambio/incidencia.
  - Cuando un cliente preselecciona proveedores y SOFEIN tiene que validarlos para pedir cotizaciones.
  - Cuando un proveedor envía una cotización y SOFEIN tiene que validarla para mostrársela al cliente.
  - Cuando un cliente selecciona proveedor y SOFEIN tiene que formalizar el pedido.
  - Pueden surgir más avisos más adelante.

### Gestión del expediente - Cliente
- Mismos cambios en la ficha que para SOFEIN (Admin): quitar la fase de la cabecera; en las tarjetas, la fase con las 4 rayitas, los días hasta la fecha (verde, o rojo si hay retraso), la descripción y las unidades; apartados «Documentación», «Registro de incidencias y cambios» y «Avisos».
- Quitar lo que pone arriba a la derecha: «Vista Cliente: …».

### Gestión del expediente Documentación - Cliente
- Campos de cada fila de documento: nombre, archivo, fecha de requerimiento («-» si se ha subido sin requerir), fecha de subida («-» si todavía no se ha subido), quién lo ha subido, fase a la que corresponde, estado (validado, en revisión, pendiente, con observaciones), acciones (ver, descargar, subir, subsanar), notas.
- En «ver», simplemente abrir el documento, no abrir una pestaña con información.
- En «subsanar», simplemente cambiar el archivo por otro nuevo si hace falta.

### Gestión del expediente Registro de incidencias y cambios - Cliente
- Quitar lo de añadir incidencia: al comienzo solo SOFEIN podrá registrarlas.
- Que el registro se muestre igual que lo explicado para SOFEIN (Admin).
- Que el cliente tenga un botón en su recuadro de firma para firmar y que después le aparezca que ya ha firmado (como está ahora).
- Igual que para SOFEIN (Admin): cuando las dos partes hayan firmado, el registro pasa al desplegable «Historial de incidencias y cambios cerrados» (una línea con código, fecha, suministro y título; al pinchar, todos los detalles).

### Gestión del expediente Avisos - Cliente
- Quitar el botón «Bandeja Central».
- Avisos que deben llegar al Cliente:
  - Cuando SOFEIN crea un expediente para él y tiene que confirmar que está ok.
  - Cuando SOFEIN le requiere que suba un documento.
  - Cuando SOFEIN sube un documento, o valida uno que haya subido el proveedor para el cliente.
  - Cuando SOFEIN registra un cambio/incidencia y el cliente tiene que firmarlo.
  - Cuando un proveedor firma el registro de un cambio/incidencia.
  - Cuando SOFEIN le muestra varios proveedores para que preseleccione.
  - Cuando SOFEIN le muestra las cotizaciones de varios proveedores para que seleccione uno.
  - Cuando SOFEIN formaliza el pedido con el proveedor que haya seleccionado el cliente.
  - Cuando SOFEIN pasa el suministro a la siguiente fase.
  - Pueden surgir más avisos más adelante.

### Gestión del expediente - Proveedor
- Mismos cambios en la ficha que para el Cliente; quitar «Vista Proveedor: …».

### Gestión del expediente Documentación - Proveedor
- Igual que para el Cliente (mismos campos, «ver» abre el documento, «subsanar» cambia el archivo).

### Gestión del expediente Registro de incidencias y cambios - Proveedor
- Igual que para el Cliente, con el botón de firma en el recuadro del proveedor.

### Gestión del expediente Avisos - Proveedor
- Quitar el botón «Bandeja Central».
- Avisos que deben llegar al Proveedor:
  - Cuando SOFEIN le requiere que suba un documento.
  - Cuando SOFEIN sube un documento, o valida uno que haya subido el cliente para el proveedor.
  - Cuando SOFEIN registra un cambio/incidencia y el cliente tiene que firmarlo (tal cual en el original; probablemente quiere decir «el proveedor»).
  - Cuando el cliente firma el registro de un cambio/incidencia.
  - Cuando SOFEIN le requiere cotización para un suministro.
  - Cuando SOFEIN pide formalizar el pedido después de que el cliente haya aceptado una cotización.
  - Cuando SOFEIN pasa el suministro a la siguiente fase.
  - Pueden surgir más avisos más adelante.
