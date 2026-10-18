#  Estudio de Viabilidad, Usabilidad y Coherencia de Diseño — Ecosistema SOFEIN

**Autor:** Claude (Principal Product Designer / UI-UX Engineer) · **Fecha:** 2026-10-18 · **Rama:** `procurement`
**Alcance inspeccionado:** `styles.css` (4.829 líneas), `index.html`, `sofein-digital.html`, `consulting.html`, `sobre-nosotros.html`, `app.html` + `app.js` (7.148 líneas), `pizarra.html`.
**Regla de oro aplicada:** cero cambios de copy/contenido. Todo lo propuesto es CSS, reestructuración de clases o ajustes de marcado mínimos, sin romper selectores ni listeners de `app.js`.

> Este documento es **solo de diagnóstico y propuesta**. No se ha modificado ningún archivo de código. Pendiente de tu aprobación antes de tocar `styles.css`, los `.html` o `app.js`.

---

## 1. Resumen ejecutivo y diagnóstico general

### 1.1 Hallazgo estructural más importante

El ecosistema **no tiene dos capas (Landing + Portal) que haya que "unificar" visualmente** — tiene **tres generaciones de sistema de diseño superpuestas** dentro de los mismos archivos, dos de ellas en gran parte muertas:

| Generación | Prefijo de clases | Dónde vive | Estado real |
|---|---|---|---|
| **Gen 1 — "SaaS Attio-style"** (sidebar/topbar/kpis/tablas genéricas + landing `.hero`/`.section`) | `.sidebar`, `.app-topbar`, `.data-table`, `.kpi`, `.panel`, `.nav-link`, `.hero`, `.value-grid`, `.portal-entry`, `.phase-grid`, `.legend-grid`, `.cta-band` | `styles.css` líneas ~975-1875 (~750 líneas) + mitad de `index.html` | ☠️ **Muerta.** `app.js` no usa ninguna de estas clases (0 coincidencias verificadas). El marcado de `index.html` que las usa está oculto por CSS (ver 1.2). |
| **Gen 2 — Marketing "Digital/Product"** | `.digital-*`, `.product-*` | Top de `index.html`, `sofein-digital.html`, `consulting.html`, `sobre-nosotros.html` | ✅ **Viva y es la que el usuario ve hoy.** Pero cada página re-declara sus propios hex (`--digital-green:#52df7f`, `--product-accent:#7edb60` / `#d74758`) en vez de heredar un único token de marca. |
| **Gen 3 — "SOFEIN Procurement B2B SaaS" (admin/entity/procurement)** | `.admin-*`, `.entity-*` (vars), `.procurement-modal-*`, `.passport-*`, `.dossier-*` | `app.js` (SPA) desde `styles.css` línea ~2069 en adelante | ✅ **Viva, es la real, y es sólida.** Tokens centralizados en `:root[data-theme="dark"/"light"]`, con tema claro/oscuro funcional. Es la base correcta sobre la que construir, **no hay que rehacerla**. |

**Conclusión clave:** el proyecto no arrastra "deuda de estilo visual" tanto como **deuda de limpieza**. La Gen 3 (el portal real) ya está bien construida y alineada con la referencia Stripe/Linear/Ramp que pide el propio `docs/DISENO_SOFEIN_PROCUREMENT.md`. El trabajo principal es: (a) eliminar/aislar el código muerto de Gen 1, (b) hacer que Gen 2 y Gen 3 comparta tokens de marca, y (c) pulir un conjunto muy concreto y acotado de fricciones táctiles/accesibilidad que afectan a toda la Gen 3 por igual (por repetirse en un único patrón CSS, el arreglo es barato).

### 1.2 Hallazgo nº 2: ~150 líneas de `index.html` nunca se renderizan

`index.html` tiene `<body class="digital-landing">` (línea 13). La regla CSS:

```css
/* styles.css:1876 */
.digital-landing main > .hero,
.digital-landing main > .section,
.digital-landing .site-footer { display:none; }
```

oculta **todo** el bloque heredado de Gen 1 que sigue pegado debajo de la sección `.digital-cta` en `index.html` (líneas ~47-195): la sección `.hero` clásica, "Producto" (`.value-grid`), "Accesos por rol" (`.portal-entry`), "Trazabilidad" (`.phase-grid`), "Estados claros" (`.legend-grid`), "Alcance recomendado" y la banda CTA final. Es **más de la mitad del archivo HTML**, con sus propias imágenes (`assets/rail-hero.png`, `assets/premium-rail-bg.png`, `assets/premium-steel-bg.png`) que el navegador sigue descargando aunque no se vean. No es una decisión de diseño: es contenido huérfano de una iteración anterior que nadie borró.

