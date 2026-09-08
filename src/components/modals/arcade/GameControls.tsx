import React from 'react';

export const GameControls: React.FC = () => {
  return (
    <div className="px-5 py-2.5 border-t border-amber-500/20 flex flex-wrap justify-between items-center gap-2 text-[10px] text-stone-400 font-mono bg-[#292524]/80">
      <span className="flex items-center gap-3">
        <span className="arcade-border px-2 py-0.5 rounded-sm text-amber-300 font-bold">SPACE</span>
        <span className="arcade-border px-2 py-0.5 rounded-sm text-amber-300 font-bold">CLICK</span>
        <span className="arcade-border px-2 py-0.5 rounded-sm text-amber-300 font-bold">TAP</span>
        <span className="text-stone-500">— mantén para cargar, suelta para disparar</span>
      </span>
      <span className="text-amber-400/80 font-bold tracking-wider">NEO-GEO ARENA 16-BIT // 320×180</span>
    </div>
  );
};