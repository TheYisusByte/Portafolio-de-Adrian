export type ZonaImpacto = 'exterior' | 'medio' | 'interior' | 'perfeccion' | 'fallo';

export type EstadoJuego = 'listo' | 'apuntando' | 'cargando' | 'disparando' | 'impacto' | 'fallo' | 'fin';

export type AnimArquero = 'idle' | 'tensando' | 'disparo' | 'victoria' | 'fallo';

export type TipoParticula = 'astilla' | 'chispa' | 'estrella' | 'ascua';

export interface Particula {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  tam: number;
  vida: number;
  vidaMax: number;
  tipo: TipoParticula;
}

export interface TextoFlotante {
  texto: string;
  x: number;
  y: number;
  vy: number;
  alpha: number;
  color: string;
}

export interface ImpactoEnDiana {
  xLocal: number;
  yLocal: number;
  pts: number;
}

export interface PuntoEstela {
  x: number;
  y: number;
}

export interface Motor {
  fase: EstadoJuego;
  poder: number;
  dirPoder: 1 | -1;
  volando: boolean;
  progreso: number;
  origenX: number;
  origenY: number;
  destinoX: number;
  destinoY: number;
  zonaActual: ZonaImpacto;
  puntosUltimos: number;
  flash: number;
  sacudida: number;
  animArquero: AnimArquero;
  temporizadorAnim: number;
  anguloDiana: number;
  velocidadDiana: number;
  impactos: ImpactoEnDiana[];
  estela: PuntoEstela[];
  particulas: Particula[];
  textos: TextoFlotante[];
}

export interface MensajeJuego {
  id: number;
  texto: string;
  color: string;
  puntos?: number;
  sub?: string;
}

export interface ResultadoRegistro {
  puntos: number;
  combo: number;
}