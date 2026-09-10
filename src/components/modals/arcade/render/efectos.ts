import { NH, NW } from '../constantes';
import type { Particula, TextoFlotante } from '../types';
import * as PIXI from 'pixi.js';

export function actualizarYDibujarParticulas(g: PIXI.Graphics, particulas: Particula[]) {
  let vivas = 0;
  for (let i = 0; i < particulas.length; i++) {
    const p = particulas[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vida++;
    if (p.tipo === 'astilla' || p.tipo === 'ascua') p.vy += 0.1;

    const colorNum = typeof p.color === 'string' ? parseInt(p.color.replace('#', '0x')) : p.color;
    g.rect(Math.floor(p.x), Math.floor(p.y), p.tam, p.tam).fill({ color: colorNum });

    if (p.vida < p.vidaMax) particulas[vivas++] = p;
  }
  particulas.length = vivas;
}

export function actualizarYDibujarTextos(_textosContainer: PIXI.Container, textos: TextoFlotante[]) {
  let vivas = 0;
  for (let i = 0; i < textos.length; i++) {
    const texto = textos[i];
    texto.y += texto.vy;
    texto.alpha -= 0.02;
    if (texto.alpha > 0) textos[vivas++] = texto;
  }
  textos.length = vivas;
}

export function dibujarDestelloMundo(g: PIXI.Graphics, flash: number) {
  if (flash <= 0) return;
  const alpha = (flash / 8) * 0.12;
  g.rect(0, 0, NW, NH).fill({ color: 0xffdc96, alpha });
}
