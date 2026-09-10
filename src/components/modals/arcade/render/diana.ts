import { E } from '../constantes';
import type { Motor } from '../types';
import * as PIXI from 'pixi.js';

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

export function pintarDiana(g: PIXI.Graphics, motor: Motor) {
  g.clear();

  // Poste de madera
  g.rect(-8, 24, 16, 34).fill({ color: 0x1a1008 });
  g.rect(-5, 24, 5, 34).fill({ color: 0x2c1b0e });
  g.rect(-8, 24, 16, 3).fill({ color: 0x2c1b0e });

  // Tablero trasero
  g.rect(-38, -38, 76, 76).fill({ color: 0x2c1b0e });
  g.rect(-36, -36, 72, 72).fill({ color: 0x3d2712 });
  g.rect(-38, 28, 76, 6).fill({ color: 0x201208 });

  // Anillos de puntuación
  g.rect(-34, -34, 68, 68).fill({ color: 0xd6d3d1 });
  g.rect(-24, -24, 48, 48).fill({ color: 0x0b1020 });
  g.rect(-14, -14, 28, 28).fill({ color: 0x1d4ed8 });
  g.rect(-10, -10, 20, 20).fill({ color: 0x3b82f6 });

  // Cruz decorativa azul
  g.rect(-14, -14, 6, 28).fill({ color: 0x0b6be0 });
  g.rect(-14, 8, 28, 6).fill({ color: 0x0b6be0 });
  g.rect(8, -14, 6, 28).fill({ color: 0x0b6be0 });
  g.rect(-14, -14, 28, 6).fill({ color: 0x0b6be0 });

  // Bullseye
  g.rect(-6, -6, 12, 12).fill({ color: 0xfde047 });
  g.rect(-2, -2, 4, 4).fill({ color: 0xf59e0b });

  // Flechas clavadas previas
  for (const impacto of motor.impactos) {
    g.rect(impacto.xLocal - 1, impacto.yLocal - 1, 3, 3).fill({ color: 0x141414 });
    g.rect(impacto.xLocal + 2, impacto.yLocal - 1, 5, 2).fill({ color: 0xe4e4e7 });
    g.rect(impacto.xLocal + 2, impacto.yLocal + 1, 5, 2).fill({ color: 0x0ea5e9 });
  }

  // Destello de impacto
  if (Math.abs(motor.velocidadDiana) > 0.2) {
    const alpha = Math.min(1, Math.abs(motor.velocidadDiana) * 0.9);
    g.rect(-36, -36, 72, 72).fill({ color: 0xfff0b4, alpha });
  }
}