### 1.3 Diagnóstico Desktop

- **Fortalezas:** Gen 2 (landing) y Gen 3 (portal) tienen, cada una por separado, una jerarquía tipográfica cuidada, buen uso de `clamp()` para fluidez, paleta oscura coherente dentro de su propio sistema, y microanimaciones discretas (`modalPopIn`, `admin-slide`, `popoverFadeIn`, `barGrow`). El portal tiene un selector de rol (demo), tema claro/oscuro real, breadcrumbs, y una tabla de expedientes con conversión a "card" en overflow bien pensada.
- **Fricciones:** (1) tres paletas de verde distintas coexisten sin un único token de marca (`--accent:#52df7f` en Gen 1, `--digital-green:#52df7f` en Gen 2 — casualmente igual — pero `--entity-accent:#7cdd65` en Gen 3 es un verde ligeramente distinto); (2) 13 modales (`.procurement-modal-backdrop`) repiten exactamente el mismo bloque de HTML/CSS inline sin estandarizar anchura máxima de contenido ni comportamiento en overflow; (3) la hoja de impresión (`@media print`, `styles.css:4775`) referencia clases que no existen en el DOM real (`.app-sidebar`, `.app-topbar`, `.toast`) — ver §3.1.

### 1.4 Diagnóstico Mobile — fricciones críticas

El portal **ya tiene** una base de navegación móvil real (drawer `.admin-sidebar` + `.admin-scrim` + botón `.admin-menu`, breakpoint 760px) y tablas que colapsan a formato fila/ficha en móvil (`.admin-doc-row`, `.admin-exp-card`, etc.). **No hay que construir la adaptabilidad móvil desde cero** — hay que:

1. **Corregir sistemáticamente el tamaño de las áreas táctiles.** Es la friccion más extendida y más barata de arreglar: prácticamente ningún control interactivo del portal alcanza 44×44px (ver tabla §3.2).
2. **Añadir affordance de scroll horizontal.** 7 componentes distintos usan `overflow-x:auto` sin ningún indicio visual (gradiente, sombra, flechas) de que hay contenido oculto a la derecha — en móvil, sin scrollbar visible, el usuario no sabe que puede deslizar.
3. **Blindar los modales en pantallas cortas.** Ningún modal tiene `max-height` + `overflow-y:auto` en el cuerpo; en un móvil en horizontal o con teclado abierto, un modal largo puede desbordar el viewport sin posibilidad de scroll.
4. **Accesibilidad de los modales.** Ningún modal usa `role="dialog"`/`aria-modal="true"`, no hay cierre con `Escape`, no hay gestión de foco al abrir/cerrar. Esto afecta igual a desktop y mobile pero es más crítico en mobile por la ausencia de affordances visuales alternativas.

---

## 2. Análisis detallado por pantalla/módulo

### A. Landing pages

**Header / menú móvil.** Hay **dos implementaciones de header distintas** para landing:
- `index.html`: `.digital-header` + `.digital-nav` + botón `.digital-menu`, con script inline que llama a `document.getElementById("topbar").classList.toggle("nav-open")`. **Bug menor:** el script de `index.html` (línea ~221) busca `.main-nav a` para cerrar el drawer al pulsar un link, pero el nav real se llama `.digital-nav`. El selector nunca encuentra nada — no rompe nada visible porque la navegación son enlaces a otras páginas (recarga completa), pero es código muerto/confuso que conviene limpiar o corregir.
- `sofein-digital.html`, `consulting.html`, `sobre-nosotros.html`: `.product-header` + `.product-nav` + botón `.product-menu`, con un script inline **distinto** (una sola línea, sin cierre automático al pulsar un link). En `consulting.html` esto es un problema real: su nav móvil contiene un enlace de ancla `href="#contacto"` que **no recarga la página**; si el usuario abre el menú móvil y pulsa "Enviar mensaje"/el link de contacto, el drawer se queda abierto tapando la pantalla tras el scroll.

**Duplicidad visual confirmada:** `index.html` mezcla el sistema `.digital-*` (visible) con el sistema `.hero`/`.section` heredado (invisible, ver §1.2). Esto no es solo un problema estético: cualquier futuro editor que abra `index.html` sin saber esto perderá tiempo "arreglando" una sección que nunca se ve.

