import React from 'react';
import { CRT_ENABLED } from './constantes';

export const Crtoverlay: React.FC = () => {
  if (!CRT_ENABLED) return null;

  return <div className="crt-overlay" aria-hidden="true" />;
};