import React from 'react';
import { useDraggable } from '../hooks/useDraggable';

interface XPWindowProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export const XPWindow: React.FC<XPWindowProps> = ({ 
  title, 
  children, 
  onClose, 
  className = '', 
  style 
}) => {
  const [windowRef, isDragging] = useDraggable<HTMLDivElement>({ 
    handleSelector: '.xp-title-bar' 
  });

  return (
    <div 
      ref={windowRef} 
      className={`xp-window ${className}`} 
      style={{ ...style, cursor: isDragging ? 'grabbing' : 'default' }}
    >
      <div className="xp-title-bar cursor-grab active:cursor-grabbing">
        <div className="text-white font-bold text-sm flex items-center gap-2">
          {title}
        </div>
        <button 
          className="xp-close-button" 
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          ✕
        </button>
      </div>
      <div className="xp-content">
        {children}
      </div>
    </div>
  );
};