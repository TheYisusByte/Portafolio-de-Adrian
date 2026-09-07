import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Corkboard } from './Corkboard';
import { DevPolaroid } from './DevPolaroid';
import { PostItNote } from './PostItNote';
import { PolaroidCard } from './PolaroidCard';
import { ProjectClipping } from './ProjectClipping';
import { MapaContacto } from './MapaContacto';
import { DeskDecorations } from './DeskDecorations';
import { HiloInvestigacion } from './HiloInvestigacion';
import { proyectosData } from '../data/portfolioData';

interface CanvasDeskProps {
  onOpenModal: (tipo: 'sobre-mi' | 'nota-sobre-mi' | 'proyecto' | 'contacto' | 'press-kit', idProyecto?: string) => void;
}

const CONEXIONES_HILO: Array<[string, string]> = [
  ['identidad', 'info'],
  ['identidad', 'curriculum'],
  ['curriculum', 'proyecto1'],
  ['proyecto1', 'proyecto2'],
  ['proyecto2', 'proyecto3'],
  ['proyecto3', 'proyecto4'],
  ['mapa', 'proyecto4'],
];

export const CanvasDesk: React.FC<CanvasDeskProps> = ({ onOpenModal }) => {
  const contenedorRef = useRef<HTMLDivElement>(null);
  const rejillaRef = useRef<HTMLDivElement>(null);
  const [tableroListo, setTableroListo] = useState(false);
  const refIdentidad = useRef<HTMLDivElement>(null);
  const refInfo = useRef<HTMLDivElement>(null);
  const refCurriculum = useRef<HTMLDivElement>(null);
  const refProyecto1 = useRef<HTMLDivElement>(null);
  const refProyecto2 = useRef<HTMLDivElement>(null);
  const refProyecto3 = useRef<HTMLDivElement>(null);
  const refMapa = useRef<HTMLDivElement>(null);
  const refProyecto4 = useRef<HTMLDivElement>(null);

  const nodosHilo = useMemo(
    () => [
      { id: 'identidad', ref: refIdentidad },
      { id: 'info', ref: refInfo },
      { id: 'curriculum', ref: refCurriculum },
      { id: 'proyecto1', ref: refProyecto1 },
      { id: 'proyecto2', ref: refProyecto2 },
      { id: 'proyecto3', ref: refProyecto3 },
      { id: 'mapa', ref: refMapa },
      { id: 'proyecto4', ref: refProyecto4 },
    ],
    []
  );

  useEffect(() => {
    const contenedor = contenedorRef.current;
    const rejilla = rejillaRef.current;
    if (!contenedor || !rejilla) return;

    const ajustar = () => {
      const anchoDisponible = contenedor.clientWidth;
      const altoDisponible = contenedor.clientHeight;
      const anchoNatural = rejilla.offsetWidth;
      const altoNatural = rejilla.offsetHeight;
      if (!anchoDisponible || !altoDisponible || !anchoNatural || !altoNatural) return;

      const escala = Math.min(1, anchoDisponible / anchoNatural, altoDisponible / altoNatural);
      const desplazamientoY = Math.max(0, (altoDisponible - altoNatural * escala) / 2);
      rejilla.style.transform = `translateY(${desplazamientoY.toFixed(1)}px) scale(${escala.toFixed(4)})`;
      setTableroListo(true);
    };

    ajustar();
    const observador = new ResizeObserver(ajustar);
    observador.observe(contenedor);
    window.addEventListener('resize', ajustar);
    return () => {
      observador.disconnect();
      window.removeEventListener('resize', ajustar);
    };
  }, []);

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden wood-desk-background flex flex-col items-center justify-center p-2 sm:p-4 select-none">
      {/* Halo de luz superior de la lámpara de escritorio */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[85%] sm:w-[65%] h-[420px] bg-amber-200/15 blur-[130px] pointer-events-none rounded-full" />

      {/* Tablón de Corcho Central (Canvas de Composición) */}
      <Corkboard>
        {/* Distribución en zigzag: identidad → documentos → evidencia → contacto */}
        <div ref={contenedorRef} className="relative flex-1 min-h-0 w-full overflow-hidden">
          <div
            ref={rejillaRef}
            className="cork-rejilla grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 xl:gap-10 items-start justify-items-center py-4 sm:py-6 xl:py-8 px-2 sm:px-6"
            style={{ transformOrigin: 'top center', opacity: tableroListo ? 1 : 0, transition: 'opacity 0.25s ease' }}
          >

          {/* Columna 1: Identidad — Foto & Nota de pista */}
          <div className="flex flex-col items-center w-full gap-8">
            <div ref={refIdentidad} className="mt-12 sm:mt-16">
              <DevPolaroid
                onClick={() => onOpenModal('sobre-mi')}
                rotation="-rotate-1"
              />
            </div>
            <div ref={refInfo} className="mt-6 sm:mt-8">
              <PostItNote
                color="amarillo"
                titulo="Info"
                subtitulo="Arquitectura limpia, principios SOLID y automatización con IA."
                onClick={() => onOpenModal('nota-sobre-mi')}
                rotation="-rotate-3"
              />
            </div>
          </div>

          {/* Columna 2: Currículum & Proyecto 1 (Miel Orgánica) */}
          <div className="flex flex-col gap-8 items-center w-full">
            <div ref={refCurriculum}>
              <PostItNote
                color="rosa"
                titulo="Currículum"
                subtitulo="Perfil ejecutivo y resumen profesional para reclutadores."
                onClick={() => onOpenModal('press-kit')}
                rotation="rotate-2"
              />
            </div>
            <div ref={refProyecto1}>
              <ProjectClipping
                titulo={proyectosData[0].titulo}
                categoria="E-commerce & Landing"
                descripcion={proyectosData[0].descripcionCorta}
                onClick={() => onOpenModal('proyecto', proyectosData[0].id)}
                rotation="rotate-1"
              />
            </div>
          </div>

          {/* Columna 3: Proyectos 2 (CRM) & 3 (Gastovoz) */}
          <div className="flex flex-col gap-8 items-center w-full">
            <div ref={refProyecto2}>
              <PolaroidCard
                imagen={proyectosData[1].imagen}
                titulo={proyectosData[1].titulo}
                subtitulo="Sistema Inmobiliario"
                onClick={() => onOpenModal('proyecto', proyectosData[1].id)}
                rotation="-rotate-2"
              />
            </div>
            <div ref={refProyecto3}>
              <ProjectClipping
                titulo={proyectosData[2].titulo}
                categoria="App Móvil / Flutter"
                descripcion={proyectosData[2].descripcionCorta}
                onClick={() => onOpenModal('proyecto', proyectosData[2].id)}
                rotation="rotate-3"
              />
            </div>
          </div>

          {/* Columna 4: Contacto & Proyecto 4 (RuntimeHQ) */}
          <div className="flex flex-col gap-8 items-center w-full">
            <div ref={refMapa} className="flex flex-col items-center gap-4 w-full">
              <MapaContacto onClick={() => onOpenModal('contacto')} />
              <DeskDecorations />
            </div>
            <div ref={refProyecto4}>
              <PolaroidCard
                imagen={proyectosData[3].imagen}
                titulo={proyectosData[3].titulo}
                subtitulo="Alta Performance"
                onClick={() => onOpenModal('proyecto', proyectosData[3].id)}
                rotation="rotate-1"
              />
            </div>
          </div>

          </div>

          {/* Hilo rojo del muro de investigación conectando las pistas */}
          <HiloInvestigacion contenedorRef={contenedorRef} rejillaRef={rejillaRef} nodos={nodosHilo} conexiones={CONEXIONES_HILO} />

        </div>
      </Corkboard>
    </div>
  );
};
