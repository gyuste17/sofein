# AGENTS.md — SOFEIN

Fuente única de reglas del proyecto para todos los agentes (Claude Code y Google Antigravity/Gemini).
`CLAUDE.md` y `GEMINI.md` solo apuntan aquí: cualquier regla nueva se añade en este archivo.
Las directrices globales del ecosistema están en `../CLAUDE.md` (GY Antigravity) y siguen vigentes.

## Qué es

Portal y app de consultoría digital B2B de **SOFEIN**. La parte activa es **SOFEIN Procurement**:
plataforma de expedientes de suministro ferroviario (constructor de expedientes, matching de proveedores,
pedidos, fabricación y calidad, incidencias/mediación, avisos, pasaporte digital) con 4 perfiles:
`admin` (SOFEIN), `cliente`, `proveedor` y `destinatario`.

Diseño funcional: `docs/DISENO_SOFEIN_PROCUREMENT.md`. Estado y relevo: `HANDOFF.md`.
Paso a base de datos (Supabase): `docs/BACKEND_SPEC.md` — modelo, estados, permisos (RLS), acciones de servidor y avisos. Mantenerlo al día cuando cambie la lógica.

## Stack

- HTML5 + CSS + JavaScript plano, **sin build** ni dependencias npm.
- `app.html` es la SPA (router por hash). Toda la lógica está en `app.js` (~650 KB, monolítico) y los estilos en `styles.css`.
- Datos de ejemplo en `app.js` (`INITIAL_SUMINISTROS`, `DIRECTORIO_PROVEEDORES`, `CATALOGOS`…); persistencia solo en `localStorage`. No hay backend todavía.
- `admin.html`, `cliente.html`, `proveedores.html`, `expediente.html`, etc. son stubs que redirigen a rutas de `app.html`.
- `index.html`, `consulting.html`, `sobre-nosotros.html`, `sofein-digital.html`: web corporativa.
- `construccion.html` + `sofeindigital-standalone/`: landing «en construcción» de sofeindigital.es (ver `docs/INSTRUCCIONES_IONOS_DOMINIO.md`).

## Ramas y despliegue

| Rama | Contenido | Despliegue |
| :--- | :--- | :--- |
| `main` | Web corporativa | Vercel `sofein` → https://sofein.vercel.app (auto al hacer push) |
| `procurement` | Plataforma Procurement (rama de trabajo actual) | Vercel `sofein-procurement` → https://sofein-procurement.vercel.app (`npx.cmd vercel --prod --yes`) |
| `claude/<tarea>` | Trabajo de Claude | se integra en `procurement` |
| `gemini/<tarea>` | Trabajo de Antigravity | se integra en `procurement` |

- Repo: https://github.com/gyuste17/sofein · Vercel `sofein`: Project ID `prj_gGsEVjlIdAYYg8pDKTUcuJZI2XEC`.
- Mantener `procurement` aislada de `main` salvo que Guillermo pida integrarlas.
- `procurement`: cuando una tarea esté terminada y probada (ver «Cómo probar»), integrarla, hacer push y desplegar en `sofein-procurement` sin preguntar; avisar después con la URL y la versión. (Acordado con Guillermo el 2026-10-29.)
- `main` (web corporativa, se despliega sola al hacer push): no hacer push sin que Guillermo lo pida.

## Cómo probar

1. `node --check app.js` (sin errores de sintaxis).
2. Abrir `app.html` en el navegador (funciona con doble clic) y recorrer las rutas afectadas en los 4 perfiles:
   0 errores en consola, ningún `undefined`/`NaN`/`[object Object]` en pantalla, sin desbordamiento horizontal a 360–390 px.
3. Al cambiar `app.js` o `styles.css`, subir el cachebuster `?v=procurement-vNN` en `app.html` (mirar el valor actual en `app.html` y en `git log procurement` antes de subirlo).
4. Skill `/health-check` (`.agents/skills/health-check/SKILL.md`) para enlaces, scripts y assets.

