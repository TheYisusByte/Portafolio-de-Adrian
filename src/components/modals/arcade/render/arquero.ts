import { E } from '../constantes';
import type { Motor } from '../types';

const PI = Math.PI;
const CUERDA_INICIO = -PI * 0.45;
const CUERDA_FIN = PI * 0.45;

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

export function pintarArquero(ctx: CanvasRenderingContext2D, motor: Motor, frame: number) {
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
  ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
  ctx.fillRect(ax - 14, ay - 2, 30, 4);

  // ===== CAPA Y CARRUAJE (detrás del torso) =====
  ctx.fillStyle = '#123f23';
  ctx.fillRect(ax - 16, ay - 46 + (esDisparo ? 2 : 0), 7, 40);
  ctx.fillRect(ax - 13, ay - 32, 5, 26);

  // Carrusel de flechas
  ctx.fillStyle = '#3a2410';
  ctx.fillRect(ax - 13, ay - 56, 8, 44);
  ctx.fillStyle = '#241505';
  ctx.fillRect(ax - 11, ay - 58, 4, 6);
  ctx.fillStyle = '#a16207';
  ctx.fillRect(ax - 12, ay - 58, 2, 4);
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(ax - 5, ay - 57, 2, 2);

  // ===== PIERNAS Y BOTAS =====
  ctx.fillStyle = '#141018';
  ctx.fillRect(ax - 9, ay - 13, 9, 13);
  ctx.fillRect(ax + 2, ay - 13, 9, 13);
  ctx.fillStyle = '#241c28';
  ctx.fillRect(ax - 9, ay - 13, 9, 3);
  ctx.fillRect(ax + 2, ay - 13, 9, 3);

  // ===== TORSO CON TÚNICA VERDE Y TRIMADO DORADO =====
  ctx.fillStyle = '#166534';
  ctx.fillRect(ax - 11, ay - 38 + torsoOffsetY, 24, 26);
  ctx.fillStyle = '#c9a227';
  ctx.fillRect(ax - 11, ay - 18 + torsoOffsetY, 24, 2);
  ctx.fillStyle = '#241505';
  ctx.fillRect(ax - 11, ay - 23 + torsoOffsetY, 24, 3);
  ctx.fillStyle = '#facc15';
  ctx.fillRect(ax - 2, ay - 22 + torsoOffsetY, 4, 3);

  // ===== CABEZA CON CAPUCHA =====
  const cabezaY = ay - 46 + torsoOffsetY + headBob;
  ctx.fillStyle = '#14532d';
  ctx.fillRect(ax - 10, cabezaY - 3, 20, 16);
  ctx.fillStyle = '#0e3d1f';
  ctx.fillRect(ax - 10, cabezaY - 3, 20, 2);
  ctx.fillStyle = '#f2c79f';
  ctx.fillRect(ax - 5, cabezaY + 3, 11, 9);

  if (esVictoria) {
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(ax - 3, cabezaY + 6, 2, 2);
    ctx.fillRect(ax + 2, cabezaY + 6, 2, 2);
    ctx.fillRect(ax - 2, cabezaY + 10, 5, 1);
  } else if (esFallo) {
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(ax - 3, cabezaY + 6, 2, 2);
    ctx.fillRect(ax + 2, cabezaY + 6, 2, 2);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(ax + 6, cabezaY + 4, 2, 3);
  } else {
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(ax + 0, cabezaY + 5, 2, 2);
  }

  // Luz de borde (rim light) desde la antorcha izquierda
  ctx.fillStyle = 'rgba(255, 200, 120, 0.3)';
  ctx.fillRect(ax - 12, ay - 38 + torsoOffsetY, 1, 26);
  ctx.fillRect(ax - 11, cabezaY - 3, 1, 14);

  // ===== BRAZO DELANTE HACIA EL ARCO =====
  const bowX = ax + 14 - tension * 0.5;
  const bowY = origenY;
  ctx.fillStyle = '#f2c79f';
  ctx.fillRect(ax + 3 - tension * 0.4, bowY - 3, bowX - ax, 6);

  // ===== ARCO RECURVO ORIGINAL (se deforma al tensar) =====
  const radio = 22 - tension * 0.3;
  const centroX = bowX + 6;
  ctx.strokeStyle = '#a16207';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(centroX, bowY, radio, CUERDA_INICIO, CUERDA_FIN);
  ctx.stroke();
  // Extremos del arco
  ctx.fillStyle = '#7c4a12';
  ctx.fillRect(centroX + Math.cos(CUERDA_INICIO) * radio - 2, bowY + Math.sin(CUERDA_INICIO) * radio - 1, 4, 3);
  ctx.fillRect(centroX + Math.cos(CUERDA_FIN) * radio - 2, bowY + Math.sin(CUERDA_FIN) * radio - 2, 4, 3);

  // Cuerda de cáñamo (se tensa hacia el arquero)
  const manoX = centroX - tension;
  ctx.strokeStyle = '#fef3c7';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(centroX + Math.cos(CUERDA_INICIO) * radio, bowY + Math.sin(CUERDA_INICIO) * radio);
  ctx.lineTo(manoX, bowY);
  ctx.lineTo(centroX + Math.cos(CUERDA_FIN) * radio, bowY + Math.sin(CUERDA_FIN) * radio);
  ctx.stroke();

  // Flecha nockeada lista mientras apunta o tensa
  if (!motor.volando) {
    ctx.fillStyle = '#0ea5e9';
    ctx.fillRect(manoX, bowY - 2, 4, 4);
    ctx.fillStyle = '#e4e4e7';
    ctx.fillRect(manoX + 4, bowY - 2, 3, 4);
    ctx.fillStyle = '#4a3210';
    ctx.fillRect(manoX + 7, bowY - 1, 16, 2);
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(manoX + 22, bowY - 2, 4, 4);
  }

  // Destello del disparo en el arco
  if (motor.flash > 0) {
    ctx.fillStyle = motor.flash % 2 === 0 ? '#fde047' : '#f59e0b';
    ctx.fillRect(bowX + 2, bowY - 10, 12, 20);
  }
}