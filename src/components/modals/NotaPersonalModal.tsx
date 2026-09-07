import React from 'react';
import { ModalBase } from './ModalBase';
import { perfilPersonal } from '../../data/portfolioData';

interface NotaPersonalModalProps {
  onClose: () => void;
}

export const NotaPersonalModal: React.FC<NotaPersonalModalProps> = ({ onClose }) => {
  return (
    <ModalBase onClose={onClose} tituloHeader="Info">
      <div className="space-y-6 bg-[#fdf8ec] border border-amber-200/70 rounded p-6 sm:p-8 paper-shadow relative">
        {/* Cinta adhesiva en las esquinas de la carta */}
        <div className="absolute -top-3 -left-3 w-16 h-6 bg-amber-100/60 rotate-[-8deg] shadow-sm" />
        <div className="absolute -bottom-3 -right-3 w-16 h-6 bg-amber-100/50 rotate-[6deg] shadow-sm" />

        <div className="font-caveat text-2xl sm:text-3xl text-stone-800 leading-relaxed">
          <p>
            Diseñé este escritorio como una pista que se explora, no como un currículo que se lee:
            quería que quien llegara aquí sintiera la misma curiosidad que se siente al abrir un
            archivador lleno de casos. Cada polaroid, nota y chinche tiene un motivo — que descubrir
            mi trabajo se sienta como una investigación y no como un formulario.
          </p>
          <p className="mt-4 text-lg sm:text-xl text-stone-700">
            Por dentro está construida con React, Vite, TypeScript y Tailwind CSS, con componentes
            modulares y arquitectura limpia. Porque detrás de cada detalle visual hay la misma
            disciplina que aplico a cada sistema que diseño: la emoción en la superficie, el orden
            por dentro.
          </p>
        </div>

        <div className="font-caveat text-2xl text-amber-900 text-right -rotate-1">
          — {perfilPersonal.nombre}
        </div>
      </div>
    </ModalBase>
  );
};