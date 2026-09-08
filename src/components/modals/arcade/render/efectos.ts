import { NH, NW } from '../constantes';
import type { Motor, Particula, TextoFlotante } from '../types';

export function actualizarYDibujarParticulas(ctx: CanvasRenderingContext2D, particulas: Particula[]) {
  let vivas = 0;
  for (let i = 0; i < particulas.length; i++) {
    const p = particulas[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vida++;
    if (p.tipo === 'astilla' || p.tipo === 'ascua') p.vy += 0.1;

    ctx.fillStyle = p.color;
    ctx.fillRect(Math.floor(p.x), Math.floor(p.y), p.tam, p.tam);

    if (p.vida < p.vidaMax) particulas[vivas++] = p;
  }
  particulas.length = vivas;
}

export function actualizarYDibujarTextos(ctx: CanvasRenderingContext2D, textos: TextoFlotante[]) {
  let vivas = 0;
  for (let i = 0; i < textos.length; i++) {
    const texto = textos[i];
    texto.y += texto.vy;
    texto.alpha -= 0.02;

    ctx.save();
    ctx.globalAlpha = Math.max(0, texto.alpha);
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 10px sans-serif';
    ctx.fillText(texto.texto, texto.x - 14 + 1, texto.y + 1);
    ctx.fillStyle = texto.color;
    ctx.fillText(texto.texto, texto.x - 14, texto.y);
    ctx.restore();

    if (texto.alpha > 0) textos[vivas++] = texto;
  }
  textos.length = vivas;
}

export function dibujarDestelloMundo(ctx: CanvasRenderingContext2D, flash: number) {
  if (flash <= 0) return;
  ctx.fillStyle = `rgba(255, 220, 150, ${(flash / 8) * 0.12})`;
  ctx.fillRect(0, 0, NW, NH);
}