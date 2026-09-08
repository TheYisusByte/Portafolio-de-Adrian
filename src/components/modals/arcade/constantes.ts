import type { ZonaImpacto } from './types';

// Resolución nativa retro 16:9 (estilo arcade de sobremesa)
export const NW = 320;
export const NH = 180;

// Geometría del escenario
export const E = {
  dianaX: 254,
  dianaY: 74,
  arqueroX: 52,
  arqueroY: 138,
  origenX: 62,
  origenY: 104,
};

export const POTENCIA_OPTIMA = 92.5;
export const RADIO_MAX_DIANA = 34;
export const FLECHAS_POR_RONDA = 8;
export const VELOCIDAD_CARGA = 2.8;

export const CRT_ENABLED = true;

// Radios (en px, desde el centro de la diana) que definen cada zona
export const RADIO_ZONA = {
  perfeccion: 6,
  interior: 14,
  medio: 24,
  exterior: RADIO_MAX_DIANA,
} as const;

export const TABLA_PUNTOS: Record<Exclude<ZonaImpacto, 'fallo'>, number> = {
  exterior: 10,
  medio: 25,
  interior: 50,
  perfeccion: 100,
};

export const ETIQUETA_ZONA: Record<ZonaImpacto, string> = {
  perfeccion: 'BULLSEYE!',
  interior: 'PERFECT!',
  medio: 'GREAT!',
  exterior: 'HIT!',
  fallo: 'MISS!',
};

export const COLOR_ZONA: Record<ZonaImpacto, string> = {
  perfeccion: '#fde047',
  interior: '#38bdf8',
  medio: '#4ade80',
  exterior: '#f5f5f4',
  fallo: '#f87171',
};

export const CLAVE_MEJOR_PUNTUACION = 'arcade.arqueria.best';
export const COMBO_MAXIMO = 99;

export function calcularZona(poder: number): ZonaImpacto {
  const delta = Math.abs(poder - POTENCIA_OPTIMA);
  const radio = (delta / 50) * RADIO_MAX_DIANA;
  if (radio <= RADIO_ZONA.perfeccion) return 'perfeccion';
  if (radio <= RADIO_ZONA.interior) return 'interior';
  if (radio <= RADIO_ZONA.medio) return 'medio';
  if (radio <= RADIO_ZONA.exterior) return 'exterior';
  return 'fallo';
}