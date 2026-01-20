import React, { useState, useEffect } from 'react';
import { useDraggable } from '../../hooks/useDraggable';
import { Project } from '../../types';
import { portfolioData } from '../../data/portfolio';
import { projectsData } from '../../data/projects';
import { ProfileCard } from '../../components/ProfileCard';
import { FloatingImageCard } from '../../components/FloatingImageCard';
import { MenuButton } from '../../components/MenuButton';
import { ProjectCard } from '../../components/ProjectCard';
import { ProjectModal } from '../../components/ProjectModal';
import '../../styles/globals.css';

const Portfolio: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [projects] = useState<Project[]>(projectsData.projects);
  const [randomImages, setRandomImages] = useState<number[]>([]);
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const [visibleFloatingCards, setVisibleFloatingCards] = useState<number[]>([]);
  const [mainWindowVisible, setMainWindowVisible] = useState(true);
  
  const [mainCardRef, isDraggingMain] = useDraggable<HTMLDivElement>({ 
    handleSelector: '.xp-title-bar' 
  });

  useEffect(() => {
    setIsLoaded(true);
    
    const totalImages = 10;
    const imageNumbers = Array.from({ length: totalImages }, (_, i) => i + 1);
    const shuffled = imageNumbers.sort(() => Math.random() - 0.5);
    setRandomImages(shuffled.slice(0, 5));
    setVisibleFloatingCards([0, 1, 2, 3, 4]);
  }, []);

  const handleCloseFloatingCard = (index: number) => {
    setVisibleFloatingCards(prev => prev.filter(i => i !== index));
  };

  const getMenuContent = () => {
    const item = portfolioData.menuItems.find(m => m.id === selectedMenu);
    if (!item) return null;

    if (selectedMenu === 'projects') {
      return (
        <div className="space-y-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              index={index}
              onClick={() => setExpandedProject(index)}
            />
          ))}
          
          {expandedProject !== null && (
            <ProjectModal
              project={projects[expandedProject]}
              onClose={() => setExpandedProject(null)}
            />
          )}
        </div>
      );
    }

    if (Array.isArray(item.content)) {
      return (
        <div className="space-y-3">
          {item.content.map((line, index) => (
            <div 
              key={index}
              className="flex items-start"
            >
              <span className="text-blue-600 mr-3 mt-1">▸</span>
              <span className="flex-1">{line}</span>
            </div>
          ))}
        </div>
      );
    }

    return (
      <p className="leading-relaxed">
        {item.content}
      </p>
    );
  };

  const floatingCards = [
    { top: '10vh', right: 'clamp(10px, 4vw, 150px)', width: 'clamp(200px, 20vw, 320px)', rotation: '', animation: 'float 6s ease-in-out infinite'},
    { top: '20vh', left: '8vw', width: 'clamp(180px, 18vw, 280px)', rotation: '', animation: 'float2 7s ease-in-out infinite', delay: '1s'},
    { bottom: '10vh', right: '25vw', width: 'clamp(220px, 22vw, 360px)', rotation: '', animation: 'float3 5.5s ease-in-out infinite', delay: '0.5s'},
    { bottom: '25vh', right: '12vw', width: 'clamp(190px, 19vw, 300px)', rotation: '', animation: 'float 6.5s ease-in-out infinite', delay: '1.5s'},
    { bottom: '18vh', left: '18vw', width: 'clamp(200px, 20vw, 320px)', rotation: '', animation: 'float2 6.8s ease-in-out infinite', delay: '0.8s'}
  ];

  return (
    <>

      <div className="min-h-screen bg-[#F5F5DC] grid-bg flex items-center justify-center p-4 relative overflow-hidden">
        
        <ProfileCard />

        {/* Floating decorative elements */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-amber-300/20 rounded-full blur-3xl" 
             style={{ animation: 'float 6s ease-in-out infinite' }}></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-stone-400/20 rounded-full blur-3xl" 
             style={{ animation: 'float 6s ease-in-out infinite', animationDelay: '2s' }}></div>
        
        {/* Floating Image Cards */}
        {randomImages.length > 0 && floatingCards.map((card, idx) => (
          visibleFloatingCards.includes(idx) && (
            <FloatingImageCard
              key={idx}
              imageNumber={randomImages[idx]}
              label={""}
              onClose={() => handleCloseFloatingCard(idx)}
              style={{
                top: card.top,
                bottom: card.bottom,
                left: card.left,
                right: card.right,
                width: card.width,
                transform: card.rotation,
                zIndex: 5,
                animation: card.animation,
                animationDelay: card.delay
              }}
            />
          )
        ))}
       
        {/* Main Card */}
        {mainWindowVisible && (
          selectedMenu === null ? (
            <div 
              ref={mainCardRef}
              className={`xp-window max-w-4xl w-full z-10 relative flex flex-col ${
                isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
              style={{ 
                width: 'clamp(320px, 60vw, 900px)',
                height: 'clamp(500px, 60vh, 700px)',
                cursor: isDraggingMain ? 'grabbing' : 'default',
                transition: isLoaded ? 'opacity 1s, transform 1s' : 'none'
              }}
            >
              
              <div className="xp-title-bar cursor-grab active:cursor-grabbing">
                <div className="text-white font-bold text-sm flex items-center gap-2">
                  <span>💼</span>
                  {portfolioData.name} - portfolio
                </div>
                <button 
                  className="xp-close-button" 
                  onClick={(e) => {
                    e.stopPropagation();
                    setMainWindowVisible(false);
                  }}
                >
                  ✕
                </button>
              </div>

            <div className="p-8 xp-content flex-1 overflow-y-auto">
              <div className="mb-6">
                <p className="text-gray-600 text-sm italic mt-2">{portfolioData.tagline}</p>
                <p className="text-gray-700 text-sm font-mono">{portfolioData.title}</p>
                
                <p className="text-gray-700 text-sm font-mono">About Me</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {portfolioData.menuItems.map((item, index) => (
                  <MenuButton
                    key={item.id}
                    item={item}
                    index={index}
                    isHovered={hoveredItem === item.id}
                    onHover={() => setHoveredItem(item.id)}
                    onLeave={() => setHoveredItem(null)}
                    onClick={() => setSelectedMenu(item.id)}
                  />
                ))}
              </div>
            </div>

            <div className="border-t-2 border-gray-400 bg-gray-200 flex-shrink-0">
              <div className="p-6">
                <div className="text-xs text-gray-700 space-y-2 font-mono">
                  <div className="flex items-center">
                    <span className="text-green-600 mr-2">●</span>
                    <span>available for work (seeking summer '26 internships)</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-700 mr-2">&gt;</span>
                    <span>{portfolioData.location}</span>
                  </div>
                </div>
              </div>
              <div className="border-t-2 border-gray-400 p-4 bg-gray-300">
                <div className="flex items-center justify-between text-xs font-mono text-gray-700">
                  <span>Click any menu item to view details</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div 
            ref={mainCardRef}
            className="xp-window max-w-4xl w-full opacity-100 scale-100 z-10 relative flex flex-col"
            style={{ 
              height: '700px',
              cursor: isDraggingMain ? 'grabbing' : 'default'
            }}
          >
            
            <div className="xp-title-bar cursor-grab active:cursor-grabbing">
              <div className="text-white font-bold text-sm flex items-center gap-2">
                <span>📄</span>
                {portfolioData.menuItems.find(m => m.id === selectedMenu)?.label} - {portfolioData.name}
              </div>
              <button 
                className="xp-close-button" 
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedMenu(null);
                }}
              >
                ✕
              </button>
            </div>

            <div className="xp-content p-8 flex-1 overflow-y-auto">
              <div className="text-gray-900 font-mono text-sm leading-relaxed">
                {getMenuContent()}
              </div>

              {selectedMenu === 'contact' && (
                <div className="mt-8 flex flex-wrap gap-3">
                  <button className="px-5 py-2 bg-blue-500 text-white border border-blue-700 text-sm font-medium transition-all duration-200 hover:bg-blue-600"
                          style={{
                            boxShadow: 'inset -1px -1px 0px rgba(0,0,0,0.2), inset 1px 1px 0px rgba(255,255,255,0.3)'
                          }}>
                    Download Resume
                  </button>
                  <button className="px-5 py-2 border-2 border-gray-400 bg-white text-gray-800 hover:bg-gray-100 text-sm font-medium transition-all duration-200"
                          style={{
                            boxShadow: 'inset -1px -1px 0px rgba(0,0,0,0.1), inset 1px 1px 0px rgba(255,255,255,0.8)'
                          }}>
                    View Projects
                  </button>
                </div>
              )}
            </div>

            <div className="border-t-2 border-gray-400 p-4 bg-gray-200 flex-shrink-0">
              <div className="flex items-center justify-between text-xs font-mono text-gray-700">
                <span>Click X to return to menu</span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                  Online
                </span>
              </div>
            </div>
          </div>
        )
        )}
      </div>
    </>
  );
};

export default Portfolio;