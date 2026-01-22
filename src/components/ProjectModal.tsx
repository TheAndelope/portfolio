import React from 'react';
import { Project } from '../types';
import { useDraggable } from '../hooks/useDraggable';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [modalRef, isDragging] = useDraggable<HTMLDivElement>({ 
    handleSelector: '.xp-title-bar',
    initialX: -350,
    initialY: -300
  });

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/30 z-50"
        onClick={onClose}
      />
      
      <div 
        ref={modalRef}
        className="fixed z-50 xp-window project-modal"
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '700px',
          maxHeight: '600px',
          cursor: isDragging ? 'grabbing' : 'default'
        }}
      >
        <div className="xp-title-bar cursor-grab active:cursor-grabbing">
          <div className="flex items-center gap-2">
            <div className="text-white font-bold text-sm">{project.title}</div>
          </div>
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
        
        <div className="xp-content p-6 overflow-y-auto" style={{ maxHeight: '540px' }}>
          <div className="mb-4 border-2 border-gray-400 bg-white overflow-hidden">
            <div className="w-full h-80 flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100">
              <div className="text-center">
                <div className="text-8xl mb-3">🎨</div>
                <div className="text-sm font-mono text-gray-600">Full Project Preview</div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">{project.title}</h3>
              <p className="text-gray-700">{project.description}</p>
            </div>
            
            {project.technologies && (
              <div>
                <h4 className="font-bold mb-2 text-gray-800">Technologies:</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="text-xs px-3 py-1 bg-blue-100 border border-blue-300 text-blue-800">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {project.link && (
              <div className="pt-4">
                <a 
                  href={project.link} 
                  className="inline-block px-4 py-2 bg-blue-500 text-white border border-blue-700 hover:bg-blue-600"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    boxShadow: 'inset -1px -1px 0px rgba(0,0,0,0.2), inset 1px 1px 0px rgba(255,255,255,0.3)'
                  }}
                >
                  Visit Project →
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};