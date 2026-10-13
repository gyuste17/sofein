---
name: health-check
description: Verifica la integridad de las paginas HTML, rutas de scripts y assets estaticos en SOFEIN.
---

# SOFEIN Health Check

Usa esta habilidad para comprobar la salud técnica y visual de las páginas de SOFEIN.

## Verificaciones

1. **Archivos Principales:**
   Verificar que existan `admin.html`, `cliente.html`, `app.html`, `consulting.html` y `app.js`.

2. **Validación de Sintaxis JS:**
   Ejecutar validación de JavaScript en Node.js:
   ```bash
   node -c app.js
   ```

3. **Comprobación Visual:**
   Usar `chrome-devtools-mcp` o servidor estático local (`npx serve .` o live server) para inspeccionar la consola y comprobar que no haya errores 404 de recursos.
