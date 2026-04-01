import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Window } from 'react-windows-xp';
import { Project } from '../types';
import { useWindowBounds } from '../hooks/useWindowBounds';

interface ProjectsWindowProps {
  projects: Project[];
  onClose: () => void;
  closeRequest?: number;
  onFocus?: () => void;
  zIndex?: number;
  onProjectClick?: (project: Project) => void;
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

const ProjectTile: React.FC<{ project: Project; onClick: () => void; onVideoLoad?: () => void }> = ({ project, onClick, onVideoLoad }) => {
  return (
    <div
      onClick={onClick}
      style={{
        position: 'relative',
        background: '#000',
        border: '2px solid #919b9c',
        boxShadow: 'inset -1px -1px #0a0a0a, inset 1px 1px #fff, inset -2px -2px grey, inset 2px 2px #dfdfdf',
        overflow: 'hidden',
        aspectRatio: '16 / 9',
        cursor: 'pointer',
      }}
    >
      {project.video ? (
        <video
          src={project.video}
          autoPlay
          muted
          loop
          playsInline
          onCanPlayThrough={onVideoLoad}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      ) : project.image ? (
        <img
          src={project.image}
          alt={project.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      ) : (
        <div
          style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ fontSize: 28, opacity: 0.3, color: '#fff' }}>▶</span>
        </div>
      )}

      {/* Title overlay — bottom-left */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '28px 9px 7px',
          background: 'linear-gradient(transparent, rgba(0,0,0,0.78))',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: '#fff',
            textShadow: '0 1px 3px rgba(0,0,0,0.9)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {project.title}
        </div>
        <div
          style={{
            fontSize: 12,
            color: 'rgba(255,255,255,0.6)',
            marginTop: 2,
            fontStyle: 'italic',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {project.tagline}
        </div>
        {project.technologies && project.technologies.length > 0 && (
          <div
            style={{
              fontSize: 11,
              color: 'rgba(255,255,255,0.7)',
              marginTop: 2,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {project.technologies.slice(0, 3).join(' · ')}
          </div>
        )}
      </div>

      {/* Link badge — top-right */}
      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: 'absolute',
            top: 5,
            right: 5,
            fontSize: 10,
            color: '#fff',
            background: 'rgba(0,0,0,0.55)',
            padding: '2px 5px',
            textDecoration: 'none',
            border: '1px solid rgba(255,255,255,0.25)',
          }}
          onClick={e => e.stopPropagation()}
        >
          ↗ view
        </a>
      )}
    </div>
  );
};

export const ProjectsWindow: React.FC<ProjectsWindowProps> = ({ projects, onClose, closeRequest, onFocus, zIndex, onProjectClick }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isMaximized, setIsMaximized] = useState(false);

  // Loading state: count how many videos have fired canPlayThrough
  const totalVideos = projects.filter(p => p.video).length;
  const [, setLoadedCount] = useState(0);
  const [isLoading, setIsLoading] = useState(totalVideos > 0);
  const loadedCountRef = useRef(0);

  useEffect(() => {
    if (totalVideos === 0) return;
    // Timeout fallback: hide spinner after 5s regardless
    const timeout = setTimeout(() => setIsLoading(false), 5000);
    return () => clearTimeout(timeout);
  }, [totalVideos]);

  const handleVideoLoad = useCallback(() => {
    loadedCountRef.current += 1;
    setLoadedCount(loadedCountRef.current);
    if (loadedCountRef.current >= totalVideos) {
      setIsLoading(false);
    }
  }, [totalVideos]);

  const { bounds, isDragging, startResize } = useWindowBounds(
    wrapperRef as React.RefObject<HTMLElement | null>,
    !isMaximized,
  );

  // Open animation
  const [isAnimatingIn, setIsAnimatingIn] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setIsAnimatingIn(false), 220);
    return () => clearTimeout(t);
  }, []);

  // Close animation: play out before firing onClose
  const [isClosing, setIsClosing] = useState(false);
  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => onClose(), 170);
  }, [onClose]);

  // External close trigger (keyboard X, etc.)
  useEffect(() => {
    if (closeRequest) handleClose();
  }, [closeRequest, handleClose]);

  const animStyle: React.CSSProperties = isClosing
    ? { animation: 'windowClose 0.17s ease-in forwards' }
    : isAnimatingIn
    ? { animation: 'windowOpen 0.22s ease-out forwards' }
    : {};

  const posStyle: React.CSSProperties = isMaximized
    ? { position: 'fixed', inset: 0 }
    : bounds
    ? { position: 'fixed', left: bounds.left, top: bounds.top, width: bounds.width, height: bounds.height }
    : { position: 'fixed', inset: 24 };

  return (
    <div
      ref={wrapperRef}
      onMouseDownCapture={() => onFocus?.()}
      className={[(bounds || isMaximized) ? 'xp-resizable-active' : '', 'window-has-icon', 'projects-window'].join(' ').trim()}
      style={{
        ...posStyle,
        zIndex: zIndex ?? 60,
        cursor: isDragging ? 'grabbing' : 'default',
        '--title-icon': "url('/icons/projects.ico')",
        ...animStyle,
      } as React.CSSProperties}
    >
      <Window
        title="my projects"
        showClose
        showMaximize
        onClose={handleClose}
        onMaximize={() => setIsMaximized(m => !m)}
        style={{ width: '100%', height: '100%', boxSizing: 'border-box' }}
      >
        <div
          className="project-tile-scroll"
          style={{ flex: 1, minHeight: 0, overflowY: 'auto', boxSizing: 'border-box', position: 'relative' }}
        >
          {isLoading && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(236,233,216,0.85)',
                zIndex: 10,
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  border: '4px solid #d0e4f8',
                  borderTopColor: '#1e6dc0',
                  borderRadius: '50%',
                  animation: 'xpSpin 0.75s linear infinite',
                }}
              />
            </div>
          )}
          <div className="project-tile-grid">
            {projects.map((project, i) => (
              <ProjectTile key={i} project={project} onClick={() => onProjectClick?.(project)} onVideoLoad={handleVideoLoad} />
            ))}
          </div>
        </div>
      </Window>

      {!isMaximized && RESIZE_HANDLES.map(({ dir, style: handleStyle }) => (
        <div
          key={dir}
          style={{
            position: 'absolute',
            zIndex: 1,
            background: 'transparent',
            ...handleStyle,
          }}
          onMouseDown={e => startResize(e, dir)}
        />
      ))}

    </div>
  );
};
