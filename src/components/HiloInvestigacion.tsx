import React, { useEffect, useState } from 'react';

interface Nodo {
  id: string;
  ref: React.RefObject<HTMLDivElement | null>;
}

interface Punto {
  x: number;
  y: number;
}

interface HiloInvestigacionProps {
  contenedorRef: React.RefObject<HTMLDivElement | null>;
  rejillaRef?: React.RefObject<HTMLDivElement | null>;
  nodos: Nodo[];
  conexiones: Array<[string, string]>;
}

const trazarCurva = (a: Punto, b: Punto): string => {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const largo = Math.hypot(dx, dy) || 1;
  const nx = -dy / largo;
  const ny = dx / largo;
  const comba = Math.min(22, Math.max(7, largo * 0.08));
  const cx1 = a.x + dx * 0.25 + nx * comba;
  const cy1 = a.y + dy * 0.25 + ny * comba;
  const cx2 = a.x + dx * 0.75 + nx * comba;
  const cy2 = a.y + dy * 0.75 + ny * comba;
  return `M ${a.x} ${a.y} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${b.x} ${b.y}`;
};

export const HiloInvestigacion: React.FC<HiloInvestigacionProps> = ({
  contenedorRef,
  rejillaRef,
  nodos,
  conexiones,
}) => {
  const [ancho, setAncho] = useState(0);
  const [alto, setAlto] = useState(0);
  const [marcas, setMarcas] = useState<Record<string, Punto>>({});

  useEffect(() => {
    const contenedor = contenedorRef.current;
    if (!contenedor) return;

    const medir = () => {
      const rectContenedor = contenedor.getBoundingClientRect();
      const nuevasMarcas: Record<string, Punto> = {};
      for (const nodo of nodos) {
        const elemento = nodo.ref.current;
        if (!elemento) continue;
        const rect = elemento.getBoundingClientRect();
        nuevasMarcas[nodo.id] = {
          x: rect.left + rect.width / 2 - rectContenedor.left,
          y: rect.top - rectContenedor.top + 5,
        };
      }
      setAncho(rectContenedor.width);
      setAlto(rectContenedor.height);
      setMarcas(nuevasMarcas);
    };

    medir();
    const observador = new ResizeObserver(medir);
    observador.observe(contenedor);
    window.addEventListener('resize', medir);
    let observadorEstilo: MutationObserver | null = null;
    if (rejillaRef?.current) {
      observadorEstilo = new MutationObserver(medir);
      observadorEstilo.observe(rejillaRef.current, { attributes: true, attributeFilter: ['style'] });
    }
    return () => {
      observador.disconnect();
      observadorEstilo?.disconnect();
      window.removeEventListener('resize', medir);
    };
  }, [contenedorRef, rejillaRef, nodos]);

  if (ancho === 0 || alto === 0) return null;

  return (
    <svg
      className="hilo-tendido pointer-events-none"
      style={{ position: 'absolute', inset: 0, zIndex: 40, width: '100%', height: '100%' }}
      viewBox={`0 0 ${ancho} ${alto}`}
      fill="none"
    >
      <defs>
        <radialGradient id="cabeza-chinche" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ff6b6b" />
          <stop offset="45%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#7f1d1d" />
        </radialGradient>
      </defs>

      {conexiones.map(([idA, idB]) => {
        const a = marcas[idA];
        const b = marcas[idB];
        if (!a || !b) return null;
        const d = trazarCurva(a, b);
        return (
          <g key={`${idA}-${idB}`}>
            <path d={d} stroke="rgba(70,15,10,0.28)" strokeWidth={3.4} transform="translate(1.2 1.8)" pathLength={1} />
            <path d={d} stroke="#c22327" strokeWidth={1.7} pathLength={1} />
          </g>
        );
      })}

      {Object.entries(marcas).map(([id, punto]) => (
        <g key={id} transform={`translate(${punto.x} ${punto.y})`}>
          <circle r={4.4} cy={1.5} fill="rgba(0,0,0,0.3)" />
          <circle r={3.4} fill="url(#cabeza-chinche)" />
          <circle cx={-1.1} cy={-1.1} r={1.1} fill="rgba(255,255,255,0.85)" />
        </g>
      ))}
    </svg>
  );
};