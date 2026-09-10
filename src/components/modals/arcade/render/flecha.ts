import type { Motor } from '../types';
import * as PIXI from 'pixi.js';

const ALTURA_PARABOLA = 42;
const LARGO_ESTELA = 5;

export function calcularPosicionFlecha(motor: Motor) {
  const t = motor.progreso;
  const x = motor.origenX + (motor.destinoX - motor.origenX) * t;
  const baseY = motor.origenY + (motor.destinoY - motor.origenY) * t;
  const y = baseY - Math.sin(t * Math.PI) * ALTURA_PARABOLA;

  const siguiente = Math.min(1, t + 0.01);
  const xSig = motor.origenX + (motor.destinoX - motor.origenX) * siguiente;
  const baseYSig = motor.origenY + (motor.destinoY - motor.origenY) * siguiente;
  const ySig = baseYSig - Math.sin(siguiente * Math.PI) * ALTURA_PARABOLA;

  return {
    x,
    y,
    angulo: Math.atan2(ySig - y, xSig - x),
  };
}

export function registrarEstela(motor: Motor) {
  if (!motor.volando) return;
  const punto = calcularPosicionFlecha(motor);
  motor.estela.push({ x: punto.x, y: punto.y });
  if (motor.estela.length > LARGO_ESTELA) motor.estela.shift();
}

export function pintarFlecha(g: PIXI.Graphics, motor: Motor) {
  g.clear();
  if (!motor.volando) {
    g.x = 0;
    g.y = 0;
    g.rotation = 0;
    return;
  }

  // Estela pixelada
  for (let i = 0; i < motor.estela.length; i++) {
    const punto = motor.estela[i];
    const opacidad = (i / motor.estela.length) * 0.35;
    g.rect(Math.floor(punto.x) - 1, Math.floor(punto.y) - 1, 3, 3).fill({ color: 0xfacc15, alpha: opacidad });
  }

  const posicion = calcularPosicionFlecha(motor);
  g.x = posicion.x;
  g.y = posicion.y;
  g.rotation = posicion.angulo;

  g.rect(-10, -1, 16, 2).fill({ color: 0x4a3210 });
  g.rect(-10, 0, 16, 1).fill({ color: 0x2f1f0b });

  g.rect(4, -2, 3, 2).fill({ color: 0xe4e4e7 });
  g.rect(4, 0, 3, 2).fill({ color: 0xcbd5e1 });
  g.rect(7, -1, 3, 1).fill({ color: 0x94a3b8 });

  g.rect(-11, -2, 4, 2).fill({ color: 0x0ea5e9 });
  g.rect(-11, 0, 4, 2).fill({ color: 0xe4e4e7 });
}
