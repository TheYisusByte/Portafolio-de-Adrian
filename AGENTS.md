# AGENTS.md — Portafolio v2

Guía canónica del proyecto **portafolio v2**. La lee **opencode** automáticamente.

## Identidad del Proyecto

- **Nombre**: portafolio v2
- **Tipo**: Aplicación Web / Portafolio personal
- **Stack**: React + Vite + TypeScript + Tailwind CSS / CSS Vanilla
- **Propietario**: Jesus Adrian Anaya Sarria

## Git Workflow

**Base branch**: `main`
**Commits**: español, formato Conventional Commits (`feat:`, `fix:`, `refactor:`, `chore:`)

## Estructura del Código

- Componentes modulares y reutilizables.
- Separación de lógica y presentación.
- Clean Code y principios SOLID.

## Comandos de Desarrollo

- `npm run dev`: Inicia el servidor de desarrollo local con Vite.
- `npm run build`: Compila la aplicación para producción.
- `npm run preview`: Vista previa de la compilación de producción.
- `npm run typecheck`: Validación de tipos con TypeScript.

## Seguridad

- Nunca hardcodear secretos, tokens o credenciales.
- Validar y sanitizar entradas de usuario.
- Usar variables de entorno (`.env`, `.gitignore`).
