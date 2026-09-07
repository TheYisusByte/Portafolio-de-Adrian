import React from 'react';

interface MapaContactoProps {
  onClick: () => void;
  className?: string;
}

export const MapaContacto: React.FC<MapaContactoProps> = ({ onClick, className = '' }) => {
  return (
    <div
      onClick={onClick}
      className={`group relative flex flex-col items-center select-none ${className}`}
      title="Contacto Confidencial"
    >

      {/* Cintas de papel que fijan el mapa al corcho */}
      <div className="absolute -top-1.5 left-4 z-30 w-8 h-3 -rotate-[18deg] bg-[rgba(255,236,189,0.55)] border border-stone-300/40 shadow-sm" />
      <div className="absolute -top-1.5 right-6 z-30 w-8 h-3 rotate-[16deg] bg-[rgba(255,236,189,0.55)] border border-stone-300/40 shadow-sm" />
      <div className="absolute -bottom-1 left-6 z-30 w-7 h-3 rotate-12 bg-[rgba(255,236,189,0.55)] border border-stone-300/40 shadow-sm" />
      <div className="absolute -bottom-1 right-5 z-30 w-7 h-3 -rotate-[10deg] bg-[rgba(255,236,189,0.55)] border border-stone-300/40 shadow-sm" />

      {/* Lámina impresa estilo mapa */}
      <div
        className="relative w-44 sm:w-56 aspect-[11/9] rotate-1 rounded-md border border-stone-500/70 overflow-hidden group-hover:rotate-0 group-hover:scale-[1.02] transition-transform duration-300 cursor-pointer"
        style={{
          backgroundImage: 'linear-gradient(160deg, rgba(255,252,240,0.6), rgba(214,190,140,0.35))',
          boxShadow: '0 12px 24px rgba(0,0,0,0.55), inset 0 0 22px rgba(60,35,10,0.35)',
        }}
      >
        {/* Cartografía estilo Google Maps */}
        <svg className="absolute inset-0 w-full h-full font-elite" viewBox="0 0 220 180" fill="none">
          {/* Terreno base */}
          <rect width="220" height="180" fill="#f0ebe0" />

          {/* Ríos y lago */}
          <path
            d="M-10 20 C 20 18, 34 52, 42 70 C 52 92, 50 118, 60 140 C 66 154, 66 170, 64 192"
            stroke="#a8cede"
            strokeWidth="11"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M-10 20 C 20 18, 34 52, 42 70 C 52 92, 50 118, 60 140 C 66 154, 66 170, 64 192"
            stroke="#bcdbea"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
          <ellipse cx="192" cy="150" rx="17" ry="12" fill="#a8cede" />
          <ellipse cx="192" cy="150" rx="10" ry="7" fill="#c0dcec" />

          {/* Espacios entre calles */}
          <g fill="#ece2cf" opacity="0.75">
            <rect x="33" y="50" width="25" height="8" rx="1" />
            <rect x="33" y="62" width="25" height="24" rx="1" />
            <rect x="64" y="51" width="52" height="7" rx="1" />
            <rect x="124" y="50" width="47" height="8" rx="1" />
            <rect x="64" y="92" width="52" height="28" rx="1" />
            <rect x="124" y="92" width="47" height="28" rx="1" />
            <rect x="64" y="124" width="52" height="16" rx="1" />
            <rect x="124" y="124" width="47" height="16" rx="1" />
            <rect x="33" y="92" width="25" height="14" rx="1" />
            <rect x="33" y="124" width="25" height="14" rx="1" />
          </g>

          {/* Parque */}
          <g>
            <rect x="170" y="12" width="40" height="34" rx="5" fill="#cfe2b8" />
            <path d="M176 44 C 181 38, 184 30, 178 24" stroke="#e6d3ab" strokeWidth="1.6" fill="none" />
            <path d="M192 44 C 196 36, 198 28, 193 21" stroke="#e6d3ab" strokeWidth="1.6" fill="none" />
            <circle cx="182" cy="18" r="2.4" fill="#82a868" />
            <circle cx="190" cy="24" r="2" fill="#8fb270" />
            <circle cx="177" cy="30" r="2.2" fill="#86a965" />
            <circle cx="205" cy="20" r="2.4" fill="#82a868" />
            <circle cx="199" cy="33" r="2.2" fill="#86a965" />
          </g>

          {/* Calles: calzada (casing) */}
          <g stroke="#e2d9c8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M120 -10 L120 190" strokeWidth="17" />
            <path d="M-10 88 L235 88" strokeWidth="13.5" />
            <path d="M64 18 L64 182" strokeWidth="9" />
            <path d="M176 48 L176 126" strokeWidth="8" />
            <path d="M24 42 L24 96" strokeWidth="7" />
            <path d="M20 48 L66 48" strokeWidth="7" />
            <path d="M88 62 L158 62" strokeWidth="7" />
            <path d="M20 122 L166 122" strokeWidth="7" />
            <path d="M-4 148 L214 148" strokeWidth="7" />
          </g>

          {/* Calles: pavimento */}
          <g strokeLinecap="round" strokeLinejoin="round">
            <path d="M120 -10 L120 190" stroke="#f8b25d" strokeWidth="14" />
            <path d="M120 -10 L120 190" stroke="#fccb83" strokeWidth="5" />
            <path d="M-10 88 L235 88" stroke="#fde293" strokeWidth="11" />
            <path d="M-10 88 L235 88" stroke="#fdf3c2" strokeWidth="3.5" />
            <path d="M64 18 L64 182" stroke="#ffffff" strokeWidth="6.5" />
            <path d="M176 48 L176 126" stroke="#ffffff" strokeWidth="5.5" />
            <path d="M24 42 L24 96" stroke="#ffffff" strokeWidth="4.5" />
            <path d="M20 48 L66 48" stroke="#ffffff" strokeWidth="4.5" />
            <path d="M88 62 L158 62" stroke="#ffffff" strokeWidth="4.5" />
            <path d="M20 122 L166 122" stroke="#ffffff" strokeWidth="4.5" />
            <path d="M-4 148 L214 148" stroke="#ffffff" strokeWidth="4.5" />
            <path d="M64 176 C 82 182, 96 178, 104 172" stroke="#ffffff" strokeWidth="3" />
          </g>

          {/* Puente sobre el río */}
          <g strokeLinecap="round">
            <path d="M20 48 L66 48" stroke="#e2d9c8" strokeWidth="8.5" />
            <path d="M20 48 L66 48" stroke="#ffffff" strokeWidth="5" />
          </g>

          {/* Tráfico activo (toques rojos) */}
          <g stroke="#e5434a" strokeLinecap="round" opacity="0.85">
            <path d="M120 58 L120 78" strokeWidth="3" />
            <path d="M120 96 L120 116" strokeWidth="3" />
            <path d="M58 88 L84 88" strokeWidth="3" />
            <path d="M176 62 L176 90" strokeWidth="2" strokeOpacity="0.8" />
          </g>

          {/* Marcador de entorno de la sede */}
          <circle cx="150" cy="86" r="11" fill="rgba(66,133,244,0.14)" stroke="rgba(66,133,244,0.45)" strokeWidth="1" />

          {/* Nombres de calles */}
          <g fill="#8a816f" fontSize="4.6">
            <text x="120" y="40" textAnchor="middle" transform="rotate(-90 120 40)" stroke="#f0ebe0" strokeWidth="2.6" paintOrder="stroke">AVENIDA PRINCIPAL</text>
            <text x="82" y="72" textAnchor="middle" transform="rotate(16 82 72)" stroke="#f0ebe0" strokeWidth="2.6" paintOrder="stroke">Calle Confidencial</text>
            <text x="66" y="36" stroke="#f0ebe0" strokeWidth="2.4" paintOrder="stroke">Calle Silencio</text>
            <text x="150" y="90" textAnchor="middle" stroke="#f0ebe0" strokeWidth="2.4" paintOrder="stroke">Calle Adrian · 42</text>
            <text x="102" y="6" textAnchor="middle" stroke="#f0ebe0" strokeWidth="2.4" paintOrder="stroke">Bulevar del Archivo</text>
            <text x="205" y="104" textAnchor="middle" transform="rotate(-90 205 104)" stroke="#f0ebe0" strokeWidth="2.4" paintOrder="stroke">Paseo de la Baquelita</text>
            <text x="150" y="140" textAnchor="middle" stroke="#f0ebe0" strokeWidth="2.4" paintOrder="stroke">Avenida del Expediente</text>
          </g>

          {/* Toponimia de agua y parque */}
          <text x="30" y="112" fill="#5b8aa8" fontSize="4.4" transform="rotate(62 30 112)" stroke="#f0ebe0" strokeWidth="2.4" paintOrder="stroke">RÍO DEL ESPÍRITU</text>
          <text x="189" y="160" textAnchor="middle" fill="#5b8aa8" fontSize="4" stroke="#f0ebe0" strokeWidth="2.2" paintOrder="stroke">Lago del Archivo</text>
          <text x="190" y="10" textAnchor="middle" fill="#5c8246" fontSize="4.6" stroke="#f0ebe0" strokeWidth="2.4" paintOrder="stroke">Parque Elemental</text>

          {/* Barra de búsqueda */}
          <g>
            <rect x="8" y="8" width="72" height="11" rx="5.5" fill="rgba(255,255,255,0.92)" stroke="#d8d2c4" strokeWidth="1" />
            <circle cx="16" cy="13.5" r="3" fill="none" stroke="#9aa0a6" strokeWidth="1" />
            <path d="M18 15.4 L20.5 17.8" stroke="#9aa0a6" strokeWidth="1" strokeLinecap="round" />
            <text x="24" y="15.6" fill="#8a8276" fontSize="4.6">Buscar en la zona...</text>
          </g>

          {/* Brújula */}
          <g>
            <circle cx="204" cy="14" r="9" fill="rgba(255,255,255,0.92)" stroke="#d8d2c4" strokeWidth="1" />
            <path d="M204 8.5 L207 13.8 L204 12.6 L201 13.8 Z" fill="#e5434a" />
            <path d="M204 19.5 L207 14.2 L204 15.4 L201 14.2 Z" fill="#9aa0a6" />
            <text x="204" y="16.4" textAnchor="middle" fill="#3c4043" fontSize="3.6" className="font-stencil">N</text>
          </g>

          {/* Capas */}
          <g>
            <rect x="2" y="168" width="44" height="9" rx="4.5" fill="rgba(255,255,255,0.92)" stroke="#d8d2c4" strokeWidth="1" />
            <text x="12" y="174.2" textAnchor="middle" fill="#3c4043" fontSize="4.6" className="font-stencil">Mapa</text>
            <text x="25" y="174.2" textAnchor="middle" fill="#8a8276" fontSize="4.4">Tráfico</text>
            <text x="39" y="174.2" textAnchor="middle" fill="#8a8276" fontSize="4.4">Relieve</text>
          </g>

          {/* Escala */}
          <g>
            <rect x="168" y="165" width="26" height="8" rx="4" fill="rgba(255,255,255,0.9)" stroke="#d8d2c4" strokeWidth="0.8" />
            <rect x="172" y="168.6" width="8" height="1.6" fill="#3c4043" />
            <rect x="180" y="168.6" width="8" height="1.6" fill="#3c4043" stroke="#fff" strokeWidth="0.4" />
            <path d="M172 168.6 L172 170.6 M188 168.6 L188 170.6" stroke="#3c4043" strokeWidth="0.6" />
            <text x="181" y="171.6" textAnchor="middle" fill="#70757a" fontSize="3.4">50 m</text>
          </g>
        </svg>

        {/* Mancha de café */}
        <div className="absolute left-2 top-12 w-14 h-14 rounded-full pointer-events-none z-10 opacity-80"
          style={{ backgroundImage: 'radial-gradient(circle at 42% 46%, rgba(100,60,20,0.30) 0%, rgba(100,60,20,0.12) 48%, transparent 58%)' }} />
        <div className="absolute left-2.5 top-[3.15rem] w-12 h-12 rounded-full pointer-events-none z-10 opacity-80"
          style={{ backgroundImage: 'radial-gradient(circle at 40% 45%, rgba(70,40,15,0.32) 0%, rgba(70,40,15,0.08) 60%, transparent 68%)' }} />

        {/* Ubicación: chinche con insignia ADRIAN */}
        <div className="absolute left-[68.2%] top-[47.8%] -translate-x-1/2 -translate-y-full z-20 pointer-events-none group-hover:-translate-y-[calc(100%+3px)] transition-transform duration-300">
          <svg className="w-6 h-8 drop-shadow-[0_2px_3px_rgba(0,0,0,0.65)]" viewBox="0 0 24 32">
            <path d="M12 0 C5 0 0 5.5 0 12 C0 21 12 32 12 32 C12 32 24 21 24 12 C24 5.5 19 0 12 0 Z" fill="#dc2626" stroke="#7f1d1d" strokeWidth="1.5" />
            <circle cx="12" cy="12" r="4.8" fill="#fef3c7" stroke="#7f1d1d" strokeWidth="1" />
          </svg>
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-stencil text-[8px] leading-none text-[#7f1d1d] pointer-events-none">
            A
          </span>
          <span className="absolute left-1/2 -translate-x-1/2 top-full -mt-0.5 pointer-events-none">
            <span className="block w-4 h-4 rounded-full bg-red-600/40 animate-ping" />
          </span>
        </div>

        {/* Sello de recepción */}
        <div className="absolute -rotate-12 left-1 bottom-10 w-12 h-12 rounded-full border-2 border-red-800/70 flex flex-col items-center justify-center pointer-events-none z-10 opacity-80">
          <span className="font-stencil text-[7px] leading-none text-red-800 tracking-[0.2em]">SEDE</span>
          <span className="font-stencil text-[7px] leading-none text-red-800 tracking-[0.1em] mt-0.5">RECIBIDO</span>
          <span className="font-stencil text-[6px] leading-none text-red-800/80 mt-0.5">09·2026</span>
        </div>
      </div>
    </div>
  );
};