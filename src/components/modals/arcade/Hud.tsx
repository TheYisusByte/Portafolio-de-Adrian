import React from 'react';
import { Trophy, Crosshair } from 'lucide-react';
import { FLECHAS_POR_RONDA } from './constantes';

interface HudProps {
  puntuacion: number;
  mejorPuntuacion: number;
  comboCifras: number;
  flechas: number;
  poderMeterRef: React.MutableRefObject<HTMLDivElement | null>;
}

const formatearCifras = (valor: number) => valor.toString().padStart(6, '0');

export const Hud: React.FC<HudProps> = ({ puntuacion, mejorPuntuacion, comboCifras, flechas, poderMeterRef }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 px-4 sm:px-6 py-2.5 bg-stone-950/85 border-y border-amber-500/20 font-mono">
      {/* SCORE */}
      <div className="arcade-panel arcade-border px-3 py-1.5">
        <p className="text-[9px] text-amber-500/90 font-bold tracking-widest">SCORE</p>
        <p className="font-arcade text-xs sm:text-sm text-amber-200 pixel-text">
          {formatearCifras(puntuacion)}
        </p>
      </div>

      {/* COMBO */}
      <div className={`arcade-panel arcade-border px-3 py-1.5 ${comboCifras >= 2 ? 'combo-effect' : ''}`}>
        <p className="text-[9px] text-amber-500/90 font-bold tracking-widest">COMBO</p>
        <p className={`font-arcade text-xs sm:text-sm ${comboCifras >= 2 ? 'text-yellow-300' : 'text-stone-400'} pixel-text`}>
          x{comboCifras.toString().padStart(2, '0')}
        </p>
      </div>

      {/* POWER (medidor horizontal tipo arcade) */}
      <div className="arcade-panel arcade-border px-3 py-1.5">
        <p className="text-[9px] text-amber-500/90 font-bold tracking-widest">POWER</p>
        <div className="h-3 bg-black border border-stone-700 rounded-[2px] overflow-hidden flex items-stretch gap-px p-px">
          <div
            ref={poderMeterRef}
            className="power-bar rounded-[1px]"
            style={{ width: '0%' }}
          />
        </div>
      </div>

      {/* BEST */}
      <div className="arcade-panel arcade-border px-3 py-1.5">
        <p className="text-[9px] text-amber-500/90 font-bold tracking-widest flex items-center gap-1">
          <Trophy className="w-2.5 h-2.5" /> BEST
        </p>
        <p className="font-arcade text-xs sm:text-sm text-amber-300 pixel-text">
          {formatearCifras(mejorPuntuacion)}
        </p>
      </div>

      {/* Indicador de flechas restantes */}
      <div className="col-span-2 sm:col-span-4 flex items-center justify-center gap-4 pt-0.5 text-[10px] text-stone-400">
        <span className="flex items-center gap-1">
          <Crosshair className="w-3 h-3 text-amber-400" />
          {Array.from({ length: flechas }).map((_, indice) => (
            <span key={indice} className="text-amber-300/80">{'▮'}</span>
          ))}
          <span className="text-stone-600">{Array.from({ length: FLECHAS_POR_RONDA - flechas }).map((_, indice) => (
            <span key={indice}>▯</span>
          ))}</span>
        </span>
        <span className="hidden sm:inline text-stone-600">HOLD TO CHARGE · RELEASE TO FIRE</span>
      </div>
    </div>
  );
};