## Convenciones

- Reglas detalladas: `.agents/rules/b2b-ux-design.md` (diseño B2B, 60-30-10), `.agents/rules/coding-style.md` (HTML semántico, JS modular), `.agents/rules/deployment.md`.
- Comprobar que un elemento existe antes de manipularlo; `addEventListener` en vez de `onclick` inline.
- Commits pequeños, en español o inglés, estilo `feat(ámbito): …` / `fix(ámbito): …` / `style(ámbito): …`, indicando la versión de assets si cambia (`(v37)`).

## Coordinación Claude + Antigravity

- **Una rama y una carpeta por agente.** Antigravity trabaja en la carpeta principal (`SOFEIN/`).
  Claude trabaja en su worktree `SOFEIN/.claude/worktrees/claude` (ignorado por git) con ramas `claude/<tarea>`.
- **`app.js` es un único archivo enorme: nunca lo editan los dos agentes a la vez.** Antes de tocarlo, mirar
  `git status` en la carpeta principal y la cabecera de `HANDOFF.md`; si el otro agente tiene cambios sin commitear en él, esperar o trabajar en otros archivos.
- **No usar `git add -A`** (aunque lo diga `deployment.md`): añadir solo los archivos propios de la tarea, para no comitear el trabajo a medias del otro agente.
- Nunca hacer `git stash`, `reset`, `checkout --` ni `clean` sobre cambios que no sean propios.
- Integrar en `procurement` con merge cuando la tarea esté terminada y probada; avisar en `HANDOFF.md`.
- **Al terminar una tarea**, añadir una entrada al principio de `HANDOFF.md`: fecha, agente, rama, qué se hizo, qué queda pendiente y decisiones.

## Seguridad

- No leer ni comitear `.env*`, `.vercel/` ni `.claude/settings.local.json` (todos en `.gitignore`).
- Ninguna clave privada en archivos del navegador (`app.js`, HTML). Cualquier integración con IA o servicios de pago irá por un backend (Supabase Edge Function / API route).
- Pasar `gitleaks` antes de hacer push a un remoto nuevo.
- Si se crean tablas en Supabase, incluir los `grant` de PostgREST indicados en `../CLAUDE.md`.

## Herramientas compartidas (Antigravity-Master)

Notificación de estado de tareas largas:
```bash
python "../Antigravity-Master/scripts/send_alert.py" --project "SOFEIN" --status "SUCCESS" --summary "<Resumen>"
```

Imágenes (obligatorio usar el script central; pedir permiso a Guillermo con el coste estimado antes de generar):
```bash
python "C:\Users\gyust\GY Antigravity\Antigravity-Master\scripts\generate_dalle_image.py" --prompt "<descripción>" --output "<ruta.png>" --tier draft|standard|premium
```

| Tier | Coste | Uso |
|:-----|:------|:----|
| `draft` | ~$0.006 | Pruebas, borradores |
| `standard` | ~$0.013 | Assets web (por defecto) |
| `premium` | ~$0.05 | Producción final |

- No llamar a la API de OpenAI directamente. Modelos actuales: `gpt-image-2.5-flare` y `gpt-image-2.5-sunburst` (no usar `dall-e-2`/`dall-e-3`). `--dry-run` para ver el coste sin gastar.

## Facturación (#SOF)

- Hoja maestra: [Freelance - Cuentas (Ingresos)](https://docs.google.com/spreadsheets/d/16IIl9BUP0rINQiDvmFX_qlpilf_Mq2YsAsKGE8qfOnA/edit?gid=720435967)
- Gestor: `C:\Users\gyust\GY Antigravity\Antigravity-Master\scripts\billing_client.py`
- Originante `SOFEIN` · prefijo `#SOF` · Consultoría · IRPF 15 % · IVA 21 % · cobro en BBVA.
- Solo bajo petición expresa de Guillermo; todo cambio registrado y revertible.
