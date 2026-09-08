import { useRef } from 'react';
import { E } from '../constantes';
import type { Motor } from '../types';

export function crearMotor(): Motor {
  return {
    fase: 'listo',
    poder: 0,
    dirPoder: 1,
    volando: false,
    progreso: 0,
    origenX: E.origenX,
    origenY: E.origenY,
    destinoX: E.dianaX,
    destinoY: E.dianaY,
    zonaActual: 'fallo',
    puntosUltimos: 0,
    flash: 0,
    sacudida: 0,
    animArquero: 'idle',
    temporizadorAnim: 0,
    anguloDiana: 0,
    velocidadDiana: 0,
    impactos: [],
    estela: [],
    particulas: [],
    textos: [],
  };
}

export function useGameState() {
  const motorRef = useRef<Motor>(crearMotor());

  const reiniciarMotor = () => {
    Object.assign(motorRef.current, crearMotor());
  };

  return { motorRef, reiniciarMotor };
}