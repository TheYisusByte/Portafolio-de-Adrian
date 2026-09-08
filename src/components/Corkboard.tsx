import React from 'react';

interface CorkboardProps {
  children: React.ReactNode;
  notaInferiorIzquierda?: React.ReactNode;
}

export const Corkboard: React.FC<CorkboardProps> = ({ children, notaInferiorIzquierda }) => {
  return (
    <div className="relative w-full max-w-[1400px] h-auto lg:h-full mx-auto overflow-hidden lg:overflow-visible rounded-xl p-2 sm:p-4 shadow-[0_25px_60px_rgba(0,0,0,0.8)] border-8 lg:border-[12px] border-[#3b2210] bg-[#4a2a16]">
      {/* Marco interior biselado */}
      <div className="cork-capsula relative rounded-lg overflow-hidden cork-texture p-3 sm:p-6 xl:p-8 h-auto lg:h-full min-h-0 flex flex-col justify-between border-4 border-amber-950/40">
        
        {/* Listón de cinta de enmascarar con el nombre ADRIAN */}
        <div className="absolute top-4 left-5 z-30 drop-shadow-[0_6px_10px_rgba(0,0,0,0.45)] select-none pointer-events-none">
          <div className="cork-ribbon">
            <span className="font-caveat text-xl sm:text-2xl font-bold text-stone-800/90">
              ADRIAN // ARCHITECT &amp; DEV
            </span>
          </div>
        </div>

        {/* Contenido del tablón */}
        <div className="relative z-20 flex flex-col my-2 gap-4 lg:flex-1 lg:min-h-0 lg:justify-center lg:overflow-hidden">
          {children}
        </div>

        {/* Footer / Copyright fijo */}
        <div className="relative z-20 mt-3 pt-2 flex justify-end text-xs text-black font-elite font-bold">
          <span>© 2026 ADRIAN. Todos los derechos reservados.</span>
        </div>
      </div>

      {/* Nota anclada abajo en la esquina inferior izquierda, sobresaliendo del marco */}
      {notaInferiorIzquierda && (
        <div className="absolute -bottom-3 -left-2 xl:-bottom-4 xl:-left-3 z-30">
          {notaInferiorIzquierda}
        </div>
      )}
    </div>
  );
};
