import React from 'react';

interface DeskBackgroundProps {
  children: React.ReactNode;
}

export const DeskBackground: React.FC<DeskBackgroundProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full wood-desk-background flex flex-col items-center justify-center p-4 sm:p-8 select-none">
      {/* Halo de luz cálida superior simulando lámpara de escritorio */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90%] sm:w-[70%] h-[350px] bg-amber-200/10 blur-[100px] pointer-events-none rounded-full" />
      
      {/* Contenido principal */}
      <div className="relative z-10 w-full max-w-7xl flex flex-col items-center">
        {children}
      </div>
    </div>
  );
};
