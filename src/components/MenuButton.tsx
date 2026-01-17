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

export const MenuButton: React.FC<MenuButtonProps> = ({ 
  item, 
  isHovered, 
  onHover, 
  onLeave, 
  onClick 
}) => {
  return (
    <button
      onClick={onClick}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="text-left p-6 font-mono text-sm transition-all duration-200 border-2 border-gray-400 hover:bg-blue-50 bg-white shadow-lg hover:shadow-xl"
      style={{ 
        boxShadow: 'inset -1px -1px 0px rgba(0,0,0,0.1), inset 1px 1px 0px rgba(255,255,255,0.8), 2px 2px 4px rgba(0,0,0,0.2)'
      }}
    >
      <span className="text-2xl mr-3 text-blue-600">{item.icon}</span>
      <span className="text-lg font-bold text-gray-800">{item.label}</span>
      {isHovered && (
        <span className="ml-2 text-xs text-gray-500">click to view</span>
      )}
    </button>
  );
};