import React from 'react';
import { X } from 'lucide-react';

interface ModalBaseProps {
  children: React.ReactNode;
  onClose: () => void;
  tituloHeader?: string;
}

export const ModalBase: React.FC<ModalBaseProps> = ({ children, onClose, tituloHeader }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      {/* Contenedor tipo papel físico sobre el escritorio oscuro */}
      <div className="relative w-full max-w-3xl bg-[#fbf9f4] border-2 border-stone-400 rounded-lg p-6 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.9)] max-h-[90vh] overflow-y-auto">
        {/* Chinche superior */}
        <div className="push-pin scale-125" />

        {/* Botón de cierre estilo sello o clip rojo */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-red-700 text-white flex items-center justify-center hover:bg-red-800 transition-colors shadow-md z-30 group"
          title="Cerrar expediente"
        >
          <X className="w-5 h-5 group-hover:rotate-90 transition-transform" />
        </button>

        {/* Cabecera opcional */}
        {tituloHeader && (
          <div className="border-b-2 border-stone-800 pb-2 mb-6 pr-12">
            <span className="font-stencil text-xs text-stone-600 tracking-widest uppercase">
              // ARCHIVO OFICIAL
            </span>
            <h2 className="font-stencil text-2xl sm:text-3xl font-extrabold text-stone-900 uppercase">
              {tituloHeader}
            </h2>
          </div>
        )}

        {/* Contenido del modal */}
        <div className="relative z-10 text-stone-800">
          {children}
        </div>
      </div>
    </div>
  );
};
