import React, { useState, useEffect, useCallback } from 'react';
import { Window } from 'react-windows-xp';
import { useDraggable } from '../hooks/useDraggable';
import { useWindowBounds } from '../hooks/useWindowBounds';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
  zIndex?: number;
  onFocus?: () => void;
}

const RESIZE_HANDLES: { dir: string; style: React.CSSProperties }[] = [
  { dir: 'n',  style: { top: -3, left: 8, right: 8, height: 6, cursor: 'n-resize' } },
  { dir: 'ne', style: { top: -3, right: -3, width: 8, height: 8, cursor: 'ne-resize' } },
  { dir: 'e',  style: { top: 8, right: -3, bottom: 8, width: 6, cursor: 'e-resize' } },
  { dir: 'se', style: { bottom: -3, right: -3, width: 8, height: 8, cursor: 'se-resize' } },
  { dir: 's',  style: { bottom: -3, left: 8, right: 8, height: 6, cursor: 's-resize' } },
  { dir: 'sw', style: { bottom: -3, left: -3, width: 8, height: 8, cursor: 'sw-resize' } },
  { dir: 'w',  style: { top: 8, left: -3, bottom: 8, width: 6, cursor: 'w-resize' } },
  { dir: 'nw', style: { top: -3, left: -3, width: 8, height: 8, cursor: 'nw-resize' } },
];

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, zIndex, onFocus }) => {
  // Mirror XPWindow: useDraggable disabled (no-match), useWindowBounds handles drag+resize
  const [wrapperRef] = useDraggable<HTMLDivElement>({ handleSelector: '__no_match__' });

  const { bounds, isDragging, startResize } = useWindowBounds(
    wrapperRef as React.RefObject<HTMLElement | null>,
    true,
    420,
    300,
  );

  // Open animation — same as XPWindow
  const [isAnimatingIn, setIsAnimatingIn] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setIsAnimatingIn(false), 220);
    return () => clearTimeout(t);
  }, []);

  // Close animation — same as XPWindow
  const [isClosing, setIsClosing] = useState(false);
  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => onClose(), 170);
  }, [onClose]);

  const activeResizable = !!bounds;
  const wrapperClassName = activeResizable ? 'xp-resizable-active' : '';

  const getWrapperStyle = (): React.CSSProperties => {
    if (activeResizable) {
      return {
        position: 'fixed',
        left: bounds!.left,
        top: bounds!.top,
        width: bounds!.width,
        height: bounds!.height,
        zIndex: zIndex ?? 70,
        cursor: isDragging ? 'grabbing' : 'default',
        ...(isClosing ? { animation: 'windowClose 0.17s ease-in forwards' } : {}),
      };
    }
    const base: React.CSSProperties = {
      position: 'fixed',
      left: 'calc(50vw - 450px)',
      top: 'calc(50vh - 320px)',
      width: 900,
      zIndex: zIndex ?? 70,
      cursor: isDragging ? 'grabbing' : 'default',
    };
    if (isClosing) return { ...base, animation: 'windowClose 0.17s ease-in forwards' };
    if (isAnimatingIn) return { ...base, animation: 'windowOpen 0.22s ease-out forwards' };
    return base;
  };

  return (
    <div
      ref={wrapperRef}
      className={wrapperClassName}
      style={getWrapperStyle()}
      onMouseDownCapture={() => onFocus?.()}
    >
      <Window
        title={project.title}
        showClose
        onClose={handleClose}
        style={{ width: '100%', height: '100%', boxSizing: 'border-box' }}
      >
        <div
          style={
            activeResizable
              ? { padding: 8, flex: 1, minHeight: 0, overflowY: 'auto', boxSizing: 'border-box' }
              : { padding: 8, overflowY: 'auto', maxHeight: 660 }
          }
        >
          {/* Preview area */}
          <div
            style={{
              width: '100%',
              height: 380,
              background: '#000',
              border: '1px solid #7f9db9',
              marginBottom: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              flexShrink: 0,
            }}
          >
            {project.videoUrl || project.video ? (
              <video
                src={project.videoUrl || project.video}
                autoPlay
                muted
                loop
                playsInline
                controls
                style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
              />
            ) : project.image ? (
              <img
                src={project.image}
                alt={project.title}
                style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
              />
            ) : (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 64, marginBottom: 8 }}>🎨</div>
                <div style={{ fontSize: 11, fontFamily: "'Pixelated MS Sans Serif', Arial", color: '#666' }}>
                  No Preview Available
                </div>
              </div>
            )}
          </div>

          <div>
            <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 3, color: '#222' }}>
              {project.title}
            </h3>
            <p style={{ fontSize: 13, color: '#888', marginBottom: 10, fontFamily: "'Pixelated MS Sans Serif', Arial", fontStyle: 'italic' }}>
              {project.tagline}
            </p>
            {(project.description || project.tagline) && (
              <p style={{ fontSize: 13, color: '#444', marginBottom: 12, fontFamily: "'Pixelated MS Sans Serif', Arial" }}>
                {project.description ?? project.tagline}
              </p>
            )}

            {project.technologies && (
              <div style={{ marginBottom: 14 }}>
                <strong style={{ fontSize: 13, fontFamily: "'Pixelated MS Sans Serif', Arial" }}>
                  Technologies:
                </strong>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 6 }}>
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: 12,
                        padding: '3px 8px',
                        background: '#dbeafe',
                        border: '1px solid #93c5fd',
                        color: '#1e40af',
                        fontFamily: "'Pixelated MS Sans Serif', Arial",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {project.link && (
              <div style={{ paddingTop: 8 }}>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#0000ff', fontSize: 13, fontFamily: "'Pixelated MS Sans Serif', Arial" }}
                >
                  Visit Project →
                </a>
              </div>
            )}
          </div>
        </div>
      </Window>

      {RESIZE_HANDLES.map(({ dir, style: handleStyle }) => (
        <div
          key={dir}
          style={{ position: 'absolute', zIndex: 1, background: 'transparent', ...handleStyle }}
          onMouseDown={e => startResize(e, dir)}
        />
      ))}
    </div>
  );
};
