import { Proyecto, EnlaceSocial, PerfilPersonal } from '../types';

export const perfilPersonal: PerfilPersonal = {
  nombre: 'ADRIAN',
  rol: 'Arquitecto de Software & Desarrollador Full Stack',
  ubicacion: 'Remoto / Global',
  correo: 'adrian@runtimehq.co',
  resumen: 'Especialista en desarrollo de software de alta calidad, automatización con IA y arquitectura web robusta. Creador de sistemas empresariales como CRM Inmobiliaria, Miel Orgánica, Gastovoz y RuntimeHQ.',
  biografiaCompleta: [
    '¡Hola! Soy ADRIAN (YisusByte), un apasionado del desarrollo de software, la arquitectura limpia y la automatización inteligente. A lo largo de mi trayectoria he diseñado y construido sistemas escalables tanto para el sector empresarial como proyectos propios de alto impacto.',
    'Mi stack principal abarca React, TypeScript, Tailwind CSS, Node.js, Flutter y bases de datos relacionales con Supabase/PostgreSQL. Me especializo en llevar ideas complejas a productos limpios, funcionales y visualmente memorables.',
    'Cuando no estoy diseñando arquitecturas de software o automatizando flujos con inteligencia artificial, investigo sobre nuevas formas de optimizar la experiencia de usuario y el rendimiento móvil.'
  ],
  habilidades: [
    'TypeScript / JavaScript',
    'React / Vite / Next.js',
    'Tailwind CSS / CSS Avanzado',
    'Node.js / Express / Prisma',
    'Flutter / Dart (Gastovoz)',
    'Supabase / PostgreSQL',
    'Automatización con IA',
    'Git / CI/CD / DevOps'
  ],
  experiencia: [
    {
      puesto: 'Desarrollador Full Stack & Arquitecto de Software',
      empresa: 'RuntimeHQ',
      periodo: '2026 - Presente',
      descripcion: 'Liderazgo en el diseño y desarrollo de plataformas empresariales (CRM Inmobiliaria, Miel Orgánica, Gastovoz, RuntimeHQ).'
    },
    {
      puesto: 'Gestor de Procesos',
      empresa:'Tivit Alma Viva',
      periodo: '2024 - 2026',
      descripcion: 'Gestión de incidentes (War Rooms/MTTR), auditoría de routers FEMSA y soporte L1 con administración de accesos.'
    }
  ]
};

export const proyectosData: Proyecto[] = [
  {
    id: 'miel-organica',
    titulo: 'Miel Orgánica',
    subtitulo: 'E-commerce & Landing Artesanal',
    descripcionCorta: 'Plataforma web enfocada en la comercialización de productos apícolas orgánicos con diseño natural y pasarela de pago.',
    descripcionLarga: 'Miel Orgánica es una experiencia web inmersiva que combina storytelling artesanal con comercio electrónico optimizado. Presenta catálogos dinámicos de miel pura, proceso de extracción sostenible y carrito de compras integrado.',
    estado: 'Completado',
    imagen: 'https://images.unsplash.com/photo-1471943311424-646960669fbc?auto=format&fit=crop&w=640&q=75',
    tecnologias: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    enlaceDemo: 'https://miel-organica-web.vercel.app/',
    destacado: true
  },
  {
    id: 'crm-inmobiliaria',
    titulo: 'CRM Inmobiliaria',
    subtitulo: 'Sistema de Gestión Inmobiliaria',
    descripcionCorta: 'Plataforma empresarial para gestión de inventario inmobiliario con vistas de mapa, filtros avanzados y Supabase.',
    descripcionLarga: 'CRM Inmobiliaria es una solución completa orientada al sector inmobiliario. Permite la administración eficiente de inmuebles, fichas públicas compartibles, exportación masiva a Excel y autenticación segura con PostgreSQL y Supabase RLS.',
    estado: 'Completado',
    imagen: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=640&q=75',
    tecnologias: ['React', 'TypeScript', 'Tailwind', 'Node.js', 'Supabase', 'PostgreSQL'],
    videoUrl: '/videos/crm-inmobiliaria.mp4',
    destacado: true
  },
  {
    id: 'gastovoz',
    titulo: 'Gastovoz',
    subtitulo: 'App Móvil de Voz a Texto',
    descripcionCorta: 'Aplicación móvil desarrollada en Flutter con reconocimiento de voz local (Vosk) para registro rápido de gastos.',
    descripcionLarga: 'Gastovoz es una app móvil innovadora que permite registrar gastos cotidianos mediante comandos de voz en tiempo real utilizando reconocimiento de voz offline (Vosk flutter service), garantizando privacidad y velocidad sin depender de conexión constante.',
    estado: 'Completado',
    imagen: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=640&q=75',
    tecnologias: ['Flutter', 'Dart', 'Vosk Speech', 'Mobile UI'],
    videoUrl: '/videos/gastovoz.mp4',
    destacado: true
  },
  {
    id: 'runtimehq',
    titulo: 'RuntimeHQ',
    subtitulo: 'Landing Page de Alta Performance',
    descripcionCorta: 'SPA interactiva de alto rendimiento con efectos avanzados basados en movimiento de mouse y scroll.',
    descripcionLarga: 'RuntimeHQ es una aplicación web de alto rendimiento orientada al desarrollo de software a medida. Destaca por su sección Hero dinámica, animaciones fluidas optimizadas con hooks personalizados y arquitectura SOLID en React y Next.js.',
    estado: 'Completado',
    imagen: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=640&q=75',
    tecnologias: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    enlaceDemo: 'https://runtimehq.vercel.app/',
    destacado: true
  }
];

export const enlacesSociales: EnlaceSocial[] = [
  {
    nombre: 'Instagram',
    url: 'https://www.instagram.com/the_yisusbyte',
    icono: 'instagram',
    usuario: '@the_yisusbyte'
  },
  {
    nombre: 'TikTok',
    url: 'https://www.tiktok.com/@the_yisusbyte',
    icono: 'tiktok',
    usuario: '@the_yisusbyte'
  },
  {
    nombre: 'GitHub',
    url: 'https://github.com/TheYisusByte',
    icono: 'github',
    usuario: '@TheYisusByte'
  }
];
