export interface Proyecto {
  id: string;
  titulo: string;
  subtitulo: string;
  descripcionCorta: string;
  descripcionLarga: string;
  estado: 'Completado' | 'En desarrollo';
  imagen: string;
  tecnologias: string[];
  enlaceDemo?: string;
  enlaceRepo?: string;
  videoUrl?: string;
  destacado: boolean;
}

export interface EnlaceSocial {
  nombre: string;
  url: string;
  icono: string;
  usuario: string;
}

export interface PerfilPersonal {
  nombre: string;
  rol: string;
  ubicacion: string;
  correo: string;
  resumen: string;
  biografiaCompleta: string[];
  habilidades: string[];
  experiencia: {
    puesto: string;
    empresa: string;
    periodo: string;
    descripcion: string;
  }[];
}

export type ModalActivo = 
  | { tipo: 'ninguno' }
  | { tipo: 'sobre-mi' }
  | { tipo: 'nota-sobre-mi' }
  | { tipo: 'proyecto'; idProyecto: string }
  | { tipo: 'contacto' }
  | { tipo: 'press-kit' }
  | { tipo: 'arqueria' };
