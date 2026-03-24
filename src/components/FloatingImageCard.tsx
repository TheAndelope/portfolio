import React from 'react';
import { XPWindow } from './XPWindow';

interface FloatingImageCardProps {
  imageNumber: number;
  label: string;
  style: React.CSSProperties;
  onClose: () => void;
  onFocus?: () => void;
}

export const FloatingImageCard: React.FC<FloatingImageCardProps> = ({
  imageNumber,
  label,
  style,
  onClose,
  onFocus,
}) => {
  return (
    <XPWindow
      title={`Image ${imageNumber}`}
      onClose={onClose}
      skipOpenAnimation
      resizable
      icon="photo.ico"
      className="fixed floating-card"
      style={style}
      bodyStyle={{ padding: 0 }}
      onMouseDown={onFocus}
    >
      <img
        src={`/images/${imageNumber}.jpg`}
        alt={label}
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />
      {label && (
        <div style={{ padding: '4px 8px', fontSize: '11px', fontFamily: 'Tahoma, Arial, sans-serif' }}>
          {label}
        </div>
      )}
    </XPWindow>
  );
};