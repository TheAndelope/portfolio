import React from 'react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        background: '#fff',
        border: '2px solid #919b9c',
        padding: 12,
        cursor: 'pointer',
        boxShadow: 'inset -1px -1px #0a0a0a, inset 1px 1px #fff, inset -2px -2px grey, inset 2px 2px #dfdfdf',
      }}
    >
      <div className="project-card-layout">
        {/* Text */}
        <div className="project-text-content" style={{ flex: 1 }}>
          <h3 style={{ margin: '0 0 6px', fontSize: 13, fontWeight: 700, color: '#222', fontFamily: "'Pixelated MS Sans Serif', Arial" }}>
            {project.title}
          </h3>
          <p style={{ margin: '0 0 8px', fontSize: 11, color: '#444', fontFamily: "'Pixelated MS Sans Serif', Arial", lineHeight: 1.5 }}>
            {project.description}
          </p>
          {project.technologies && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {project.technologies.map((tech, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: 10,
                    padding: '1px 5px',
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
          )}
        </div>

        {/* Preview thumbnail */}
        <div
          className="project-video-preview"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #dbeafe, #f3f4f6)',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 40, marginBottom: 4 }}>🎨</div>
            <div style={{ fontSize: 10, fontFamily: "'Pixelated MS Sans Serif', Arial", color: '#666' }}>
              Project Preview
            </div>
          </div>
        </div>
      </div>

      {project.link && (
        <div style={{ paddingTop: 8, borderTop: '1px solid #d4d0c8', marginTop: 8 }}>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            style={{ fontSize: 11, color: '#0000ff', fontFamily: "'Pixelated MS Sans Serif', Arial" }}
          >
            View Project →
          </a>
        </div>
      )}
    </div>
  );
};