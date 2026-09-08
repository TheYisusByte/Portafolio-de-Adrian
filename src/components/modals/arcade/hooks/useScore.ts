import { useCallback, useEffect, useState } from 'react';
import { CLAVE_MEJOR_PUNTUACION, COMBO_MAXIMO, TABLA_PUNTOS } from '../constantes';
import type { ResultadoRegistro, ZonaImpacto } from '../types';

function leerMejorPuntuacion(): number {
  try {
    const crudo = window.localStorage.getItem(CLAVE_MEJOR_PUNTUACION);
    const valor = Number.parseInt(crudo ?? '', 10);
    return Number.isFinite(valor) && valor > 0 ? valor : 0;
  } catch {
    return 0;
  }
}

export function useScore() {
  const [puntuacion, setPuntuacion] = useState(0);
  const [mejorPuntuacion, setMejorPuntuacion] = useState(leerMejorPuntuacion);
  const [combo, setCombo] = useState(0);
  const [disparos, setDisparos] = useState(0);
  const [aciertos, setAciertos] = useState(0);

  useEffect(() => {
    if (puntuacion > mejorPuntuacion) {
      setMejorPuntuacion(puntuacion);
      try {
        window.localStorage.setItem(CLAVE_MEJOR_PUNTUACION, String(puntuacion));
      } catch {
        // almacenamiento no disponible: la mejor puntuación solo vive en memoria
      }
    }
  }, [puntuacion, mejorPuntuacion]);

  const registrarImpacto = useCallback(
    (zona: Exclude<ZonaImpacto, 'fallo'>): ResultadoRegistro => {
      const comboNuevo = Math.min(combo + 1, COMBO_MAXIMO);
      const puntos = TABLA_PUNTOS[zona] * comboNuevo;
      setCombo(comboNuevo);
      setPuntuacion((previo) => previo + puntos);
      setDisparos((previo) => previo + 1);
      setAciertos((previo) => previo + 1);
      return { puntos, combo: comboNuevo };
    },
    [combo]
  );

  const registrarFallo = useCallback(() => {
    setCombo(0);
    setDisparos((previo) => previo + 1);
  }, []);

  const reiniciar = useCallback(() => {
    setPuntuacion(0);
    setCombo(0);
    setDisparos(0);
    setAciertos(0);
  }, []);

  const precision = disparos > 0 ? Math.round((aciertos / disparos) * 100) : 0;

  return {
    puntuacion,
    mejorPuntuacion,
    combo,
    disparos,
    aciertos,
    precision,
    registrarImpacto,
    registrarFallo,
    reiniciar,
  };
}