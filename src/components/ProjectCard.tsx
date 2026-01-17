import React from 'react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  index, 
  onClick 
}) => {
  return (
    <div 
      onClick={onClick}
      className="p-4 border-2 border-gray-400 bg-white transition-all duration-300 cursor-pointer hover:bg-gray-50"
      style={{ 
        boxShadow: 'inset -1px -1px 0px rgba(0,0,0,0.1), inset 1px 1px 0px rgba(255,255,255,0.8), 2px 2px 4px rgba(0,0,0,0.2)'
      }}
    >
      <div className="flex gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold mb-2 text-gray-800">{project.title}</h3>
          <p className="text-gray-700 mb-3">{project.description}</p>
          {project.technologies && (
            <div className="flex flex-wrap gap-2 mb-3">
              {project.technologies.map((tech, i) => (
                <span key={i} className="text-xs px-2 py-1 bg-blue-100 border border-blue-300 text-blue-800">
                  {tech}
                </span>
              ))}
            </div>
          )}
          {project.link && (
            <a 
              href={project.link} 
              className="text-sm text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              View Project →
            </a>
          )}
        </div>
        
        <div 
          className="border-2 border-gray-400 bg-white overflow-hidden flex-shrink-0"
          style={{
            width: '280px',
            height: '200px',
            boxShadow: 'inset -1px -1px 0px rgba(0,0,0,0.1), inset 1px 1px 0px rgba(255,255,255,0.8)'
          }}
        >
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100">
            <div className="text-center">
              <div className="text-5xl mb-2">🎨</div>
              <div className="text-xs font-mono text-gray-600">Project Preview</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
