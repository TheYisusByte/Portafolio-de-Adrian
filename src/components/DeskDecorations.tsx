import React from 'react';
import { Globe, Share2, MessageSquare, ExternalLink } from 'lucide-react';
import { enlacesSociales } from '../data/portfolioData';

interface DeskDecorationsProps {
  onOpenSocial?: (url: string) => void;
}

export const DeskDecorations: React.FC<DeskDecorationsProps> = () => {
  return (
    <div className="relative bg-[#f8f5ee] p-4 rounded border border-stone-400 paper-shadow w-52 sm:w-60 transform rotate-1 select-none">
      <div className="push-pin" />
      
      <div className="flex items-center gap-2 border-b border-stone-300 pb-2 mb-3">
        <Share2 className="w-4 h-4 text-amber-800" />
        <span className="font-stencil text-xs text-stone-800 tracking-wider font-bold">ENCUÉNTRAME EN</span>
      </div>

      <div className="flex flex-col gap-2">
        {enlacesSociales.map((social) => {
          let IconComponent = Globe;
          if (social.icono === 'discord') IconComponent = MessageSquare;
          else IconComponent = ExternalLink;

          return (
            <a
              key={social.nombre}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-1.5 rounded hover:bg-amber-100/80 transition-colors text-stone-800 group"
            >
              <div className="flex items-center gap-2">
                <IconComponent className="w-4 h-4 text-amber-900 group-hover:scale-110 transition-transform" />
                <span className="font-elite text-xs font-bold">{social.nombre}</span>
              </div>
              <span className="font-elite text-[10px] text-stone-500">{social.usuario}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
};
