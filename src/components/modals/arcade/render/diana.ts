import { E } from '../constantes';
import type { Motor } from '../types';

export function actualizarFisicaDiana(motor: Motor) {
  if (Math.abs(motor.anguloDiana) > 0.001 || Math.abs(motor.velocidadDiana) > 0.001) {
    const constante = 0.18;
    const amortiguacion = 0.82;
    const fuerza = -constante * motor.anguloDiana;
    motor.velocidadDiana = (motor.velocidadDiana + fuerza) * amortiguacion;
    motor.anguloDiana += motor.velocidadDiana;
  } else {
    motor.anguloDiana = 0;
  }
}

export function pintarDiana(ctx: CanvasRenderingContext2D, motor: Motor) {
  ctx.save();
  ctx.translate(E.dianaX, E.dianaY);
  ctx.rotate(motor.anguloDiana);

  // Poste de madera al pie de la diana
  ctx.fillStyle = '#1a1008';
  ctx.fillRect(-8, 24, 16, 34);
  ctx.fillStyle = '#2c1b0e';
  ctx.fillRect(-5, 24, 5, 34);
  ctx.fillRect(-8, 24, 16, 3);

  // Tablero de madera trasero
  ctx.fillStyle = '#2c1b0e';
  ctx.fillRect(-38, -38, 76, 76);
  ctx.fillStyle = '#3d2712';
  ctx.fillRect(-36, -36, 72, 72);
  ctx.fillStyle = '#201208';
  ctx.fillRect(-38, -38 + 66, 76, 6);

  // Anillos de puntuación (de afuera hacia adentro)
  ctx.fillStyle = '#d6d3d1'; // Exterior (10 pts)
  ctx.fillRect(-34, -34, 68, 68);
  ctx.fillStyle = '#0b1020';  // Medio (25 pts)
  ctx.fillRect(-24, -24, 48, 48);
  ctx.fillStyle = '#1d4ed8';  // Interior (50 pts)
  ctx.fillRect(-14, -14, 28, 28);
  ctx.fillStyle = '#3b82f6';
  ctx.fillRect(-10, -10, 20, 20);
  ctx.fillStyle = '#0b6be0';
  ctx.fillRect(-14, -14, 6, 28);
  ctx.fillRect(-14, 8, 28, 6);
  ctx.fillRect(8, -14, 6, 28);
  ctx.fillRect(-14, -14, 28, 6);
  ctx.fillStyle = '#fde047'; // Bullseye (100 pts)
  ctx.fillRect(-6, -6, 12, 12);
  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(-2, -2, 4, 4);

  // Flechas clavadas en impactos previos
  for (const impacto of motor.impactos) {
    ctx.fillStyle = '#141414';
    ctx.fillRect(impacto.xLocal - 1, impacto.yLocal - 1, 3, 3);
    ctx.fillStyle = '#e4e4e7';
    ctx.fillRect(impacto.xLocal + 2, impacto.yLocal - 1, 5, 2);
    ctx.fillStyle = '#0ea5e9';
    ctx.fillRect(impacto.xLocal + 2, impacto.yLocal + 1, 5, 2);
  }

  // Destello de impacto: la vibración revela luz interna
  if (Math.abs(motor.velocidadDiana) > 0.2) {
    ctx.fillStyle = `rgba(255, 240, 180, ${(Math.abs(motor.velocidadDiana) * 0.9).toFixed(2)})`;
    ctx.fillRect(-36, -36, 72, 72);
  }

  ctx.restore();
}