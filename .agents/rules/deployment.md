# Flujo de Despliegue - SOFEIN

## Despliegue Continuo con Vercel

Este proyecto se despliega automáticamente en **Vercel** al enviar commits a la rama `main` de GitHub.

| Parámetro | Detalle |
| :--- | :--- |
| **Proveedor** | Vercel |
| **Proyecto** | `sofein` |
| **Repo** | `https://github.com/gyuste17/sofein` |
| **Rama de Producción** | `main` |

### Pasos Previos a la Publicación
1. Validar que los archivos HTML cargan correctamente y sin errores en la consola del navegador.
2. Confirmar que `app.js` no genera excepciones de sintaxis.
3. Ejecutar:
   ```bash
   git add -A
   git commit -m "feat/fix: descripcion del cambio"
   git push origin main
   ```
4. El nuevo despliegue estará disponible en producción en menos de 1 minuto.
