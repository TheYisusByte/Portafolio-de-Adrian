# Portafolio Adrian

> Portafolio web interactivo e inmersivo de ADRIAN, inspirado en un escritorio de detective y un tablón de corcho, que presenta de forma memorable los proyectos y la experiencia profesional.

![Estado](https://img.shields.io/badge/estado-activo-2ea44f?style=flat)
![Stack](https://img.shields.io/badge/stack-React%20%2B%20Vite%20%2B%20TypeScript-61dafb?style=flat)
![Licencia](https://img.shields.io/badge/licencia-propietaria-555555?style=flat)

## Descripción

Portafolio personal en formato de aplicación web (SPA) que rompe con los esquemas tradicionales de CV web. Recrea un escritorio físico analógico —con tablón de corcho, polaroids, post-its y notas manuscritas— para exponer los proyectos destacados (Miel Orgánica, CRM Inmobiliaria, Gastovoz, RuntimeHQ), la experiencia profesional y las habilidades técnicas de ADRIAN. Orientado a reclutadores, clientes y profesionales de tecnología que evalúan capacidades de desarrollo, arquitectura y diseño.

## Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| Frontend | React 19 + TypeScript |
| Build | Vite 6 |
| Estilos | Tailwind CSS 4 + CSS Vanilla |
| Iconos | lucide-react |

## Guía de Inicio Rápido

```bash
git clone https://github.com/TheYisusByte/Portafolio-de-Adrian.git
cd portafolio_v2
npm install
npm run dev
```

Pasos:

1. **Clonar**: descarga el repositorio desde GitHub.
2. **Instalar dependencias**: `npm install` instala el árbol de dependencias.
3. **Servidor de desarrollo**: `npm run dev` levanta Vite en modo local con recarga en caliente.

Comandos adicionales:

- `npm run build` — compila la aplicación para producción.
- `npm run preview` — vista previa de la compilación de producción.
- `npm run typecheck` — validación de tipos con TypeScript (`tsc --noEmit`).

## Arquitectura / Estructura

Aplicación SPA modular con separación entre componentes de presentación y datos. `src/components/` aloja componentes modales y reutilizables (polaroids, post-its, expedientes, mapa de contacto, hilo de investigación), y `src/data/portfolioData.ts` concentra los datos estructurados de proyectos y perfil.

```
src/
  components/   → Componentes de UI y modales
  data/         → Datos estructurados (portfolioData.ts)
  types/        → Tipos compartidos
```

## Notas Técnicas / Límites

- Interfaz orientada a navegadores web modernos (desktop y móvil), con soporte para interacciones táctiles y de cursor.
- Estética analógica enriquecida: tipografías manuscritas y de máquina de escribir sobre madera, corcho y papel.
- No requiere variables de entorno para su ejecución local.

## Licencia y Propietario

© 2026 Jesus Adrian Anaya Sarria — PinkyOS. Todos los derechos reservados. Proyecto personal privado.