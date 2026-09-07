import React from 'react';

interface PostItNoteProps {
  color?: 'amarillo' | 'rosa' | 'azul' | 'verde';
  titulo: string;
  subtitulo: string;
  onClick: () => void;
  rotation?: string;
  className?: string;
}

export const PostItNote: React.FC<PostItNoteProps> = ({
  color = 'amarillo',
  titulo,
  subtitulo,
  onClick,
  rotation = '-rotate-2',
  className = ''
}) => {
  const colorClasses = {
    amarillo: 'bg-[#fef08a] text-amber-950 border-amber-200 shadow-amber-950/20',
    rosa: 'bg-[#fbcfe8] text-rose-950 border-rose-200 shadow-rose-950/20',
    azul: 'bg-[#bae6fd] text-sky-950 border-sky-200 shadow-sky-950/20',
    verde: 'bg-[#bbf7d0] text-emerald-950 border-emerald-200 shadow-emerald-950/20',
  };

  return (
    <div
      onClick={onClick}
      className={`postit-stack relative p-5 w-48 sm:w-56 ${colorClasses[color]} border paper-shadow cursor-pointer transition-all duration-300 transform hover:-translate-y-2 hover:rotate-0 hover:scale-105 flex flex-col justify-between ${rotation} ${className}`}
    >
      {/* Chinche */}
      <div className="push-pin" />

      <div>
        <span className="font-elite text-[10px] uppercase tracking-wider opacity-75 block mb-1">
          // NOTA DE PISTA
        </span>
        <h3 className="font-caveat text-2xl sm:text-3xl font-bold leading-tight mb-2">
          {titulo}
        </h3>
      </div>
      <p className="font-elite text-xs leading-snug opacity-90">
        {subtitulo}
      </p>

      <div className="mt-4 pt-2 border-t border-black/10 flex justify-end items-center text-xs font-bold font-elite">
        <span>Abrir →</span>
      </div>
    </div>
  );
};
