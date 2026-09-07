import React from 'react';

interface PolaroidCardProps {
  imagen: string;
  titulo: string;
  subtitulo?: string;
  onClick: () => void;
  rotation?: string;
  className?: string;
}

export const PolaroidCard: React.FC<PolaroidCardProps> = ({
  imagen,
  titulo,
  subtitulo,
  onClick,
  rotation = 'rotate-1',
  className = ''
}) => {
  return (
    <div
      onClick={onClick}
      className={`group relative bg-[#fdfbf7] p-3 pt-6 pb-4 w-52 sm:w-60 paper-shadow cursor-pointer transition-all duration-300 transform hover:-translate-y-2 hover:rotate-0 hover:scale-105 ${rotation} ${className}`}
    >
      {/* Chinche superior */}
      <div className="push-pin" />

      {/* Imagen */}
      <div className="relative w-full h-36 sm:h-44 overflow-hidden bg-stone-800 border border-stone-300">
        <img
          src={imagen}
          alt={titulo}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 filter contrast-105"
        />
        <div className="absolute inset-0 bg-amber-950/10 group-hover:bg-transparent transition-colors" />
      </div>

      {/* Texto inferior estilo polaroid */}
      <div className="mt-3 text-center">
        <h3 className="font-caveat text-xl sm:text-2xl font-bold text-stone-800 tracking-wide truncate">
          {titulo}
        </h3>
        {subtitulo && (
          <p className="font-elite text-xs text-stone-500 uppercase tracking-widest mt-0.5">
            {subtitulo}
          </p>
        )}
      </div>
    </div>
  );
};