**Jerarquía de botones y CTAs:** Coherente dentro de cada página — `.digital-button` / `.product-button` siempre en acento de marca, `.digital-text-link` / `.product-text-link` como link secundario con subrayado. El único salto real es de color: SOFEIN Digital (verde `#7edb60`) vs SOFEIN Consulting (rojo `#d74758`) vs Sobre Nosotros (verde, pero fondo claro en `.about-intro`/`.about-pillars` — única sección de toda la landing con fondo claro, rompiendo el dark-mode consistente del resto). Esto puede ser intencional (contraste editorial) pero conviene confirmarlo contigo antes de "corregirlo".

**Widget de chat:** `.sofein-chat` solo existe en `index.html`. No aparece en `sofein-digital.html`, `consulting.html`, `sobre-nosotros.html` ni en el portal. Inconsistencia de presencia de componente — a decidir si es intencional (chat solo en home) o se quiere en todas las páginas públicas.

### B. Portal SPA Procurement (`app.html` / `app.js`)

**Arquitectura de renderizado:** Router por `location.hash` (`#admin/...`, `#cliente/...`, `#proveedor/...`, `#destinatario`), funciones `renderAdminView`, `renderClienteView`, `renderProveedorView`, `renderPassportSection`, etc., que inyectan `innerHTML` sobre `#app`. **Importante para la viabilidad de cualquier cambio:** no hay framework de componentes — todo es string-templates con clases `.admin-*`/`.entity-*` y **mucho estilo inline** (`style="color:var(--entity-text)"` repetido centenares de veces). Esto es viable de tocar vía CSS (los `var(--entity-*)` siguen centralizados), pero significa que **cualquier cambio de espaciado/tamaño puntual escrito inline no se puede corregir solo con CSS global** — habrá que tocar strings de plantilla en `app.js` en esos puntos concretos. Lo identificaremos caso por caso en el plan de acción.

**Sidebar / Topbar (Desktop vs Mobile):** `renderSidebar()` (app.js:971) y `renderTopbar()` (app.js:1002) generan `.admin-sidebar` y `.admin-topbar`. En desktop, sidebar fija de 236-262px con navegación por rol, selector de rol "sutil" en topbar (popover), toggle de tema claro/oscuro real, campana de notificaciones. En mobile (`@media max-width:760px`, `styles.css:1997`), la sidebar se convierte en drawer con `transform:translateX(-100%)` + `.admin-scrim`. **Funciona correctamente como patrón**, pero: el botón `.admin-menu`/`.admin-bell` mide 36×36px y el `.role-switcher-btn`/`.topbar-icon-btn` 32px — todos por debajo de 44px.

**Tablas de datos B2B:** No existe una clase `.proc-table` genérica; cada módulo tiene su propia tabla/lista (`.admin-doc-row`, `.admin-request-list`, `.admin-match-list`, `.admin-cert-inbox-list`, `.passport-certs-table`, `.b2b-dir-table-wrap`). El patrón responsive es consistente y bien pensado: en mobile se ocultan columnas secundarias (`.admin-due`, `.admin-row-action`, `time`) y se reorganiza en grid de 2-3 columnas. **Lo que falta:** indicador visual de scroll horizontal en las que no colapsan (comparativas, directorio de proveedores, tabla de certificados del Pasaporte).

**Formularios y modales:** Sistema único y consistente (`.procurement-modal-backdrop` / `.procurement-modal`, 13 instancias en `app.js`: auditoría de certificado, crypto del pasaporte, timeline, añadir slot, documento libre, rechazar documento, inspeccionar documento, incidencia, mediación, firma, adenda, crear aviso, añadir entidad). Todas comparten el mismo patrón de apertura/cierre (`modalWrap.innerHTML = ...`, cierre por click en backdrop + botón ×). Es una base **muy fácil de endurecer de una sola vez** (ver Fase 4) porque el patrón se repite literalmente, no hay 13 implementaciones distintas.

