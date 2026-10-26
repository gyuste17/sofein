# SOFEIN Digital - Página en Construcción (Standalone)

Paquete autónomo y ligero para desplegar directamente en el dominio **sofeindigital.es**.

## 📁 Contenido del Paquete

```
sofeindigital-standalone/
├── index.html           # Página web completa (HTML5 + CSS embebido + JS)
├── README.md            # Instrucciones de despliegue y personalización
└── assets/
    ├── digital-hero.png # Imagen de fondo con temática ferroviaria moderna
    ├── favicon.svg      # Favicon corporativo
    └── sofein-logo.svg  # Logotipo vectorial oficial
```

---

## 🚀 Opciones de Despliegue para `sofeindigital.es`

### Opción 1: Vercel (Recomendado, 1 minuto)
1. Arrastra o sube la carpeta `sofeindigital-standalone` a un nuevo proyecto en [Vercel](https://vercel.com).
2. En la configuración del proyecto en Vercel, ve a **Settings > Domains**.
3. Añade el dominio `sofeindigital.es` y configura los registros DNS (CNAME o A record) indicados por Vercel en tu registrador de dominios.

### Opción 2: Netlify o Cloudflare Pages
- Simplemente haz "Drop folder" de `sofeindigital-standalone` en el panel de Netlify/Cloudflare y vincula el dominio `sofeindigital.es`.

### Opción 3: Hosting Tradicional (cPanel / Apache / Nginx / FTP)
- Sube el archivo `index.html` y la carpeta `assets/` a la raíz pública (`public_html` o `www`) del hosting configurado para `sofeindigital.es`.

---

## 🎨 Cómo Cambiar el Logo cuando Flor lo entregue

En `index.html`, localiza el bloque del logotipo (líneas ~288):
```html
<a href="#" class="brand-group" aria-label="SOFEIN Digital">
  <!-- Reemplazar el SVG actual por el nuevo logo o por una etiqueta <img> si es imagen: -->
  <img src="assets/nuevo-logo.svg" alt="SOFEIN Digital" style="height: 32px; width: auto;" />
  <span class="brand-tag">Digital</span>
</a>
```
Basta con colocar el nuevo archivo de logo en la carpeta `assets/` y cambiar la ruta.
