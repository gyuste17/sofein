# SOFEIN Rail Assurance Hub

Mockup navegable para una plataforma de soporte, trazabilidad y gestion documental en proyectos ferroviarios.

## Tecnologias

- HTML5, CSS3 y JavaScript plano (sin build).
- Estetica oscura monocroma estilo Attio: minimalista, profesional y data-dense.
- App de una sola estructura (SPA con router por hash). Funciona con doble clic, sin servidor.
- Estructura compatible con una futura migracion a React, Vue, Angular o backend tradicional.

## Como abrirlo

- `index.html`: landing de marketing. Doble clic en el navegador.
- `app.html`: la plataforma (paneles por rol). Se abre desde la landing o directamente.

## Estructura

- `index.html`: landing oscura (anuncio, hero con preview, valor, accesos por rol, trazabilidad, estados, alcance).
- `app.html`: contenedor de la SPA. El contenido lo renderiza `app.js` segun la ruta.
- `app.js`: datos + router por hash + shell (sidebar/topbar) + vistas por rol e interacciones.
- `styles.css`: sistema visual oscuro Attio (shell, sidebar, tablas, tracker, pills, cards) y responsive.
- `cliente.html`, `proveedores.html`, `admin.html`, `expediente.html`: stubs que redirigen a la ruta correspondiente de `app.html`.
- `assets/rail-hero.png`: imagen disponible para usos futuros.
- `docs/PROJECT_BRIEF.md`: analisis funcional, complejidad, equipo y fases.

## Rutas de la app (hash)

- `app.html#cliente` -> Resumen, `#cliente/trazabilidad`, `#cliente/documentos`, `#cliente/informes`.
- `app.html#proveedor` -> Solicitudes, `#proveedor/perfil`, `#proveedor/documentacion`.
- `app.html#admin` -> Expedientes, `#admin/matching`, `#admin/trazabilidad`, `#admin/documentos`.
- `app.html#admin/expedientes/SFN-2026-H6T4` -> detalle de un expediente.

## Objetivo de la fase 1

Validar con cliente una herramienta sencilla pero convincente:

- Portal privado por rol.
- Expedientes de pedido.
- Comparador basico de proveedores.
- Trazabilidad visual por hitos.
- Gestion documental.
- Firma y reportes como integraciones o modulos.
- Informes premium de sostenibilidad como oportunidad comercial.

## Nota de alcance

La version actual es una maqueta estatica para validar producto y presupuesto.
La implementacion real necesitara backend, base de datos, permisos, almacenamiento
documental, notificaciones y probablemente integracion con un proveedor de firma.
