import React from 'react';
import { Target } from 'lucide-react';

interface ArcheryNoteProps {
  onClick: () => void;
  rotation?: string;
  compacto?: boolean;
}

export const ArcheryNote: React.FC<ArcheryNoteProps> = ({
  onClick,
  rotation = 'rotate-2',
  compacto = false
}) => {
  if (compacto) {
    return (
      <div
        onClick={onClick}
        className={`postit-stack relative p-3 w-36 sm:w-44 bg-[#fde047] text-amber-950 border border-amber-300 shadow-amber-950/20 paper-shadow cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:rotate-0 hover:scale-105 ${rotation}`}
      >
        <div className="push-pin" />
        <div className="flex items-center gap-1.5 mb-1">
          <Target className="w-3.5 h-3.5 text-amber-900 shrink-0" />
        </div>
        <h3 className="font-caveat text-2xl sm:text-3xl font-bold leading-tight my-1">
          Bonus
        </h3>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`postit-stack relative p-5 w-48 sm:w-56 bg-[#fde047] text-amber-950 border border-amber-300 shadow-amber-950/20 paper-shadow cursor-pointer transition-all duration-300 transform hover:-translate-y-2 hover:rotate-0 hover:scale-105 flex flex-col justify-between ${rotation}`}
    >
      {/* Chinche */}
      <div className="push-pin" />

      <div>
        <div className="flex items-center gap-1 mb-1">
          <Target className="w-3.5 h-3.5 text-amber-900" />
        </div>
        <h3 className="font-caveat text-3xl sm:text-4xl font-bold leading-tight my-2">
          Bonus
        </h3>
      </div>
      <p className="font-elite text-xs leading-snug opacity-90 mb-2">
        ¡Mantén presionado y acierta al centro!
      </p>
    </div>
  );
};
