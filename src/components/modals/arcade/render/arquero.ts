import { E } from '../constantes';
import type { Motor } from '../types';
import * as PIXI from 'pixi.js';

const PI = Math.PI;
const CUERDA_INICIO = -PI * 0.46;
const CUERDA_FIN = PI * 0.46;

export function avanzarAnimArquero(motor: Motor) {
  if (motor.animArquero === 'disparo') {
    motor.temporizadorAnim--;
    if (motor.temporizadorAnim <= 0) {
      motor.animArquero = motor.zonaActual === 'fallo' ? 'fallo' : 'victoria';
      motor.temporizadorAnim = 50;
    }
    return;
  }
  if (motor.animArquero === 'victoria' || motor.animArquero === 'fallo') {
    motor.temporizadorAnim--;
    if (motor.temporizadorAnim <= 0) motor.animArquero = 'idle';
  }
}

export function pintarArquero(g: PIXI.Graphics, motor: Motor, frame: number) {
  g.clear();

  const { arqueroX: ax, arqueroY: ay, origenY } = E;
  const tensando = motor.fase === 'cargando';
  const tension = tensando ? (motor.poder / 100) * 16 : 0;
  const anim = motor.animArquero;

  const esVictoria = anim === 'victoria';
  const esFallo = anim === 'fallo';
  const esDisparo = anim === 'disparo';

  const torsoOffsetY = tensando ? 1 : esVictoria ? -4 : esDisparo ? 2 : 0;
  const headBob = Math.floor(Math.sin(frame * 0.11) * 1);

  // Sombra en el suelo
  g.rect(ax - 14, ay - 2, 30, 4).fill({ color: 0x000000, alpha: 0.6 });

  // Capa y carcaj
  g.rect(ax - 16, ay - 46 + (esDisparo ? 2 : 0), 7, 40).fill({ color: 0x123f23 });
  g.rect(ax - 13, ay - 32, 5, 26).fill({ color: 0x123f23 });

  // Carrusel de flechas
  g.rect(ax - 13, ay - 56, 8, 44).fill({ color: 0x3a2410 });
  g.rect(ax - 11, ay - 58, 4, 6).fill({ color: 0x241505 });
  g.rect(ax - 12, ay - 58, 2, 4).fill({ color: 0xa16207 });
  g.rect(ax - 5, ay - 57, 2, 2).fill({ color: 0x38bdf8 });

  // Piernas y botas
  g.rect(ax - 9, ay - 13, 9, 13).fill({ color: 0x141018 });
  g.rect(ax + 2, ay - 13, 9, 13).fill({ color: 0x141018 });
  g.rect(ax - 9, ay - 13, 9, 3).fill({ color: 0x241c28 });
  g.rect(ax + 2, ay - 13, 9, 3).fill({ color: 0x241c28 });

  // Torso
  g.rect(ax - 11, ay - 38 + torsoOffsetY, 24, 26).fill({ color: 0x166534 });
  g.rect(ax - 11, ay - 18 + torsoOffsetY, 24, 2).fill({ color: 0xc9a227 });
  g.rect(ax - 11, ay - 23 + torsoOffsetY, 24, 3).fill({ color: 0x241505 });
  g.rect(ax - 2, ay - 22 + torsoOffsetY, 4, 3).fill({ color: 0xfacc15 });

  // Cabeza con capucha
  const cabezaY = ay - 46 + torsoOffsetY + headBob;
  g.rect(ax - 10, cabezaY - 3, 20, 16).fill({ color: 0x14532d });
  g.rect(ax - 10, cabezaY - 3, 20, 2).fill({ color: 0x0e3d1f });
  g.rect(ax - 5, cabezaY + 3, 11, 9).fill({ color: 0xf2c79f });

  if (esVictoria) {
    g.rect(ax - 3, cabezaY + 6, 2, 2).fill({ color: 0x1a1a1a });
    g.rect(ax + 2, cabezaY + 6, 2, 2).fill({ color: 0x1a1a1a });
    g.rect(ax - 2, cabezaY + 10, 5, 1).fill({ color: 0x1a1a1a });
  } else if (esFallo) {
    g.rect(ax - 3, cabezaY + 6, 2, 2).fill({ color: 0x1a1a1a });
    g.rect(ax + 2, cabezaY + 6, 2, 2).fill({ color: 0x1a1a1a });
    g.rect(ax + 6, cabezaY + 4, 2, 3).fill({ color: 0x38bdf8 });
  } else {
    g.rect(ax + 0, cabezaY + 5, 2, 2).fill({ color: 0x1a1a1a });
  }

  // Luz de borde
  g.rect(ax - 12, ay - 38 + torsoOffsetY, 1, 26).fill({ color: 0xffc878, alpha: 0.3 });
  g.rect(ax - 11, cabezaY - 3, 1, 14).fill({ color: 0xffc878, alpha: 0.3 });

  // Brazo delantero
  const bowX = ax + 14 - tension * 0.5;
  const bowY = origenY;
  g.rect(ax + 3 - tension * 0.4, bowY - 3, bowX - ax, 6).fill({ color: 0xf2c79f });

  // ===== ARCO RECURVO ESTETICO MEJORADO =====
  const radio = 23 - tension * 0.35;
  const centroX = bowX + 6;

  g.beginPath();
  g.arc(centroX, bowY, radio + 1, CUERDA_INICIO, CUERDA_FIN);
  g.stroke({ width: 3, color: 0x78350f });

  g.beginPath();
  g.arc(centroX, bowY, radio, CUERDA_INICIO, CUERDA_FIN);
  g.stroke({ width: 2, color: 0xd97706 });

  g.beginPath();
  g.arc(centroX, bowY, radio - 1, CUERDA_INICIO + 0.1, CUERDA_FIN - 0.1);
  g.stroke({ width: 1, color: 0xfbbf24 });

  // Empuñadura de cuero (Grip) central
  g.rect(centroX - 3, bowY - 7, 6, 14).fill({ color: 0x78350f });
  g.rect(centroX - 2, bowY - 5, 4, 10).fill({ color: 0x92400e });
  g.rect(centroX - 1, bowY - 3, 2, 6).fill({ color: 0xb45309 });

  const startX = centroX + Math.cos(CUERDA_INICIO) * radio;
  const startY = bowY + Math.sin(CUERDA_INICIO) * radio;
  const endX = centroX + Math.cos(CUERDA_FIN) * radio;
  const endY = bowY + Math.sin(CUERDA_FIN) * radio;

  g.rect(startX - 2, startY - 2, 4, 4).fill({ color: 0xf59e0b });
  g.rect(endX - 2, endY - 2, 4, 4).fill({ color: 0xf59e0b });

  // Cuerda de cáñamo conectada exactamente a la culata de la flecha en (manoX, bowY)
  const manoX = centroX - tension;
  const esSweetSpot = motor.fase === 'cargando' && motor.poder >= 90;
  const colorCuerda = esSweetSpot ? 0xfde047 : 0xfef3c7;
  const grosorCuerda = esSweetSpot ? 2 : 1;

  g.beginPath();
  g.moveTo(startX, startY);
  g.lineTo(manoX, bowY);
  g.lineTo(endX, endY);
  g.stroke({ width: grosorCuerda, color: colorCuerda });

  if (esSweetSpot) {
    g.circle(manoX, bowY, 6).fill({ color: 0xfde047, alpha: 0.35 });
  }

  // Flecha nockeada perfectamente alineada con la cuerda en manoX
  if (!motor.volando) {
    g.rect(manoX, bowY - 2, 4, 4).fill({ color: 0x0ea5e9 });
    g.rect(manoX + 4, bowY - 2, 3, 4).fill({ color: 0xe4e4e7 });
    g.rect(manoX + 7, bowY - 1, 16, 2).fill({ color: 0x4a3210 });
    g.rect(manoX + 22, bowY - 2, 4, 4).fill({ color: 0xcbd5e1 });
  }

  // Flash de disparo
  if (motor.flash > 0) {
    const colorFlash = motor.flash % 2 === 0 ? 0xfde047 : 0xf59e0b;
    g.rect(bowX + 2, bowY - 10, 12, 20).fill({ color: colorFlash });
  }
}