**Módulos especializados:**
- *Pasaporte Digital* (`.passport-*`): el módulo mejor pulido del portal — tiene su propia hoja de impresión A4 (`@media print`, con bug de selectores, §3.1), grid de especificaciones responsive a 3→2→1 columnas, timeline de trazabilidad, firmas tripartitas, tabla de certificados con `overflow-x:auto` sin affordance.
- *Trazabilidad por fases* (`.dossier-stepper`, `.admin-phase-tracker`, `.entity-phase-tracker`): tres implementaciones de "stepper de 7 fases" con nombres distintos (`dossier-stepper` / `admin-phase-tracker` / `entity-phase-tracker`) que cumplen la misma función visual en tres contextos (constructor de expediente / vista admin / vista cliente-proveedor). No es necesariamente un error — pueden tener matices de interacción distintos — pero es candidato a unificar en un solo componente con variantes, reduciendo CSS duplicado.
- *Incidencias* (`.incident-mediation-panel`, `.admin-alert-row.is-critical/.is-urgent`): coherente con el resto de badges de estado.

### C. Tokens y sistema de diseño en `styles.css`

**Paleta de colores:** Tres `:root` de tokens de color activos a la vez en el mismo archivo:
1. `:root` genérico (línea 7) — `--accent`, `--st-pending/delivered/validated/rejected/signed` — usado solo por lo que queda vivo de Gen 1 (`.status-pill`, reutilizada puntualmente) y por el sistema de badges original.
2. Variables hardcodeadas por página en Gen 2 (`--digital-green`, `--product-accent`, redefinida distinta en `.product-red`) — no son `:root`, son scoped a `.digital-landing`/`.product-page`, por diseño, pero no comparten un token de marca único con el resto.
3. `:root[data-theme="dark"]` / `:root[data-theme="light"]` (líneas 1901-1902) — el sistema real y vivo del portal, con tema claro/oscuro completo y bien resuelto (incluye `--entity-blue`, `--entity-purple`, `--entity-warning` para estados semánticos adicionales).

No hay inconsistencia de contraste grave dentro de cada sistema tomado por separado — los tres manejan bien texto secundario/bordes con opacidad baja sobre fondo oscuro. El problema es la **falta de una fuente única de verdad de marca** (un verde "SOFEIN" que todas las superficies compartan).

**Escala tipográfica:** Coherente: Inter en portal y Gen 1, pero Gen 2 (`.product-*`, `.digital-*`) usa `Georgia, serif` para titulares (`h1`/`h2` dentro de `.product-hero`, `.split-copy`, etc.) — mezcla serif editorial en marketing vs sans-serif en producto. Puede ser intencional (tono "editorial premium" vs "SaaS técnico") — a confirmar contigo, no se tocará sin visto bueno.

**Botones y badges:** Tres familias de botón (`.button` Gen1, `.digital-button`/`.product-button` Gen2, `.admin-primary-button`/`.admin-quiet-button` Gen3) y dos familias de badge (`.status-pill` Gen1/genérico, `.entity-status`/`.dossier-chip`/`.role-dot` Gen3). Cada familia es internamente consistente; no hay necesidad de "fusionarlas" en una sola (marketing y producto pueden legítimamente tener su propio lenguaje de botón), pero sí de **unificar las alturas táctiles mínimas** entre ellas (ver tabla §3.2).

---

## 3. Viabilidad técnica y matriz de riesgo

### 3.1 Confirmación de viabilidad: solo CSS + micro-ajustes de clase

Todo lo detectado es corregible sin tocar la lógica de `app.js` (routing, listeners `data-go`, `data-switch-role`, `data-toast`, `data-download`), con dos excepciones puntuales donde sí hace falta tocar un string de plantilla:
- El selector roto de `index.html` línea 221 (`.main-nav a` → `.digital-nav a`) está en el `<script>` inline del propio HTML, no en `app.js`.
- La hoja de impresión del Pasaporte (`styles.css:4775-4807`) referencia `.app-sidebar`, `.app-topbar`, `.toast` que no existen; el arreglo es **renombrar esos selectores CSS** a los reales (`.admin-sidebar`, `.admin-topbar`, `.admin-toast`/`.entity-toast`, `#modalContainer` ya está bien) — cero riesgo, no toca `app.js`.
- Añadir `role="dialog"`, `aria-modal="true"` y un listener de `Escape` a los modales requiere una modificación pequeña y **única** en la función compartida de apertura de modal (si se centraliza) o repetida 13 veces si no — recomiendo centralizar primero (ver Fase 4).

### 3.2 Matriz de áreas táctiles por debajo de 44px (verificado en `styles.css`)

