import React from 'react';
import { ModalBase } from './ModalBase';
import { proyectosData } from '../../data/portfolioData';
import { ExternalLink, Code, CheckCircle2, Clock, PlaySquare } from 'lucide-react';

interface ProjectModalProps {
  idProyecto: string;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ idProyecto, onClose }) => {
  const proyecto = proyectosData.find((p) => p.id === idProyecto) || proyectosData[0];

  return (
    <ModalBase onClose={onClose} tituloHeader={`Expediente Proyecto // ${proyecto.titulo}`}>
      <div className="space-y-6">
        {/* Imagen destacada o reproductor de video */}
        {proyecto.videoUrl ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-stone-800 font-stencil text-xs uppercase tracking-wider">
              <PlaySquare className="w-4 h-4 text-red-700" />
              <span>Demostración en Video</span>
            </div>
            <div className="relative w-full rounded border-2 border-stone-400 bg-black overflow-hidden shadow-md">
              <video
                controls
                playsInline
                className="w-full h-auto max-h-80 object-contain mx-auto"
              >
                <source src={proyecto.videoUrl} type="video/mp4" />
                Tu navegador no soporta la reproducción de video.
              </video>
            </div>
          </div>
        ) : (
          <div className="relative w-full h-64 sm:h-80 bg-stone-900 border-2 border-stone-400 overflow-hidden rounded">
            <img
              src={proyecto.imagen}
              alt={proyecto.titulo}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3 bg-stone-900/90 text-amber-300 font-stencil text-xs px-3 py-1 rounded border border-amber-500/50 flex items-center gap-1.5 shadow-lg">
              {proyecto.estado === 'Completado' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <Clock className="w-4 h-4 text-amber-400" />
              )}
              <span>Estado: {proyecto.estado}</span>
            </div>
          </div>
        )}

        {/* Título y subtítulo */}
        <div>
          <h3 className="font-stencil text-2xl font-bold text-stone-900">{proyecto.titulo}</h3>
          <p className="font-elite text-sm text-amber-800 font-semibold">{proyecto.subtitulo}</p>
        </div>

        {/* Descripción larga */}
        <div className="font-elite text-sm text-stone-700 leading-relaxed bg-stone-100 p-4 border border-stone-300 rounded">
          <p>{proyecto.descripcionLarga}</p>
        </div>

        {/* Tecnologías utilizadas */}
        <div>
          <h4 className="font-stencil text-sm font-bold text-stone-800 uppercase tracking-wider mb-2">
            Tecnologías & Stack Empleado:
          </h4>
          <div className="flex flex-wrap gap-2">
            {proyecto.tecnologias.map((tech) => (
              <span
                key={tech}
                className="bg-stone-200 border border-stone-400 text-stone-800 font-elite text-xs px-2.5 py-1 rounded"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Enlaces de acción */}
        <div className="border-t border-stone-300 pt-4 flex flex-wrap gap-4">
          {proyecto.enlaceDemo && proyecto.enlaceDemo !== 'https://example.com' && (
            <a
              href={proyecto.enlaceDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-700 hover:bg-red-800 text-white font-stencil text-sm px-5 py-2.5 rounded shadow flex items-center gap-2 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Ver Demo en Vivo</span>
            </a>
          )}
          {proyecto.enlaceRepo && (
            <a
              href={proyecto.enlaceRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-stone-800 hover:bg-stone-900 text-white font-stencil text-sm px-5 py-2.5 rounded shadow flex items-center gap-2 transition-colors"
            >
              <Code className="w-4 h-4" />
              <span>Repositorio del Código</span>
            </a>
          )}
        </div>
      </div>
    </ModalBase>
  );
};
