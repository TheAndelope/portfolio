import React from 'react';
import { XPWindow } from './XPWindow';

interface FloatingImageCardProps {
  src: string;
  title: string;
  caption?: string;
  style: React.CSSProperties;
  onClose: () => void;
  onFocus?: () => void;
}

export const FloatingImageCard: React.FC<FloatingImageCardProps> = ({
  src,
  title,
  caption,
  style,
  onClose,
  onFocus,
}) => {
  return (
    <XPWindow
      title={title}
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
        src={src}
        alt={title}
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />
      {caption && (
        <div style={{ padding: '4px 8px', fontSize: '11px', fontFamily: 'Tahoma, Arial, sans-serif' }}>
          {caption}
        </div>
      )}
    </XPWindow>
  );
};
