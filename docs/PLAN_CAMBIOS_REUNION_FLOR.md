# Cambios tras la reunión con Flor (SOFEIN)

Notas de Ángel Plaza y Guillermo, unificadas y sin duplicados. Estado a 11 nov 2026 (incluye las respuestas de Ángel del 11 nov).
Detalle técnico de cada cambio: `HANDOFF.md` (entrada v63). Modelo de datos: `docs/BACKEND_SPEC.md`.

## ✅ Quick wins hechos (v63)

### Lote 1: textos y limpieza
| # | Cambio | Dónde |
| :- | :--- | :--- |
| 1 | «Conformidades» pasa a «Cumplimientos» | Menú de SOFEIN, catálogo, directorio, perfiles, selector y ofertas. Las claves internas no cambian. |
| 2 | «Mis suministros» en el menú del proveedor (y del cliente, para que coincida con el título de la pantalla) | Barra lateral. SOFEIN sigue con «Suministros». |
| 3 | Separador de miles en todos los importes | Nuevo `fmtNumEs`: `toLocaleString("es-ES")` no agrupa las cifras de 4 dígitos (salía «4688 €»). Afecta a precios unitarios y totales del selector, presupuestos y KPIs. |
| 4 | Subir documentación: fuera la opción «Destinatario final» | Casillas de visibilidad de documentos. |
| 5 | Perfil del proveedor | Fuera «Editar datos del perfil», «Subir certificado», «Mis suministros adjudicados» y los KPIs en texto. 3 cajas: expedientes, suministros y volumen adjudicado (en curso de total). |
| 6 | Perfil del cliente | Fuera «Editar datos corporativos», «Mis expedientes…», los KPIs en texto y «Estado verificado». 3 cajas: expedientes, suministros y volumen (en curso de total). |
| 7 | «Documentación y acuerdos generales» en los dos perfiles | Acuerdo marco con SOFEIN, declaraciones responsables y seguro de RC (datos de ejemplo). Los «Cumplimientos» van en un bloque aparte. |
| 8 | El Pasaporte Digital pasa a ser el «Certificado SOFEIN» | Cabecera (título, código, cliente, destino); etiqueta azul «Borrador: suministro en curso» / «Certificado final»; sin sello ni SHA-256; 1. Resumen por suministro + contrato firmado + adjuntos; 2. Registro de incidencias y cambios; 3. Documentación adicional automática; «Delimitación Legal»; 2 botones (PDF y ZIP). Renombrado en toda la app. |

### Lote 2: piezas nuevas independientes
| # | Cambio | Dónde |
| :- | :--- | :--- |
| 9 | Sugerencias | Entrada abajo del menú, junto al perfil. Cliente y proveedor: título, descripción, adjuntos, envío con perfil o anónimo, enlace de contacto y mensaje de confirmación. SOFEIN: tabla que se puede ordenar, filtrar y exportar a Excel (CSV), con texto recortado y el resto al pasar el ratón, y contador de nuevas. |
| 10 | Encuesta de satisfacción en el cierre | Cliente: franja blanca en la fase 4 durante 15 días («¿Todo está bien con el suministro de 14.500 traviesas?») con caja de respuesta. SOFEIN: estado (pendiente, recibida o cerrada), la respuesta y un botón para cerrarla. |
| 11 | Campos de texto libre en el selector | Indicaciones de SOFEIN a los proveedores al pedir cotización; «Anotaciones / Condicionantes» del proveedor en su oferta (se ven en la fase 3 de SOFEIN y en una fila de la comparativa de la fase 4); «¿Algún otro requisito imprescindible…?» del cliente en las fases 2 y 4. |
| 12 | «Próxima entrega» con ⓘ | Al pasar el ratón muestra todas las entregas del expediente con sus fechas (tarjetas y ficha). |
| 13 | Anotaciones con documentos | Al añadir una anotación interna se pueden adjuntar documentos, que se abren directamente desde la tabla. |

### Lote 3
| # | Cambio | Dónde |
| :- | :--- | :--- |
| 14 | Barra de ubicación fija y precisa | La barra superior se queda fija al hacer scroll y muestra la ruta completa: expediente › suministro › fase › pestaña, selector › suministro › paso, y directorio › tipo › búsqueda. Cada tramo es un enlace. En móvil se desplaza para mostrar el final. Sustituye a la cabecera fija propia de la ficha. |

## 🧭 Plan: lo que queda para más adelante

Por orden de dependencia aproximado. Casi todo necesita el backend (Supabase), ver `docs/BACKEND_SPEC.md`.

