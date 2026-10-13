# SOFEIN - Portal y Aplicación de Consultoría Digital B2B

Plataforma corporativa de consultoría, gestión de proyectos y portal interactivo para clientes y administración de **SOFEIN**.

## Stack Tecnológico y Entorno

- **Frontend:** HTML5 semántico, Tailwind CSS (vía CDN/clases utilitarias), Vanilla JavaScript moderno (`app.js`).
- **Páginas Principales:**
  - `admin.html`: Panel de control y gestión administrativa.
  - `cliente.html`: Área privada y seguimiento para clientes.
  - `app.html` & `consulting.html`: Servicios y herramientas de consultoría.
- **Hosting y Despliegue:** Vercel (`sofein`, Project ID `prj_gGsEVjlIdAYYg8pDKTUcuJZI2XEC`).
- **URL Producción:** [sofein.vercel.app](https://sofein.vercel.app)
- **Repositorio Git:** [https://github.com/gyuste17/sofein.git](https://github.com/gyuste17/sofein.git) (Rama: `main`)

---

## Arquitectura de Agentes y Reglas

- **[.agents/rules/b2b-ux-design.md](file:///.agents/rules/b2b-ux-design.md):** Principios de diseño B2B minimalista, jerarquía visual, espaciado generoso y regla de color 60-30-10.
- **[.agents/rules/coding-style.md](file:///.agents/rules/coding-style.md):** Buenas prácticas en HTML5, modularidad en JavaScript y Tailwind CSS.
- **[.agents/rules/deployment.md](file:///.agents/rules/deployment.md):** Procedimiento de verificación y publicación continua en Vercel.
- **[.agents/skills/health-check/SKILL.md](file:///.agents/skills/health-check/SKILL.md):** Habilidad para verificar la integridad de enlaces, scripts y assets del portal (`/health-check`).

---

## Notificaciones de Estado

Para tareas de fondo o auditorías en SOFEIN:
```bash
python "../Antigravity-Master/scripts/send_alert.py" --project "SOFEIN" --status "SUCCESS" --summary "<Resumen>"
```

---

## 🎨 Generación de Imágenes (OpenAI)

**OBLIGATORIO:** Para generar cualquier imagen (logos, banners, assets, mockups), usar SIEMPRE el script centralizado de Antigravity-Master:

```bash
python "C:\Users\gyust\GY Antigravity\Antigravity-Master\scripts\generate_dalle_image.py" --prompt "<descripción>" --output "<ruta/local/destino.png>" --tier draft|standard|premium
```

| Tier | Coste | Uso |
|:-----|:------|:----|
| `draft` | ~$0.006 | Pruebas, borradores, iteraciones |
| `standard` | ~$0.013 | Assets para webs (DEFAULT) |
| `premium` | ~$0.05 | Producción final |

- **NO intentar llamar a la API de OpenAI directamente desde scripts propios.**
- **NO usar modelos obsoletos como `dall-e-3` o `dall-e-2`** (ya no existen). Los modelos actuales son `gpt-image-2.5-flare` y `gpt-image-2.5-sunburst` (Suite GPT-Image-2.5).
- La clave API se gestiona de forma segura desde `Antigravity-Master/config/openai.json`.
- Para previsualizar coste sin gastar: añadir `--dry-run`.

---

## 💰 Facturación y Cuentas Freelance (#SOF)

Este proyecto está vinculado a la hoja maestra oficial de contabilidad freelance:
- **Hoja Maestra:** [Freelance - Cuentas (Ingresos)](https://docs.google.com/spreadsheets/d/16IIl9BUP0rINQiDvmFX_qlpilf_Mq2YsAsKGE8qfOnA/edit?gid=720435967)
- **Gestor Seguro:** `C:\Users\gyust\GY Antigravity\Antigravity-Master\scripts\billing_client.py`
- **Configuración Fiscal de SOFEIN:**
  - **Originante:** `SOFEIN`
  - **Prefijo Factura:** `#SOF`
  - **Tipo de Servicio:** `Consultoría`
  - **Retención IRPF:** `Si` (15%)
  - **IVA:** `Si` (21%)
  - **Cuenta de Cobro:** `BBVA`
- **Regla de Oro:** Todo cambio se ejecuta de forma precisa, registrada en auditoría y 100% revertible (con snapshot previo automático).


