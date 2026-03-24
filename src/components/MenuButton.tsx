import React from 'react';
import { MenuItem } from '../types';

interface MenuButtonProps {
  item: MenuItem;
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
}

/**
 * xp.css provides full button styling automatically — just use a plain <button>.
 * We add a hover effect via the data-hovered attribute to show the "click to view" hint.
 */
export const MenuButton: React.FC<MenuButtonProps> = ({
  item,
  isHovered,
  onHover,
  onLeave,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={{
        width: '100%',
        minHeight: 44,
        textAlign: 'left',
        padding: '6px 12px',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        fontFamily: 'Tahoma, Arial, sans-serif',
        fontSize: 14,
      }}
    >
      <span style={{ fontSize: 20 }}>{item.icon}</span>
      <span style={{ fontWeight: 700 }}>{item.label}</span>
      {isHovered && (
        <span style={{ marginLeft: 'auto', fontSize: 12, color: '#666' }}>click to view</span>
      )}
    </button>
  );
};