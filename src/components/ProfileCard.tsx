import React, { useState, useRef } from 'react';
import { XPWindow } from './XPWindow';

interface ProfileCardProps {
  onFocus?: () => void;
  zIndex?: number;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ onFocus, zIndex }) => {
  const [instanceKey, setInstanceKey] = useState(0);
  const dragStart = useRef({ x: 0, y: 0 });
  const didDrag = useRef(false);

  return (
    <XPWindow
      key={instanceKey}
      title="profile"
      onClose={() => setInstanceKey(k => k + 1)}
      icon="profile.ico"
      className="fixed profile-card"
      style={{ top: 0, left: 0, zIndex: zIndex ?? 10, width: 240 }}
      bodyStyle={{ padding: '8px 12px' }}
      onMouseDown={onFocus}
    >
      <div
        style={{ textAlign: 'center', cursor: 'pointer' }}
        onMouseDown={e => { didDrag.current = false; dragStart.current = { x: e.clientX, y: e.clientY }; }}
        onMouseMove={e => {
          const dx = e.clientX - dragStart.current.x;
          const dy = e.clientY - dragStart.current.y;
          if (dx * dx + dy * dy > 25) didDrag.current = true;
        }}
        onClick={() => { if (!didDrag.current) window.location.href = 'https://andyduong.dev'; }}
      >
        <h2 style={{ fontSize: 24, fontWeight: 700, margin: '0 0 8px', color: '#222' }}>
          Andy Duong
        </h2>
        <a
          href="https://uwaterloo.ca"
          target="_blank"
          rel="noopener noreferrer"
          className="xp-toolbar-btn"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6, textDecoration: 'none' }}
        >
          <img src="/images/uw.avif" alt="UW" style={{ width: 16, height: 16, objectFit: 'contain', flexShrink: 0 }} />
          <span style={{ fontSize: 13, color: '#222' }}>uwaterloo mathematics</span>
        </a>
      </div>
    </XPWindow>
  );
};