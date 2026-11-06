# Cambios tras la reunión con Flor (SOFEIN)

Notas de Ángel Plaza y Guillermo, unificadas y sin duplicados. Estado a 6 nov 2026.
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
| 2 | **Fase de contrato con firma de cliente y proveedor** | Nueva fase («5. Contrato» del selector según Ángel; «Fase 2.1» en las notas de Guillermo) con características del suministro, datos del acuerdo, adjuntos y cumplimientos elegidos, y firma de las dos partes. El pedido no avanza sin ella. Debe tener más empaque (formato tipo «Registro de incidencias»). La firma real necesita un proveedor de firma electrónica. | Aclarar la posición de la fase; backend y firma electrónica. |
| 3 | **Solicitar mejora de oferta** | Fila nueva en la comparativa de la fase 4 con un botón por proveedor: el cliente describe la mejora, SOFEIN la valida o la rechaza y el proveedor actualiza su oferta. Nuevos estados y avisos. | — (se puede hacer en el front ya). |
| 4 | **Requisitos adicionales estructurados del cliente** | En 2. Preselección, una lista de requisitos (título + descripción); el proveedor indica en su cotización si cumple cada uno, y el resultado aparece en una fila de la comparativa. De momento existe la pregunta abierta. | Cambia el modelo de cotización. |
| 5 | **Varias personas por cliente/proveedor + admin de la cuenta** | Contactos con nombre, apellidos, cargo/departamento, email y teléfono (sustituye a los «varios teléfonos» de v62). Admin de la cuenta: uno de los contactos o un perfil genérico con otro email. Se muestran en filas en los perfiles. | Supabase Auth (el admin es quien inicia sesión). |
| 6 | **Roles dentro de cada cuenta** (compras, jefe de obra, calidad…) | Accesos distintos por rol. Es una fase posterior y hay que valorarlo. | Punto 5. |
| 7 | **Más acuerdos y compromisos firmables en el perfil del proveedor** | Seguro de RC como requisito obligatorio con caducidad y aviso; acuerdos que el proveedor debe firmar. Referencia: Nalanda Global (gestión documental de proveedores). | Firma electrónica; almacenamiento. |
| 8 | **Descargas reales del Certificado (PDF) y del expediente (ZIP)** | Ahora la descarga del PDF usa la impresión del navegador y el ZIP es una maqueta. | Storage y Edge Function. |
| 9 | **Integrar Claude** | Chatbot dentro de la app y/o acceso de Claude a la base de datos. Siempre a través de una función de backend que guarde la clave (nunca desde el navegador). | Backend. |
| 10 | **Licitaciones** | Es complejo y hoy no se resuelve bien; la propia cliente lo deja para una segunda fase. | — |

## ❓ Dudas para Flor o Ángel
- Fase de contrato: ¿«5. Contrato» del selector o «Fase 2.1»? ¿Va antes o después de que SOFEIN valide la adjudicación?
- Requisitos adicionales: ¿lista estructurada con respuesta sí/no por proveedor o basta con la pregunta abierta que ya está?
- Encuesta: ¿una por suministro (como está ahora) o una por expediente? ¿Se cierra sola a los 15 días sin respuesta (como está ahora)?
- Admin genérico con otro email: ¿es un usuario que inicia sesión o solo un contacto?
- Las notas de Ángel tienen fecha «10/04/2026»; ¿es una errata?