| Componente | Tamaño actual | Línea aprox. |
|---|---|---|
| `.admin-menu` / `.admin-bell` (topbar) | 36×36px | 1985 |
| `.role-switcher-btn` | `min-height:32px` | 2089-2103 |
| `.topbar-icon-btn` | 32×32px | 2202-2216 |
| `.admin-primary-button` / `.admin-quiet-button` | `min-height:38px` | 1986 |
| `.admin-exp-actions .admin-quiet-button` | `min-height:34px` | 1991 |
| `.admin-recipient button` | `min-height:35px` | 1994 |
| `select`, `.admin-filterbar select` | `min-height:40-42px` | 1521, 1989 |

Son **siete puntos de origen**, no decenas de sitios distintos — porque el CSS está bien tokenizado, subir la altura mínima en estas reglas (incluso solo dentro de un `@media (pointer: coarse)` o `@media (max-width: 760px)` para no alterar la densidad deseada en desktop) arregla el touch-target en todo el portal de una sola vez.

### 3.3 Matriz Esfuerzo vs Impacto

| Acción | Esfuerzo | Impacto | Riesgo de romper algo |
|---|---|---|---|
| Eliminar/archivar HTML muerto de `index.html` (§1.2) | Bajo | Alto (rendimiento + mantenibilidad) | Ninguno (ya no se ve) |
| Purgar CSS muerto de Gen 1 (~750 líneas) | Medio (hay que confirmar 1 a 1 que nada vivo depende de clases compartidas como `.button`, `.chip`, `.view-head`, `.crumbs`) | Alto (−15% del archivo) | Bajo si se hace con grep de verificación por clase antes de borrar |
| Corregir selectores rotos (`.main-nav`, `@media print`) | Muy bajo | Medio (funcionalidad de impresión y limpieza) | Ninguno |
| Subir áreas táctiles a 44px (7 reglas) | Muy bajo | Muy alto (usabilidad móvil B2B) | Ninguno, cambio aditivo en mobile |
| Añadir affordance de scroll horizontal (7 componentes) | Bajo | Alto en mobile | Ninguno, solo `::before`/`::after` con `mask-image` |
| Centralizar apertura/cierre de modal + a11y (ESC, `aria-modal`, `max-height`) | Medio (toca `app.js` en 13 puntos o se centraliza en 1 helper) | Alto (accesibilidad + robustez mobile) | Bajo-medio: hay que probar los 13 modales tras el cambio |
| Unificar token de marca verde entre Gen 2 y Gen 3 | Bajo | Medio (coherencia de marca) | Ninguno, es cambiar valores hex, no estructura |
| Unificar los 3 steppers de fase en un componente | Alto | Medio | Medio — tres contextos con datos distintos, requiere pruebas visuales en cada rol |

---

## 4. Plan de acción propuesto (para tu aprobación)

### FASE 1 — Coherencia global de navegación y header (Landing + Portal)
1. Unificar el script de toggle de menú móvil entre `index.html`, `sofein-digital.html`, `consulting.html`, `sobre-nosotros.html` (mismo comportamiento: abrir, cerrar al pulsar fuera, cerrar al navegar/anclar).
2. Corregir el selector `.main-nav a` → `.digital-nav a` en `index.html`.
3. Decidir contigo: ¿el widget de chat (`.sofein-chat`) debe estar en las 4 páginas públicas o solo en home? Aplicar la decisión de forma consistente.
4. Decidir contigo: ¿unificar el verde de marca entre `--digital-green`, `--product-accent` y `--entity-accent` a un único hex, o mantener matices intencionados por sección?

### FASE 2 — Adaptabilidad mobile del Portal SPA
1. Subir a 44×44px mínimo (en mobile) los 7 controles listados en §3.2, sin tocar su tamaño en desktop si se prefiere mantener densidad allí.
2. Añadir affordance de scroll horizontal (gradiente de borde) a: `.rail-scroll`, `.table-wrap`, `.entity-phase-scroll`, `.admin-phase-scroll`, `.dossier-stepper`, `.b2b-dir-table-wrap`, `.selector-matrix-wrap`, `.passport-certs-wrap`.
3. Blindar `.procurement-modal` en mobile: `max-height: calc(100vh - 40px)` + `overflow-y: auto` en `.procurement-modal-body`, para que ningún formulario largo quede inalcanzable en pantallas cortas.
4. Revisar `.admin-exp-card`, `.admin-doc-row` y demás colapsos de tabla→card en un dispositivo real o emulado a 360px y 390px de ancho (iPhone SE / estándar) para confirmar que no hay texto cortado tras los cambios de la Fase 2.1.

