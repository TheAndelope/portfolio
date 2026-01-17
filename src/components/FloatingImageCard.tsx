import React from 'react';

interface FloatingImageCardProps {
  imageNumber: number;
  emoji: string;
  label: string;
  style: React.CSSProperties;
  onClose: () => void;
}

export const FloatingImageCard: React.FC<FloatingImageCardProps> = ({ 
  imageNumber, 
  emoji, 
  label, 
  style, 
  onClose 
}) => {
  return (
    <div 
      className="fixed xp-window overflow-hidden" 
      style={style}
    >
      <div className="xp-title-bar">
        <div className="text-white font-bold text-xs">Image {imageNumber}</div>
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
      <div className="xp-content w-full h-full flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-2">{emoji}</div>
          <div className="text-xs font-mono text-gray-600">{label}</div>
        </div>
      </div>
    </div>
  );
};