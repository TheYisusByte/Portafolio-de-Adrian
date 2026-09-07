import React from 'react';

interface ProjectClippingProps {
  titulo: string;
  categoria: string;
  descripcion: string;
  onClick: () => void;
  rotation?: string;
  className?: string;
}

export const ProjectClipping: React.FC<ProjectClippingProps> = ({
  titulo,
  categoria,
  descripcion,
  onClick,
  rotation = 'rotate-2',
  className = ''
}) => {
  return (
    <div
      onClick={onClick}
      className={`relative bg-[#f5f2eb] p-4 w-60 sm:w-72 border-2 border-stone-400 paper-shadow cursor-pointer transition-all duration-300 transform hover:-translate-y-2 hover:rotate-0 hover:scale-105 ${rotation} ${className}`}
    >
      {/* Chinche */}
      <div className="push-pin" />

      {/* Cabecera de recorte de prensa */}
      <div className="border-b-2 border-stone-800 pb-1 mb-2 flex justify-between items-center">
        <span className="font-stencil text-[10px] tracking-widest text-stone-700 uppercase">
          EXPEDIENTE // {categoria}
        </span>
        <span className="font-elite text-[9px] bg-stone-800 text-stone-100 px-1.5 py-0.5 rounded">
          CONFIDENCIAL
        </span>
      </div>

      <h3 className="font-stencil text-lg sm:text-xl font-extrabold text-stone-900 tracking-wide uppercase mb-1">
        {titulo}
      </h3>

      <p className="font-elite text-xs text-stone-700 leading-relaxed line-clamp-3">
        {descripcion}
      </p>

      <div className="mt-3 flex justify-between items-center text-[11px] font-elite font-bold text-amber-800">
        <span>[ VER EXPEDIENTE COMPLETO ]</span>
        <span>🔍</span>
      </div>
    </div>
  );
};
