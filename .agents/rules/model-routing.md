# Enrutamiento de Modelos

- **Subagentes (`invoke_subagent`):**
  - `Model="flash_lite"`: lecturas rápidas, rutas, `git status`.
  - `Model="flash"`: `research`, `/health-check`, búsquedas en código.
  - `Model="inherit"` / `"pro"`: código complejo o arquitectura en `Worktree` aislado.
- **Selector IDE:** `Orchestrator (Neon)` por defecto en desarrollo multi-archivo (agrupar cambios en bloques, no interrumpir al ejecutor, `/compact` antes de cambiar a `Argon` o `Claude`). `Gemini 4 Argon` para bugs en 1-2 archivos/estrategia; `3.8 Flash` para tareas mecánicas.
- **Comparativa completa (6 modelos):** `../Antigravity-Master/docs/MODEL_ROUTING_GUIDE.md`.
