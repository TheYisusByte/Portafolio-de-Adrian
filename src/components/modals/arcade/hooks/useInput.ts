import { useEffect } from 'react';

interface OpcionesEntrada {
  iniciar: () => void;
  finalizar: () => void;
}

export function useInput({ iniciar, finalizar }: OpcionesEntrada) {
  useEffect(() => {
    const alPresionarTecla = (evento: KeyboardEvent) => {
      if (evento.code === 'Space') {
        evento.preventDefault();
        iniciar();
      }
    };
    const alSoltarTecla = (evento: KeyboardEvent) => {
      if (evento.code === 'Space') {
        evento.preventDefault();
        finalizar();
      }
    };
    const alSoltarPuntero = () => finalizar();
    const alCancelarPuntero = () => finalizar();

    window.addEventListener('keydown', alPresionarTecla);
    window.addEventListener('keyup', alSoltarTecla);
    window.addEventListener('pointerup', alSoltarPuntero);
    window.addEventListener('pointercancel', alCancelarPuntero);

    return () => {
      window.removeEventListener('keydown', alPresionarTecla);
      window.removeEventListener('keyup', alSoltarTecla);
      window.removeEventListener('pointerup', alSoltarPuntero);
      window.removeEventListener('pointercancel', alCancelarPuntero);
    };
  }, [iniciar, finalizar]);
}