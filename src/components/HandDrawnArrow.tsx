import React from 'react';

interface HandDrawnArrowProps {
  className?: string;
  rotation?: string;
  direction?: 'down' | 'right' | 'left' | 'up';
}

export const HandDrawnArrow: React.FC<HandDrawnArrowProps> = ({
  className = '',
  rotation = 'rotate-0',
  direction = 'down'
}) => {
  return (
    <div className={`pointer-events-none select-none ${rotation} ${className}`}>
      <svg
        width="80"
        height="80"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-amber-950/80 drop-shadow-sm filter blur-[0.2px]"
      >
        <path
          d="M20 20 Q 50 60, 80 50 M 65 35 Q 75 48, 82 52 M 70 65 Q 78 55, 82 52"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
