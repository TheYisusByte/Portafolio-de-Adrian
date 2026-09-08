import type { Motor } from '../types';

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

export function pintarFlecha(ctx: CanvasRenderingContext2D, motor: Motor) {
  if (!motor.volando) return;

  // Estela pixelada que se desvanece
  for (let i = 0; i < motor.estela.length; i++) {
    const punto = motor.estela[i];
    const opacidad = (i / motor.estela.length) * 0.35;
    ctx.fillStyle = `rgba(250, 204, 21, ${opacidad.toFixed(2)})`;
    ctx.fillRect(Math.floor(punto.x) - 1, Math.floor(punto.y) - 1, 3, 3);
  }

  const posicion = calcularPosicionFlecha(motor);
  ctx.save();
  ctx.translate(posicion.x, posicion.y);
  ctx.rotate(posicion.angulo);

  // Eje de madera
  ctx.fillStyle = '#4a3210';
  ctx.fillRect(-10, -1, 16, 2);
  ctx.fillStyle = '#2f1f0b';
  ctx.fillRect(-10, 0, 16, 1);

  // Punta de metal
  ctx.fillStyle = '#e4e4e7';
  ctx.fillRect(4, -2, 3, 2);
  ctx.fillStyle = '#cbd5e1';
  ctx.fillRect(4, 0, 3, 2);
  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(7, -1, 3, 1);

  // Plumas
  ctx.fillStyle = '#0ea5e9';
  ctx.fillRect(-11, -2, 4, 2);
  ctx.fillStyle = '#e4e4e7';
  ctx.fillRect(-11, 0, 4, 2);

  ctx.restore();
}