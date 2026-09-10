import { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';
import { COLOR_ZONA, E, NW, NH, VELOCIDAD_CARGA } from './constantes';
import type { Motor, TextoFlotante } from './types';
import { pintarFondo } from './render/fondo';
import { avanzarAnimArquero, pintarArquero } from './render/arquero';
import { actualizarFisicaDiana, pintarDiana } from './render/diana';
import { pintarFlecha, registrarEstela } from './render/flecha';
import { actualizarYDibujarParticulas, dibujarDestelloMundo } from './render/efectos';

interface EmisoresArcade {
  emitirAstillas: (x: number, y: number, cantidad?: number, centroDorado?: boolean) => void;
  emitirEstrellas: (x: number, y: number) => void;
  emitirAscuas: (x: number, y: number) => void;
}

interface GameCanvasProps {
  motorRef: React.MutableRefObject<Motor>;
  emisoresRef: React.MutableRefObject<EmisoresArcade>;
  poderBarRef: React.MutableRefObject<HTMLDivElement | null>;
  poderMeterRef: React.MutableRefObject<HTMLDivElement | null>;
}

export const GameCanvas: React.FC<GameCanvasProps> = ({
  motorRef,
  emisoresRef,
  poderBarRef,
  poderMeterRef,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;
    const container = containerRef.current;
    if (!container) return;

    let app: PIXI.Application | null = null;

    async function initPixi() {
      try {
        app = new PIXI.Application();
        await app.init({
          width: NW,
          height: NH,
          background: 0x070a14,
          antialias: false,
          powerPreference: 'high-performance',
        });

        if (!isMounted || !container || !app || !app.canvas) {
          app?.destroy(true, { children: true });
          return;
        }

        app.canvas.className = 'w-full h-full object-contain';
        app.canvas.style.imageRendering = 'pixelated';
        app.canvas.style.pointerEvents = 'none';
        container.appendChild(app.canvas);

        const gFondo = new PIXI.Graphics();
        const gDiana = new PIXI.Graphics();
        gDiana.x = E.dianaX;
        gDiana.y = E.dianaY;

        const gArquero = new PIXI.Graphics();
        const gFlecha = new PIXI.Graphics();
        const gParticulas = new PIXI.Graphics();
        const gFlash = new PIXI.Graphics();

        const worldContainer = new PIXI.Container();
        worldContainer.addChild(gFondo);
        worldContainer.addChild(gDiana);
        worldContainer.addChild(gArquero);
        worldContainer.addChild(gFlecha);
        worldContainer.addChild(gParticulas);
        worldContainer.addChild(gFlash);

        app.stage.addChild(worldContainer);

        let frame = 0;

        app.ticker.add(() => {
          if (!isMounted) return;
          frame++;

          const motor = motorRef.current;
          const emisores = emisoresRef.current;

          if (motor.flash > 0) motor.flash--;
          if (motor.sacudida > 0) motor.sacudida--;

          if (motor.fase === 'cargando') {
            motor.poder += motor.dirPoder * VELOCIDAD_CARGA;
            if (motor.poder >= 100) { motor.poder = 100; motor.dirPoder = -1; }
            if (motor.poder <= 0) { motor.poder = 0; motor.dirPoder = 1; }
            const altura = motor.poder + '%';
            if (poderBarRef.current) poderBarRef.current.style.height = altura;
            if (poderMeterRef.current) poderMeterRef.current.style.width = altura;
          }

          avanzarAnimArquero(motor);
          actualizarFisicaDiana(motor);
          registrarEstela(motor);

          if (motor.volando) {
            motor.progreso += 0.035;
            if (motor.progreso >= 1) {
              motor.volando = false;
              motor.progreso = 1;
              resolverImpacto(motor, emisores);
            }
          }

          if (frame % 20 === 0) {
            emisores.emitirAscuas(72, 30);
            emisores.emitirAscuas(238, 30);
          }

          if (motor.sacudida > 0) {
            worldContainer.x = (Math.random() - 0.5) * 4;
            worldContainer.y = (Math.random() - 0.5) * 3;
          } else {
            worldContainer.x = 0;
            worldContainer.y = 0;
          }

          gDiana.rotation = motor.anguloDiana;

          pintarFondo(gFondo, motor, frame);
          pintarDiana(gDiana, motor);
          pintarArquero(gArquero, motor, frame);
          pintarFlecha(gFlecha, motor);

          gParticulas.clear();
          actualizarYDibujarParticulas(gParticulas, motor.particulas);

          gFlash.clear();
          dibujarDestelloMundo(gFlash, motor.flash);
        });
      } catch (error) {
        console.error('Error inicializando PixiJS:', error);
      }
    }

    initPixi();

    return () => {
      isMounted = false;
      if (app) {
        try {
          app.destroy(true, { children: true });
        } catch {
          // ignore
        }
      }
    };
  }, [motorRef, emisoresRef, poderBarRef, poderMeterRef]);

  return <div ref={containerRef} className="w-full h-full flex items-center justify-center overflow-hidden" />;
};

function resolverImpacto(motor: Motor, emisores: EmisoresArcade) {
  const zona = motor.zonaActual;
  const puntoX = motor.destinoX;
  const puntoY = motor.destinoY;

  if (zona === 'fallo') {
    emisores.emitirAstillas(puntoX, puntoY, 8, false);
    return;
  }

  motor.impactos.push({
    xLocal: puntoX - E.dianaX,
    yLocal: puntoY - E.dianaY,
    pts: motor.puntosUltimos,
  });
  motor.velocidadDiana = 0.3;

  emisores.emitirAstillas(puntoX, puntoY, 12, zona === 'perfeccion');
  if (zona === 'perfeccion') emisores.emitirEstrellas(puntoX, puntoY);

  motor.textos.push({
    texto: `+${motor.puntosUltimos}`,
    x: puntoX,
    y: puntoY - 12,
    vy: -0.8,
    alpha: 1,
    color: COLOR_ZONA[zona],
  } as TextoFlotante);
}
