import React, { useState } from 'react';
import { ModalBase } from './ModalBase';
import { Send, CheckCircle } from 'lucide-react';
import { perfilPersonal } from '../../data/portfolioData';

interface ContactModalProps {
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ onClose }) => {
  const [enviado, setEnviado] = useState(false);
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnviado(true);
  };

  return (
    <ModalBase onClose={onClose} tituloHeader="Contacto Confidencial">
      <div className="space-y-6">
        {enviado ? (
          <div className="bg-emerald-100 border border-emerald-400 text-emerald-900 p-6 rounded text-center space-y-3">
            <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
            <h4 className="font-stencil text-xl font-bold">¡Mensaje Transmitido con Éxito!</h4>
            <p className="font-elite text-sm">
              Gracias por contactar con ADRIAN. He recibido tus coordenadas y me pondré en contacto contigo a la brevedad.
            </p>
            <button
              onClick={onClose}
              className="mt-4 bg-emerald-700 text-white font-stencil text-sm px-6 py-2 rounded hover:bg-emerald-800 transition-colors"
            >
              Volver al Tablón
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-stencil text-xs font-bold text-stone-800 uppercase mb-1">
                Correo Electrónico de Contacto:
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu.correo@ejemplo.com"
                className="w-full bg-stone-100 border border-stone-400 rounded p-3 font-elite text-sm text-stone-900 focus:outline-none focus:border-amber-800"
              />
            </div>

            <div>
              <label className="block font-stencil text-xs font-bold text-stone-800 uppercase mb-1">
                Mensaje o Propuesta:
              </label>
              <textarea
                required
                rows={4}
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                placeholder="Escribe aquí tu mensaje confidencial..."
                className="w-full bg-stone-100 border border-stone-400 rounded p-3 font-elite text-sm text-stone-900 focus:outline-none focus:border-amber-800 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-700 hover:bg-red-800 text-white font-stencil text-base py-3 rounded shadow flex items-center justify-center gap-2 transition-colors uppercase tracking-wider"
            >
              <Send className="w-5 h-5" />
              <span>Enviar Mensaje a ADRIAN</span>
            </button>
          </form>
        )}

        <div className="border-t border-stone-300 pt-4 text-center">
          <p className="font-elite text-xs text-stone-600">
            También puedes escribir directamente a mi correo oficial: <strong className="text-stone-900">{perfilPersonal.correo}</strong>
          </p>
        </div>
      </div>
    </ModalBase>
  );
};
