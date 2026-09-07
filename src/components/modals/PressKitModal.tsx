import React from 'react';
import { ModalBase } from './ModalBase';
import { perfilPersonal, proyectosData } from '../../data/portfolioData';
import { Download, FileText, Briefcase, Code } from 'lucide-react';

interface PressKitModalProps {
  onClose: () => void;
}

export const PressKitModal: React.FC<PressKitModalProps> = ({ onClose }) => {
  return (
    <ModalBase onClose={onClose} tituloHeader="Currículum Profesional">
      <div className="space-y-6">
        <div className="flex justify-between items-center bg-stone-900 text-stone-100 p-4 rounded border border-stone-700">
          <div>
            <h4 className="font-stencil text-lg text-amber-400">Resumen para Reclutadores</h4>
            <p className="font-elite text-xs text-stone-300">
              Documento con perfil técnico en gestión de incidentes mayores, soporte L2 y desarrollo de software.
            </p>
          </div>
          <a
            href="/docs/hoja-de-vida.pdf"
            download
            className="bg-amber-600 hover:bg-amber-700 text-stone-950 font-stencil text-xs px-4 py-2.5 rounded font-extrabold flex items-center gap-2 transition-colors shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>Descargar PDF</span>
          </a>
        </div>

        {/* Resumen ejecutivo */}
        <div className="space-y-2">
          <h5 className="font-stencil text-sm font-bold text-stone-900 uppercase tracking-wide flex items-center gap-2">
            <FileText className="w-4 h-4 text-amber-800" />
            Perfil Ejecutivo
          </h5>
          <p className="font-elite text-sm text-stone-700 leading-relaxed bg-stone-100 p-3 border border-stone-300 rounded">
            {perfilPersonal.resumen}
          </p>
        </div>

        {/* Proyectos en formato compacto */}
        <div className="space-y-3">
          <h5 className="font-stencil text-sm font-bold text-stone-900 uppercase tracking-wide flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-amber-800" />
            Proyectos Destacados (Resumen)
          </h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {proyectosData.map((proj) => (
              <div key={proj.id} className="bg-stone-100 p-3 border border-stone-300 rounded">
                <span className="font-stencil text-sm font-bold text-stone-900 block">{proj.titulo}</span>
                <span className="font-elite text-[11px] text-amber-800 font-bold block mb-1">{proj.subtitulo}</span>
                <p className="font-elite text-xs text-stone-600 line-clamp-2">{proj.descripcionCorta}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stack tecnológico */}
        <div className="space-y-2">
          <h5 className="font-stencil text-sm font-bold text-stone-900 uppercase tracking-wide flex items-center gap-2">
            <Code className="w-4 h-4 text-amber-800" />
            Competencias Principales
          </h5>
          <div className="flex flex-wrap gap-1.5">
            {perfilPersonal.habilidades.map((h) => (
              <span key={h} className="bg-stone-200 text-stone-800 font-elite text-xs px-2 py-0.5 rounded">
                {h}
              </span>
            ))}
          </div>
        </div>
      </div>
    </ModalBase>
  );
};
