import React from 'react';
import { Window } from 'react-windows-xp';
import { useDraggable } from '../hooks/useDraggable';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [modalRef, isDragging] = useDraggable<HTMLDivElement>({
    handleSelector: '.title-bar',
    initialX: -350,
    initialY: -300,
  });

  return (
    <>
      <div
        className="fixed inset-0 bg-black/30 z-50"
        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 50 }}
        onClick={onClose}
      />

      <div
        ref={modalRef}
        className="project-modal"
        style={{
          position: 'fixed',
          zIndex: 51,
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 700,
          maxHeight: 600,
          cursor: isDragging ? 'grabbing' : 'default',
          display: 'inline-block',
        }}
      >
        <Window
          title={project.title}
          showClose
          onClose={onClose}
          style={{ width: '100%' }}
        >
          <div className="window-body" style={{ overflowY: 'auto', maxHeight: 540 }}>
            {/* Preview area */}
            <div
              style={{
                width: '100%',
                height: 240,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #dbeafe, #f3f4f6)',
                border: '1px solid #7f9db9',
                marginBottom: 12,
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 64, marginBottom: 8 }}>🎨</div>
                <div style={{ fontSize: 11, fontFamily: "'Pixelated MS Sans Serif', Arial", color: '#666' }}>
                  Full Project Preview
                </div>
              </div>
            </div>

            <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 6, color: '#222' }}>
              {project.title}
            </h3>
            <p style={{ fontSize: 11, color: '#444', marginBottom: 10, fontFamily: "'Pixelated MS Sans Serif', Arial" }}>
              {project.description}
            </p>

            {project.technologies && (
              <div style={{ marginBottom: 12 }}>
                <strong style={{ fontSize: 11, fontFamily: "'Pixelated MS Sans Serif', Arial" }}>
                  Technologies:
                </strong>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 4 }}>
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: 10,
                        padding: '2px 6px',
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
                  style={{ color: '#0000ff', fontSize: 11, fontFamily: "'Pixelated MS Sans Serif', Arial" }}
                >
                  Visit Project →
                </a>
              </div>
            )}
          </div>
        </Window>
      </div>
    </>
  );
};