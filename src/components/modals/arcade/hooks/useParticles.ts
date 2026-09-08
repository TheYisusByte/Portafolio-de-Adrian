import { useCallback } from 'react';
import type { Motor, Particula } from '../types';

const MAX_PARTICULAS = 280;

export function useParticles(motorRef: React.MutableRefObject<Motor>) {
  const emitir = useCallback(
    (particula: Particula) => {
      const arreglo = motorRef.current.particulas;
      if (arreglo.length >= MAX_PARTICULAS) arreglo.splice(0, arreglo.length - MAX_PARTICULAS + 1);
      arreglo.push(particula);
    },
    [motorRef]
  );

  const emitirChispasDisparo = useCallback(
    (x: number, y: number) => {
      for (let i = 0; i < 10; i++) {
        emitir({
          x,
          y,
          vx: (Math.random() - 0.2) * 3.5,
          vy: (Math.random() - 0.5) * 3.5,
          color: Math.random() > 0.5 ? '#fbbf24' : '#f87171',
          tam: Math.random() > 0.5 ? 2 : 1,
          vida: 0,
          vidaMax: 16,
          tipo: 'chispa',
        } as Particula);
      }
    },
    [emitir]
  );

  const emitirAstillas = useCallback(
    (x: number, y: number, cantidad = 12, centroDorado = false) => {
      for (let i = 0; i < cantidad; i++) {
        emitir({
          x,
          y,
          vx: (Math.random() - 0.5) * 4.5,
          vy: (Math.random() - 0.5) * 4.5 - 1,
          color: centroDorado && Math.random() > 0.5 ? '#fde047' : Math.random() > 0.4 ? '#b45309' : '#f59e0b',
          tam: 2,
          vida: 0,
          vidaMax: 25,
          tipo: 'astilla',
        } as Particula);
      }
    },
    [emitir]
  );

  const emitirEstrellas = useCallback(
    (x: number, y: number) => {
      for (let i = 0; i < 16; i++) {
        emitir({
          x,
          y,
          vx: (Math.random() - 0.5) * 6,
          vy: (Math.random() - 0.5) * 6,
          color: '#facc15',
          tam: 2,
          vida: 0,
          vidaMax: 30,
          tipo: 'estrella',
        } as Particula);
      }
    },
    [emitir]
  );

  const emitirAscuas = useCallback(
    (x: number, y: number) => {
      emitir({
        x: x + (Math.random() - 0.5) * 10,
        y,
        vx: (Math.random() - 0.5) * 0.5,
        vy: -0.5 - Math.random() * 0.5,
        color: Math.random() > 0.5 ? '#fbbf24' : '#f97316',
        tam: 1,
        vida: 0,
        vidaMax: 40,
        tipo: 'ascua',
      } as Particula);
    },
    [emitir]
  );

  return { emitir, emitirChispasDisparo, emitirAstillas, emitirEstrellas, emitirAscuas };
}