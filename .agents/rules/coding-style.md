# Convenciones de Código Frontend - SOFEIN

## Estándares de Implementación
1. **HTML5 Semántico:** Usar `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>` en lugar de `<div>` anidados sin sentido semántico.
2. **Modularidad en JavaScript (`app.js`):**
   - Agrupar la lógica por módulos o controladores de vista.
   - Usar `addEventListener` evitando eventos inline en HTML (`onclick="..."`).
   - Gestión segura del DOM con comprobación de elementos existentes antes de manipularlos (`if (el) { ... }`).
3. **Tailwind CSS:**
   - Mantener las clases ordenadas: layout -> spacing -> typography -> colors -> effects/transitions.
   - Evitar estilos inline en etiquetas `style="..."`.
4. **Accesibilidad y SEO:**
   - Todos los inputs de formulario deben contar con su respectivo `<label>` o `aria-label`.
   - Incluir textos descriptivos `alt` en imágenes.
