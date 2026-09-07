import React from 'react';

interface PinnedItemProps {
  children: React.ReactNode;
  className?: string;
  rotation?: string; // ej. 'rotate-2', '-rotate-3'
  onClick?: () => void;
  pinColor?: string;
  showPin?: boolean;
}

export const PinnedItem: React.FC<PinnedItemProps> = ({
  children,
  className = '',
  rotation = 'rotate-0',
  onClick,
  showPin = true
}) => {
  return (
    <div
      onClick={onClick}
      className={`relative transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl cursor-pointer ${rotation} ${className}`}
    >
      {showPin && <div className="push-pin" />}
      {children}
    </div>
  );
};
