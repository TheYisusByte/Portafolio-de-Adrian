import React from 'react';

interface CorkboardProps {
  children: React.ReactNode;
}

export const Corkboard: React.FC<CorkboardProps> = ({ children }) => {
  return (
    <div className="relative w-full max-w-[1400px] h-full mx-auto overflow-hidden rounded-xl p-2 sm:p-4 shadow-[0_25px_60px_rgba(0,0,0,0.8)] border-[12px] border-[#3b2210] bg-[#4a2a16]">
      {/* Marco interior biselado */}
      <div className="cork-capsula relative rounded-lg overflow-hidden cork-texture p-3 sm:p-6 xl:p-8 h-full min-h-0 flex flex-col justify-between border-4 border-amber-950/40">
        
        {/* Listón de cinta de enmascarar con el nombre ADRIAN */}
        <div className="absolute top-4 left-5 z-30 drop-shadow-[0_6px_10px_rgba(0,0,0,0.45)] select-none pointer-events-none">
          <div className="cork-ribbon">
            <span className="font-caveat text-xl sm:text-2xl font-bold text-stone-800/90">
              ADRIAN // ARCHITECT &amp; DEV
            </span>
          </div>
        </div>

        {/* Contenido del tablón */}
        <div className="relative z-20 flex-1 min-h-0 flex flex-col justify-center my-2 gap-4 overflow-hidden">
          {children}
        </div>

        {/* Footer / Copyright fijo */}
        <div className="relative z-20 mt-3 pt-2 flex justify-end text-xs text-black font-elite font-bold">
          <span>© 2026 ADRIAN. Todos los derechos reservados.</span>
        </div>
      </div>
    </div>
  );
};