### FASE 3 — Estandarización de componentes en `styles.css`
1. Auditar y purgar el bloque "APP SHELL (SPA)" heredado (`styles.css` ~975-1727) confirmando primero, clase por clase, que nada vivo depende de ella (ya verificado: `app.js` no usa `.sidebar`, `.app-topbar`, `.data-table`, `.kpi`, `.panel`, `.nav-link`, `.workspace-switch`, `.icon-button`, `.score-ring`, `.report-item`; sí usa `.chip`, `.view-head`, `.crumbs` — estas tres deben conservarse o migrarse antes de borrar el resto).
2. Eliminar el bloque HTML muerto de `index.html` (líneas ~47-195) o, si se prefiere conservar como referencia histórica, moverlo a un archivo aparte fuera del `<body>` activo.
3. Corregir los selectores rotos de `@media print` (`.app-sidebar`→`.admin-sidebar`, `.app-topbar`→`.admin-topbar`, `.toast`→`.admin-toast`).
4. Eliminar `.admin-drawer`/`.admin-drawer-wrap` (0 usos confirmados en `app.js`) o documentar por qué se conserva si hay un uso previsto a corto plazo.

### FASE 4 — Microinteracciones, accesibilidad (WCAG AA) y pulido visual
1. Centralizar la apertura/cierre de los 13 modales en un helper común de `app.js` (mismo comportamiento ya existente, pero en un solo punto) y añadir: `role="dialog"`, `aria-modal="true"`, cierre con tecla `Escape`, devolución de foco al elemento que abrió el modal.
2. Revisar contraste de texto secundario (`--entity-faint`, `--subtle`) sobre fondo oscuro en los tamaños de letra más pequeños (`0.66rem`-`0.68rem` usados en etiquetas uppercase) para confirmar ratio AA (probable que ya cumpla, pero se verificará con herramienta de contraste antes de tocar nada).
3. Unificar, si apruebas el esfuerzo "Alto" de la matriz, los tres steppers de fase (`dossier-stepper`/`admin-phase-tracker`/`entity-phase-tracker`) en un solo componente con variante de tamaño.

### Checklist de validación pre-publicación
- [ ] `index.html`, `sofein-digital.html`, `consulting.html`, `sobre-nosotros.html` probados en 360px, 768px, 1280px y 1920px.
- [ ] Portal (`app.html`) probado en los 4 roles (admin/cliente/proveedor/destinatario) a 360px y 768px, incluyendo apertura de los 13 modales.
- [ ] Verificar que ningún texto del copy original ha cambiado (diff de contenido de texto, no de marcado).
- [ ] Verificar que todos los `data-go`, `data-switch-role`, `data-toast`, `data-download` siguen funcionando tras cualquier cambio de clase.
- [ ] Probar impresión del Pasaporte Digital tras corregir `@media print`.
- [ ] Lighthouse / axe-core rápido sobre `app.html` tras Fase 4 (contraste + nombres accesibles de botones icon-only).
- [ ] Confirmar en `git diff --stat` que los cambios son exclusivamente `styles.css` + líneas puntuales de `app.js`/`*.html`, sin alteraciones de copy.

---

## Puntos que necesito que apruebes antes de tocar código

1. ¿Autorizo a **borrar** el bloque HTML muerto de `index.html` y el CSS muerto de Gen 1 (~750 líneas), o prefieres que lo archive en otro sitio por si se reutiliza?
2. ¿El chat widget debe estar en todas las páginas públicas o solo en home?
3. ¿Unifico el verde de marca entre landing y portal, o los matices actuales son intencionados (marketing más vivo, producto más "SaaS")?
4. ¿Apruebas tocar 13 puntos de `app.js` (apertura de modal) para añadir accesibilidad, o prefieres que lo haga primero solo con CSS (menos robusto pero cero riesgo en JS) y dejamos la parte de `app.js` para una segunda pasada?
5. ¿Quieres que la unificación de los tres steppers de fase entre en este primer ciclo de pulido, o la dejamos fuera por ser el único cambio de esfuerzo "Alto"?

Con tu visto bueno sobre estos 5 puntos y las fases, paso a implementar en commits pequeños y separados por fase, en rama `claude/unificacion-diseno` (o la que indiques), sin tocar ningún texto visible.
