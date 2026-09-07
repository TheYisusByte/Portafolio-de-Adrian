import React from 'react';
import { ModalBase } from './ModalBase';
import { perfilPersonal } from '../../data/portfolioData';
import { Code2, Award, Terminal } from 'lucide-react';

interface AboutModalProps {
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ onClose }) => {
  return (
    <ModalBase onClose={onClose} tituloHeader="Dossier Personal">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <div className="w-full sm:w-1/3 bg-stone-900 p-4 border border-stone-300 text-stone-100 rounded">
            <div className="w-full aspect-[3/4] bg-stone-800 mb-3 overflow-hidden rounded relative">
              <img
                src="/img/perfil.jpeg"
                alt="ADRIAN"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <h3 className="font-stencil text-xl font-bold text-amber-400">{perfilPersonal.nombre}</h3>
            <p className="font-elite text-xs text-stone-300 mt-1">{perfilPersonal.rol}</p>
            <p className="font-elite text-[11px] text-stone-400 mt-2">📍 {perfilPersonal.ubicacion}</p>
          </div>

          <div className="w-full sm:w-2/3 space-y-4 font-elite text-sm text-stone-700 leading-relaxed">
            {perfilPersonal.biografiaCompleta.map((parrafo, idx) => (
              <p key={idx}>{parrafo}</p>
            ))}
          </div>
        </div>

        {/* Habilidades */}
        <div className="border-t border-stone-300 pt-4">
          <h4 className="font-stencil text-lg font-bold text-stone-900 mb-3 flex items-center gap-2">
            <Code2 className="w-5 h-5 text-amber-800" />
            Arsenal Técnico & Tecnologías
          </h4>
          <div className="flex flex-wrap gap-2">
            {perfilPersonal.habilidades.map((hab) => (
              <span
                key={hab}
                className="bg-stone-200 border border-stone-400 text-stone-800 font-elite text-xs px-3 py-1 rounded shadow-sm"
              >
                {hab}
              </span>
            ))}
          </div>
        </div>

        {/* Experiencia */}
        <div className="border-t border-stone-300 pt-4">
          <h4 className="font-stencil text-lg font-bold text-stone-900 mb-3 flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-800" />
            Trayectoria Profesional
          </h4>
          <div className="space-y-3">
            {perfilPersonal.experiencia.map((exp, idx) => (
              <div key={idx} className="bg-stone-100 p-3 border-l-4 border-amber-800 rounded">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold font-stencil text-stone-900">{exp.puesto}</span>
                  <span className="font-elite text-xs text-stone-500">{exp.periodo}</span>
                </div>
                <p className="font-elite text-xs text-amber-900 mb-1">{exp.empresa}</p>
                <p className="font-elite text-xs text-stone-600">{exp.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ModalBase>
  );
};
