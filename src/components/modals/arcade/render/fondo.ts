import { NH, NW } from '../constantes';
import type { Motor } from '../types';
import * as PIXI from 'pixi.js';

const TORCHAS = [
  { x: 72, y: 36 },
  { x: 238, y: 36 },
];

export function pintarFondo(g: PIXI.Graphics, motor: Motor, frame: number) {
  g.clear();

  // Base / cielo
  g.rect(0, 0, NW, NH).fill({ color: 0x070a14 });

  // Cielo superior degradado simulado con bandas limpias de pixel-art
  g.rect(0, 0, NW, 50).fill({ color: 0x0b1126 });
  g.rect(0, 50, NW, 40).fill({ color: 0x0d1430 });
  g.rect(0, 90, NW, 40).fill({ color: 0x16142e });

  // Arcos lejanos de la arena
  g.rect(0, 10, NW, 90).fill({ color: 0x0a1030 });
  const columnasX = [18, 68, 230, 280];
  for (const cx of columnasX) {
    g.rect(cx, 14, 22, 86).fill({ color: 0x141c44 });
    g.rect(cx + 6, 30, 10, 70).fill({ color: 0x0a1030 });
  }

  // Pared de ladrillos del dojo
  const anchoLadrillo = 32;
  const altoLadrillo = 16;
  for (let y = 0; y < 130; y += altoLadrillo) {
    const offset = (y / altoLadrillo) % 2 === 0 ? 0 : 16;
    for (let x = -16; x < NW + 16; x += anchoLadrillo) {
      const tonoAlterno = ((x + y + offset * 3) % 19 === 0) ? 0x0d1633 : 0x131b3a;
      g.rect(x + offset, y, anchoLadrillo - 2, altoLadrillo - 2).fill({ color: tonoAlterno });
      g.rect(x + offset, y, anchoLadrillo - 2, 2).fill({ color: 0x0a0f26 });
      g.rect(x + offset, y + 8, anchoLadrillo - 2, 1).fill({ color: 0x1c2547 });
    }
  }

  // Vigas superiores
  g.rect(0, 0, NW, 16).fill({ color: 0x120d08 });
  g.rect(0, 13, NW, 3).fill({ color: 0x33220f });
  for (let x = 16; x < NW; x += 48) {
    g.rect(x, 4, 3, 12).fill({ color: 0x1a1209 });
  }

  // Neblina baja
  g.rect(0, 70, NW, 62).fill({ color: 0x0a0f26, alpha: 0.75 });

  // Antorchas
  for (const antorcha of TORCHAS) {
    pintarAntorcha(g, antorcha.x, antorcha.y, frame);
  }

  // Halo cálido central
  g.circle(254, 78, 60).fill({ color: 0xffbe50, alpha: 0.15 });

  // Suelo de tablas oscuras
  g.rect(0, 130, NW, NH - 130).fill({ color: 0x0a070d });
  g.rect(0, 130, NW, 5).fill({ color: 0x1a120c });
  for (let y = 135; y < NH; y += 9) {
    g.rect(0, y, NW, 7).fill({ color: 0x221810 });
  }
  for (let x = 0; x < NW; x += 32) {
    g.rect(x, 130, 1, NH - 130).fill({ color: 0x050309 });
  }
  g.rect(0, 130, NW, NH - 130).fill({ color: 0xff9632, alpha: 0.1 });

  const pulso = 0.03 + Math.sin(frame * 0.12) * 0.015;
  g.rect(0, 130, NW, NH - 130).fill({ color: 0xfab450, alpha: pulso });
}

function pintarAntorcha(g: PIXI.Graphics, x: number, y: number, frame: number) {
  g.rect(x - 2, y, 4, 16).fill({ color: 0x0f172a });
  g.rect(x - 2, y, 12, 2).fill({ color: 0x0f172a });
  g.rect(x - 3, y + 8, 6, 10).fill({ color: 0x4a2d13 });

  const altura = 7 + Math.floor(Math.sin(frame * 0.3 + x) * 2);
  g.circle(x, y - 3, 24).fill({ color: 0xffa03c, alpha: 0.25 });
  g.rect(x - 2, y - altura, 4, altura).fill({ color: 0xf97316 });
  g.rect(x - 1, y - altura + 2, 2, altura - 2).fill({ color: 0xfbbf24 });
  g.rect(x, y - altura + 4, 1, altura - 6).fill({ color: 0xfef3c7 });
}
