import React, { useState } from 'react';
import { CanvasDesk } from './components/CanvasDesk';
import { AboutModal } from './components/modals/AboutModal';
import { ProjectModal } from './components/modals/ProjectModal';
import { ContactModal } from './components/modals/ContactModal';
import { PressKitModal } from './components/modals/PressKitModal';
import { NotaPersonalModal } from './components/modals/NotaPersonalModal';
import { ModalActivo } from './types';

export function App() {
  const [modalActivo, setModalActivo] = useState<ModalActivo>({ tipo: 'ninguno' });

  const abrirModal = (tipo: 'sobre-mi' | 'nota-sobre-mi' | 'proyecto' | 'contacto' | 'press-kit', idProyecto?: string) => {
    if (tipo === 'proyecto' && idProyecto) {
      setModalActivo({ tipo: 'proyecto', idProyecto });
    } else if (tipo === 'sobre-mi') {
      setModalActivo({ tipo: 'sobre-mi' });
    } else if (tipo === 'nota-sobre-mi') {
      setModalActivo({ tipo: 'nota-sobre-mi' });
    } else if (tipo === 'contacto') {
      setModalActivo({ tipo: 'contacto' });
    } else if (tipo === 'press-kit') {
      setModalActivo({ tipo: 'press-kit' });
    }
  };

  const cerrarModal = () => setModalActivo({ tipo: 'ninguno' });

  return (
    <main className="relative h-auto w-full overflow-x-hidden lg:h-[100dvh] lg:overflow-hidden">
      <CanvasDesk onOpenModal={abrirModal} />

      {/* Renderizado de Modales de Papel Físico */}
      {modalActivo.tipo === 'sobre-mi' && <AboutModal onClose={cerrarModal} />}
      {modalActivo.tipo === 'nota-sobre-mi' && <NotaPersonalModal onClose={cerrarModal} />}
      {modalActivo.tipo === 'proyecto' && <ProjectModal idProyecto={modalActivo.idProyecto} onClose={cerrarModal} />}
      {modalActivo.tipo === 'contacto' && <ContactModal onClose={cerrarModal} />}
      {modalActivo.tipo === 'press-kit' && <PressKitModal onClose={cerrarModal} />}
    </main>
  );
}

export default App;
