import React from 'react';
import type { MensajeJuego } from './types';

interface GameMessageProps {
  mensaje: MensajeJuego | null;
}

export const GameMessage: React.FC<GameMessageProps> = ({ mensaje }) => {
  if (!mensaje) return null;

  return (
    <div key={mensaje.id} className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="score-pop text-center px-2">
        <p
          className="font-arcade text-base sm:text-2xl font-bold pixel-text"
          style={{ color: mensaje.color }}
        >
          {mensaje.texto}
        </p>
        {mensaje.puntos !== undefined && (
          <p className="font-arcade text-xs sm:text-sm text-white/90 pixel-text mt-1.5">
            +{mensaje.puntos} PTS
          </p>
        )}
        {mensaje.sub && (
          <p className="font-mono text-[10px] sm:text-xs text-yellow-300 mt-1 subir-texto font-bold">
            {mensaje.sub}
          </p>
        )}
      </div>
    </div>
  );
};