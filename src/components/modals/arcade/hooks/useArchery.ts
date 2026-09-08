import { useCallback, useEffect, useRef, useState } from 'react';
import { useGameState } from './useGameState';
import { useScore } from './useScore';
import { useParticles } from './useParticles';
import {
  COLOR_ZONA,
  E,
  ETIQUETA_ZONA,
  FLECHAS_POR_RONDA,
  POTENCIA_OPTIMA,
  RADIO_MAX_DIANA,
  calcularZona,
} from '../constantes';
import type { EstadoJuego, MensajeJuego } from '../types';

export function useArchery() {
  const { motorRef, reiniciarMotor } = useGameState();
  const { emitirAstillas, emitirEstrellas, emitirAscuas, emitirChispasDisparo } = useParticles(motorRef);

  const [flechas, setFlechas] = useState(FLECHAS_POR_RONDA);
  const [fase, setFase] = useState<EstadoJuego>('listo');
  const [mensaje, setMensaje] = useState<MensajeJuego | null>({ id: 0, texto: 'READY!', color: '#fde047' });

  const score = useScore();
  const { registrarImpacto, registrarFallo, reiniciar: reiniciarPuntuacion } = score;

  const poderBarRef = useRef<HTMLDivElement>(null);
  const poderMeterRef = useRef<HTMLDivElement>(null);

  const flechasRef = useRef(flechas);
  flechasRef.current = flechas;
  const comboRef = useRef(score.combo);
  comboRef.current = score.combo;
  const contadorMensaje = useRef(1);
  const tiempos = useRef<number[]>([]);

  const emisoresRef = useRef({ emitirAstillas, emitirEstrellas, emitirAscuas });
  emisoresRef.current = { emitirAstillas, emitirEstrellas, emitirAscuas };

  const limpiarTiempos = useCallback(() => {
    tiempos.current.forEach((tiempo) => window.clearTimeout(tiempo));
    tiempos.current = [];
  }, []);

  const transicion = useCallback((nuevaFase: EstadoJuego) => {
    motorRef.current.fase = nuevaFase;
    setFase(nuevaFase);
  }, [motorRef]);

  useEffect(() => () => limpiarTiempos(), [limpiarTiempos]);

  const iniciarCarga = useCallback(() => {
    const motor = motorRef.current;
    if (motor.fase === 'fin' || motor.fase === 'cargando' || motor.fase === 'disparando' || motor.volando) return;
    if (flechasRef.current <= 0) return;

    transicion('cargando');
    motor.poder = 0;
    motor.dirPoder = 1;
    motor.animArquero = 'tensando';
    setMensaje(null);
  }, [motorRef, transicion]);

  const finalizarCarga = useCallback(() => {
    const motor = motorRef.current;
    if (motor.fase !== 'cargando') return;

    const poder = motor.poder;
    const zona = calcularZona(poder);

    // Destino del impacto basado en la potencia (sweet spot en POTENCIA_OPTIMA)
    const delta = Math.abs(poder - POTENCIA_OPTIMA);
    const radio = (delta / 50) * RADIO_MAX_DIANA;
    const angulo = Math.random() * Math.PI * 2;
    const magnitud = zona === 'fallo' ? radio : radio * 0.75;

    transicion('disparando');
    motor.animArquero = 'disparo';
    motor.temporizadorAnim = 12;
    motor.flash = 8;
    motor.sacudida = 4;
    motor.zonaActual = zona;
    motor.puntosUltimos = 0;
    motor.origenX = E.origenX;
    motor.origenY = E.origenY;
    motor.destinoX = E.dianaX + Math.cos(angulo) * magnitud;
    motor.destinoY = E.dianaY + Math.sin(angulo) * magnitud * 0.85 + (Math.random() - 0.5) * 4;
    motor.volando = true;
    motor.progreso = 0;
    motor.estela = [];

    emitirChispasDisparo(E.origenX + 12, E.origenY);

    const idFire = contadorMensaje.current++;
    setMensaje({ id: idFire, texto: 'FIRE!', color: '#fbbf24' });

    const comboAnterior = comboRef.current;
    let mensajeZona: MensajeJuego;

    if (zona === 'fallo') {
      registrarFallo();
      mensajeZona = {
        id: contadorMensaje.current++,
        texto: comboAnterior >= 2 ? 'COMBO BREAK' : 'MISS!',
        color: '#f87171',
      };
    } else {
      const resultado = registrarImpacto(zona);
      motor.puntosUltimos = resultado.puntos;
      mensajeZona = {
        id: contadorMensaje.current++,
        texto: ETIQUETA_ZONA[zona],
        color: COLOR_ZONA[zona],
        puntos: resultado.puntos,
        sub: resultado.combo >= 2 ? `COMBO x${resultado.combo}` : undefined,
      };
    }

    const idZona = window.setTimeout(() => setMensaje(mensajeZona), 320);
    const idDespejar = window.setTimeout(() => setMensaje(null), 1500);

    // Continúa la ronda o termina el juego tras la trayectoria
    const idContinuar = window.setTimeout(() => {
      const restantes = flechasRef.current - 1;
      flechasRef.current = restantes;
      setFlechas(restantes);

if (poderBarRef.current) poderBarRef.current.style.height = '0%';
      if (poderMeterRef.current) poderMeterRef.current.style.width = '0%';

      if (restantes <= 0) {
        transicion('fin');
      } else {
        transicion('apuntando');
        motor.animArquero = 'idle';
      }
    }, 1100);

    tiempos.current.push(idZona, idDespejar, idContinuar);
  }, [motorRef, transicion, emitirChispasDisparo, registrarImpacto, registrarFallo]);

  const reiniciarRonda = useCallback(() => {
    limpiarTiempos();
    reiniciarMotor();
    reiniciarPuntuacion();
    flechasRef.current = FLECHAS_POR_RONDA;
    setFlechas(FLECHAS_POR_RONDA);
    if (poderBarRef.current) poderBarRef.current.style.height = '0%';
    if (poderMeterRef.current) poderMeterRef.current.style.width = '0%';
    transicion('listo');
    setMensaje({ id: contadorMensaje.current++, texto: 'READY!', color: '#fde047' });
  }, [limpiarTiempos, reiniciarMotor, reiniciarPuntuacion, transicion]);

  const mostrarAyuda = fase === 'apuntando' && mensaje === null && flechas > 0;

  return {
    motorRef,
    emisoresRef,
    poderBarRef,
    poderMeterRef,
    score,
    flechas,
    fase,
    mensaje,
    mostrarAyuda,
    iniciarCarga,
    finalizarCarga,
    reiniciarRonda,
  };
}