| Prioridad | Tema | Qué implica | Depende de |
| :- | :--- | :--- | :--- |
| 1 | **Estudio/Proyecto frente a Expediente** | Para Flor solo es «expediente» cuando hay cotización y adjudicación; antes sería «estudio» o «proyecto». Cambia el nombre y el ciclo de vida, y aparecerá «En fase de estudio / En fase de gestión del pedido / Solicitar estudio». | Preguntar a Flor cómo lo gestiona hoy. |
| 2 | **Certificado SOFEIN por suministro** | (Ángel, 11 nov) Un certificado para cada suministro, no uno por expediente, porque cada suministro puede tener un proveedor distinto. Hoy (v63) hay uno por expediente con una fila por suministro. Implica: pestaña del certificado ligada al suministro seleccionado, etiqueta «Certificado final» al cerrar **ese** suministro, y descargas por suministro. | Confirmar con Flor si además quiere uno global del expediente. Se puede hacer en el front. |
| 3 | **Fase «5. Contrato» del selector, con firma de cliente y proveedor** | Decidido con Ángel (11 nov): va como **5. Contrato**, después de que el cliente elija proveedor y SOFEIN lo valide. Incluye características del suministro, datos del acuerdo, adjuntos y cumplimientos elegidos, y firma de las dos partes, con un formato parecido al «Registro de incidencias». El pedido no avanza sin ella (sustituye a la «Fase 2.1» de las notas de Guillermo). La firma real necesita un proveedor de firma electrónica. | Backend y firma electrónica (la maqueta se puede hacer ya). |
| 4 | **Solicitar mejora de oferta** | Fila nueva en la comparativa de la fase 4 con un botón por proveedor: el cliente describe la mejora, SOFEIN la valida o la rechaza y el proveedor actualiza su oferta. Nuevos estados y avisos. | — (se puede hacer en el front ya). |
| 5 | **Varias personas por cliente/proveedor + admin de la cuenta** | Contactos con nombre, apellidos, cargo/departamento, email y teléfono (sustituye a los «varios teléfonos» de v62). Propuesta de Ángel: indicar un admin por cliente y proveedor, que puede ser **uno de los contactos o un perfil genérico con otro email**, dando las dos opciones en la plataforma. Se muestran en filas en los perfiles. | Preguntar a Flor si quiere las dos opciones o solo una; Supabase Auth (el admin es quien inicia sesión). |
| 6 | **Roles dentro de cada cuenta** (compras, jefe de obra, calidad…) | Accesos distintos por rol. Es una fase posterior y hay que valorarlo. | Punto 5. |
| 7 | **Más acuerdos y compromisos firmables en el perfil del proveedor** | Seguro de RC como requisito obligatorio con caducidad y aviso; acuerdos que el proveedor debe firmar. Referencia: Nalanda Global (gestión documental de proveedores). | Firma electrónica; almacenamiento. |
| 8 | **Descargas reales del Certificado (PDF) y del expediente (ZIP)** | Ahora la descarga del PDF usa la impresión del navegador y el ZIP es una maqueta. Con el punto 2, las descargas serán por suministro. | Storage y Edge Function. |
| 9 | **Integrar Claude** | Chatbot dentro de la app y/o acceso de Claude a la base de datos. Siempre a través de una función de backend que guarde la clave (nunca desde el navegador). | Backend. |
| 10 | **Licitaciones** | Es complejo y hoy no se resuelve bien; la propia cliente lo deja para una segunda fase. | — |

## ✔️ Decidido con Ángel (11 nov 2026)
- **Contrato:** va como «5. Contrato» del selector (punto 3 del plan).
- **Requisitos adicionales del cliente:** se deja como **pregunta abierta**, que ya está hecha en v63 («¿Algún otro requisito imprescindible…?» en las fases 2 y 4). Sale del plan la lista estructurada (título, descripción y respuesta sí/no del proveedor).
- **Certificado SOFEIN:** uno por suministro (punto 2 del plan).

## ❓ Para preguntar a Flor en las próximas reuniones
1. **Estudio/expediente:** ¿cómo lo gestiona hoy? ¿En qué momento pasa a llamarse expediente y qué ve el cliente antes?
2. **Encuesta de satisfacción:** hoy (v63) hay una por suministro. Ángel lo ve lógico, porque son materiales y proveedores distintos y se pueden cerrar en fechas distintas, pero puede que Flor prefiera **una encuesta global** para cerrar todo el expediente de una vez. ¿Cuál prefiere? ¿Se cierra sola a los 15 días sin respuesta (como está ahora)?
3. **Certificado SOFEIN:** además del certificado por suministro, ¿quiere también uno global del expediente?
4. **Admin de la cuenta:** ¿damos las dos opciones (uno de los contactos o un perfil genérico con otro email) o prefiere solo una?
5. Fecha de las notas de Ángel («10/04/2026»): ¿errata?
