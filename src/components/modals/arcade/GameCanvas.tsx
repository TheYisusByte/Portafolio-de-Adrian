import { useEffect, useRef } from 'react';
import { COLOR_ZONA, E, NW, NH, VELOCIDAD_CARGA } from './constantes';
import type { Motor, TextoFlotante } from './types';
import { pintarFondo } from './render/fondo';
import { avanzarAnimArquero, pintarArquero } from './render/arquero';
import { actualizarFisicaDiana, pintarDiana } from './render/diana';
import { pintarFlecha, registrarEstela } from './render/flecha';
import { actualizarYDibujarParticulas, actualizarYDibujarTextos, dibujarDestelloMundo } from './render/efectos';

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
  const lienzoRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = lienzoRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.imageSmoothingEnabled = false;

    let ejecutando = true;
    let frame = 0;

    const loop = () => {
      if (!ejecutando) return;
      frame++;

      const motor = motorRef.current;
      const emisores = emisoresRef.current;

      // ----- ACTUALIZACIÓN DEL MOTOR (ref mutable, cero re-renders) -----
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

      // Avance de la flecha y resolución visual del impacto
      if (motor.volando) {
        motor.progreso += 0.035;
        if (motor.progreso >= 1) {
          motor.volando = false;
          motor.progreso = 1;
          resolverImpacto(motor, emisores);
        }
      }

      // Ascuas ambientales de las antorchas (animación constante y sutil)
      if (frame % 20 === 0) {
        emisores.emitirAscuas(72, 30);
        emisores.emitirAscuas(238, 30);
      }

      // ----- RENDERIZADO POR CAPAS -----
      ctx.save();
      if (motor.sacudida > 0) {
        ctx.translate((Math.random() - 0.5) * 4, (Math.random() - 0.5) * 3);
      }

      pintarFondo(ctx, motor, frame);
      pintarDiana(ctx, motor);
      pintarArquero(ctx, motor, frame);
      pintarFlecha(ctx, motor);
      actualizarYDibujarParticulas(ctx, motor.particulas);
      actualizarYDibujarTextos(ctx, motor.textos);
      dibujarDestelloMundo(ctx, motor.flash);

      ctx.restore();

      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
    return () => { ejecutando = false; };
  }, [motorRef, emisoresRef, poderBarRef, poderMeterRef]);

  return (
    <canvas
      ref={lienzoRef}
      width={NW}
      height={NH}
      className="w-full h-full object-contain"
      style={{ imageRendering: 'pixelated', touchAction: 'none' }}
    />
  );
};

function resolverImpacto(motor: Motor, emisores: EmisoresArcade) {
  const zona = motor.zonaActual;
  const puntoX = motor.destinoX;
  const puntoY = motor.destinoY;

  if (zona === 'fallo') {
    // El impacto se pierde en la pared: polvo y astillas, sin ruido de diana
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