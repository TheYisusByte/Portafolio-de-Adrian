import { NH, NW } from '../constantes';
import type { Motor } from '../types';

const TORCHAS = [
  { x: 72, y: 36 },
  { x: 238, y: 36 },
];

export function pintarFondo(ctx: CanvasRenderingContext2D, motor: Motor, frame: number) {
  // ----- BASE / CIELO (BACKGROUND) -----
  ctx.fillStyle = '#070a14';
  ctx.fillRect(0, 0, NW, NH);

  // Lienzo superior con degradado dramático azul oscuro
  const grad = ctx.createLinearGradient(0, 0, 0, 130);
  grad.addColorStop(0, '#0b1126');
  grad.addColorStop(0.6, '#0d1430');
  grad.addColorStop(1, '#16142e');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, NW, 130);

  // Arcos lejanos de la arena (MIDGROUND lejano)
  ctx.fillStyle = '#0a1030';
  ctx.fillRect(0, 10, NW, 90);
  ctx.fillStyle = '#141c44';
  ctx.fillRect(18, 14, 22, 86);
  ctx.fillRect(68, 14, 22, 86);
  ctx.fillRect(230, 14, 22, 86);
  ctx.fillRect(280, 14, 22, 86);
  ctx.fillStyle = '#0a1030';
  ctx.fillRect(24, 30, 10, 70);
  ctx.fillRect(74, 30, 10, 70);
  ctx.fillRect(236, 30, 10, 70);
  ctx.fillRect(286, 30, 10, 70);

  // Pared de ladrillos del dojo
  ctx.fillStyle = '#111936';
  const anchoLadrillo = 32;
  const altoLadrillo = 16;
  for (let y = 0; y < 130; y += altoLadrillo) {
    const offset = (y / altoLadrillo) % 2 === 0 ? 0 : 16;
    for (let x = -16; x < NW + 16; x += anchoLadrillo) {
      // Tono determinista por ladrillo (evita parpadeo frame a frame)
      const tonoAlterno = ((x + y + offset * 3) % 19 === 0) ? '#0d1633' : '#131b3a';
      ctx.fillStyle = tonoAlterno;
      ctx.fillRect(x + offset, y, anchoLadrillo - 2, altoLadrillo - 2);
      ctx.fillStyle = '#0a0f26';
      ctx.fillRect(x + offset, y, anchoLadrillo - 2, 2);
      ctx.fillStyle = '#1c2547';
      ctx.fillRect(x + offset, y + 8, anchoLadrillo - 2, 1);
    }
  }

  // Vigas de madera estructurales superiores
  ctx.fillStyle = '#120d08';
  ctx.fillRect(0, 0, NW, 16);
  ctx.fillStyle = '#33220f';
  ctx.fillRect(0, 13, NW, 3);
  ctx.fillStyle = '#1a1209';
  for (let x = 16; x < NW; x += 48) ctx.fillRect(x, 4, 3, 12);

  // Neblina baja que da profundidad (MIDGROUND)
  const niebla = ctx.createLinearGradient(0, 70, 0, 132);
  niebla.addColorStop(0, 'rgba(10, 15, 38, 0)');
  niebla.addColorStop(1, 'rgba(10, 15, 38, 0.85)');
  ctx.fillStyle = niebla;
  ctx.fillRect(0, 70, NW, 62);

  // ----- ANTORCHAS CON LUZ DRAMÁTICA -----
  for (const antorcha of TORCHAS) {
    pintarAntorcha(ctx, antorcha.x, antorcha.y, frame);
  }

  // Halo cálido central que hace resaltar la diana (EFFECTS)
  const halo = ctx.createRadialGradient(254, 78, 6, 254, 78, 84);
  halo.addColorStop(0, 'rgba(255, 190, 80, 0.16)');
  halo.addColorStop(1, 'rgba(255, 190, 80, 0)');
  ctx.fillStyle = halo;
  ctx.fillRect(170, 0, 168, 130);

  // ----- SUELO DE TABLAS OSCURAS (FOREGROUND) -----
  pintarSuelo(ctx, frame);
}

function pintarAntorcha(ctx: CanvasRenderingContext2D, x: number, y: number, frame: number) {
  // Soporte de hierro
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(x - 2, y, 4, 16);
  ctx.fillRect(x - 2, y, 12, 2);

  // Mástil de madera
  ctx.fillStyle = '#4a2d13';
  ctx.fillRect(x - 3, y + 8, 6, 10);

  // Llama parpadeante
  const altura = 7 + Math.floor(Math.sin(frame * 0.3 + x) * 2);
  const resplandor = ctx.createRadialGradient(x, y - 3, 2, x, y - 3, 30);
  resplandor.addColorStop(0, 'rgba(255, 160, 60, 0.35)');
  resplandor.addColorStop(1, 'rgba(255, 160, 60, 0)');
  ctx.fillStyle = resplandor;
  ctx.fillRect(x - 30, y - 32, 60, 50);

  ctx.fillStyle = '#f97316';
  ctx.fillRect(x - 2, y - altura, 4, altura);
  ctx.fillStyle = '#fbbf24';
  ctx.fillRect(x - 1, y - altura + 2, 2, altura - 2);
  ctx.fillStyle = '#fef3c7';
  ctx.fillRect(x - 0, y - altura + 4, 1, altura - 6);
}

function pintarSuelo(ctx: CanvasRenderingContext2D, frame: number) {
  ctx.fillStyle = '#0a070d';
  ctx.fillRect(0, 130, NW, NH - 130);

  // Tablas de madera con reflejos sutiles
  ctx.fillStyle = '#1a120c';
  ctx.fillRect(0, 130, NW, 5);
  ctx.fillStyle = '#221810';
  for (let y = 135; y < NH; y += 9) {
    ctx.fillRect(0, y, NW, 7);
  }
  ctx.strokeStyle = '#050309';
  ctx.lineWidth = 1;
  for (let x = 0; x < NW; x += 32) {
    ctx.beginPath();
    ctx.moveTo(x, 130);
    ctx.lineTo(x, NH);
    ctx.stroke();
  }

  // Reflejo cálido de las antorchas sobre las tablas
  const reflejo = ctx.createLinearGradient(0, 130, 0, NH);
  reflejo.addColorStop(0, 'rgba(255, 150, 50, 0.10)');
  reflejo.addColorStop(1, 'rgba(255, 150, 50, 0)');
  ctx.fillStyle = reflejo;
  ctx.fillRect(0, 130, NW, NH - 130);

  // Pulso de luz muy sutil de las antorchas sobre el piso
  const pulso = 0.03 + Math.sin(frame * 0.12) * 0.015;
  ctx.fillStyle = `rgba(250, 180, 80, ${pulso.toFixed(3)})`;
  ctx.fillRect(0, 130, NW, NH - 130);
}