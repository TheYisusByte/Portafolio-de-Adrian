import React from 'react';
import { X, RotateCcw, Trophy, Crosshair } from 'lucide-react';
import { useArchery } from './arcade/hooks/useArchery';
import { useInput } from './arcade/hooks/useInput';
import { GameCanvas } from './arcade/GameCanvas';
import { Hud } from './arcade/Hud';
import { GameMessage } from './arcade/GameMessage';
import { Crtoverlay } from './arcade/Crtoverlay';
import { GameControls } from './arcade/GameControls';

interface ArcheryModalProps {
  onClose: () => void;
}

export const ArcheryModal: React.FC<ArcheryModalProps> = ({ onClose }) => {
  const archery = useArchery();
  useInput({ iniciar: archery.iniciarCarga, finalizar: archery.finalizarCarga });

  const { score } = archery;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/85 backdrop-blur-md select-none animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#1c1917] border border-amber-500/30 rounded-3xl overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.85)] flex flex-col ring-1 ring-white/10">

        {/* Header estilo High-Craft Widget */}
        <div className="bg-[#292524]/90 px-5 sm:px-8 py-3 flex items-center justify-between border-b border-amber-500/20 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Crosshair className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-elite text-sm sm:text-base font-bold tracking-wide text-amber-100 flex items-center gap-2">
                Bonus Stage <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-mono uppercase">Neo-Geo Arena</span>
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-stone-900/80 px-3 py-1.5 rounded-full border border-stone-800 font-mono text-xs text-stone-300">
              ✦ {archery.flechas} ARROWS LEFT
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-stone-800 hover:bg-red-500/20 text-stone-400 hover:text-red-400 border border-stone-700 hover:border-red-500/40 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
              aria-label="Cerrar juego"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* HUD Arcade */}
        <Hud
          puntuacion={score.puntuacion}
          mejorPuntuacion={score.mejorPuntuacion}
          comboCifras={score.combo}
          flechas={archery.flechas}
          poderMeterRef={archery.poderMeterRef}
        />

        {/* Sección premium del minijuego */}
        <section
          id="arcade-game"
          className="relative w-full aspect-[16/9] bg-black overflow-hidden cursor-crosshair"
          onPointerDown={archery.iniciarCarga}
          onPointerLeave={archery.finalizarCarga}
          onContextMenu={(evento) => evento.preventDefault()}
        >
          <GameCanvas
            motorRef={archery.motorRef}
            emisoresRef={archery.emisoresRef}
            poderBarRef={archery.poderBarRef}
            poderMeterRef={archery.poderMeterRef}
          />

          {/* Barra de poder vertical (gauge de carga) */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 h-36 sm:h-44 w-3.5 bg-stone-950/80 backdrop-blur border border-amber-500/30 rounded-full p-0.5 flex flex-col justify-end overflow-hidden pointer-events-none shadow-lg">
            <div className="absolute top-0 left-0 w-full h-[15%] bg-amber-500/30 border-b border-dashed border-amber-400 flex items-center justify-center">
              <span className="font-mono text-[5px] text-amber-300 font-bold">TOP</span>
            </div>
            <div ref={archery.poderBarRef} className="power-bar w-full rounded-full" style={{ height: '0%' }} />
          </div>

          <Crtoverlay />

          <GameMessage mensaje={archery.mensaje} />

          {archery.mostrarAyuda && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-stone-900/90 backdrop-blur border border-amber-500/40 px-4 py-2 rounded-2xl text-center pointer-events-none animate-bounce shadow-xl">
              <span className="font-elite text-xs text-amber-200 font-bold tracking-wider uppercase">✨ Mantén clic / espacio / tap para tensar y suelta ✨</span>
            </div>
          )}

          {archery.fase === 'fin' && (
            <div className="absolute inset-0 bg-stone-950/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-fadeIn">
              <div className="arcade-panel arcade-border px-8 py-5 rounded-none max-w-sm w-full">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4 mx-auto animate-bounce">
                  <Trophy className="w-7 h-7" />
                </div>
                <p className="font-arcade text-[10px] text-amber-500 tracking-widest mb-2">FINAL SCORE</p>
                <p className="font-arcade text-2xl sm:text-3xl font-bold text-amber-200 pixel-text mb-5">
                  {score.puntuacion.toString().padStart(6, '0')}
                </p>
                <div className="grid grid-cols-2 gap-3 text-left mb-6">
                  <div>
                    <p className="font-arcade text-[8px] text-stone-500 mb-1">BEST</p>
                    <p className="font-arcade text-xs text-amber-300 pixel-text">{score.mejorPuntuacion.toString().padStart(6, '0')}</p>
                  </div>
                  <div>
                    <p className="font-arcade text-[8px] text-stone-500 mb-1">ACCURACY</p>
                    <p className="font-arcade text-xs text-emerald-300 pixel-text">{score.precision}%</p>
                  </div>
                </div>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={archery.reiniciarRonda}
                    className="pixel-button px-5 py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-elite font-bold rounded-[10px] flex items-center gap-2 text-sm cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" /> PLAY AGAIN
                  </button>
                  <button
                    onClick={onClose}
                    className="pixel-button px-5 py-3 bg-stone-800 hover:bg-stone-700 text-stone-200 font-elite font-bold rounded-[10px] text-sm cursor-pointer border border-stone-700"
                  >
                    BACK TO DESK
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>

        <GameControls />
      </div>
    </div>
  );
};