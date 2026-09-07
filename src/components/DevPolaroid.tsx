import React from 'react';

interface DevPolaroidProps {
  onClick: () => void;
  className?: string;
  rotation?: string;
}

export const DevPolaroid: React.FC<DevPolaroidProps> = ({ onClick, className = '', rotation = '-rotate-2' }) => {
  return (
    <div
      onClick={onClick}
      className={`group relative bg-[#fffdf9] p-3 pt-6 pb-4 w-44 sm:w-52 paper-shadow cursor-pointer transition-all duration-300 transform hover:-translate-y-2 hover:rotate-0 hover:scale-105 ${rotation} ${className}`}
    >
      <div className="relative w-full aspect-[3/4] bg-stone-800 overflow-hidden border border-stone-300 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]">
        <img
          src="/img/perfil.jpeg"
          alt="ADRIAN"
          decoding="async"
          fetchPriority="high"
          className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-amber-950/10 group-hover:bg-transparent transition-colors" />
      </div>

      {/* Cinta adhesiva que pega la foto al corcho */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-5 bg-amber-100/60 rotate-2 shadow-sm" />
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-5 bg-amber-100/40 -rotate-3 pointer-events-none" />

      <div className="mt-3 text-center">
        <span className="font-caveat text-xl font-bold text-stone-800 block">ADRIAN</span>
        <span className="font-elite text-[10px] text-stone-500 uppercase tracking-widest">// ARCHITECT</span>
      </div>
    </div>
  );
};
