import React, { useState, useEffect } from 'react';
import './Home.css';
import projectsData from './projects.json';
interface Project {
  title: string;
  description: string;
  technologies?: string[];
  link?: string;
}

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  content: string | string[];
}

interface PortfolioData {
  name: string;
  title: string;
  tagline: string;
  location: string;
  menuItems: MenuItem[];
}

const Portfolio: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [randomImages, setRandomImages] = useState<number[]>([]);

  const portfolioData: PortfolioData = {
    name: "Andy Duong",
    title: "Developer",
    tagline: "Building digital experiences that matter",
    location: "Waterloo, Canada",
    menuItems: [
      {
        id: 'about',
        label: 'about',
        icon: '→',
        content: ''
      },
      {
        id: 'skills',
        label: 'skills',
        icon: '→',
        content: [
          "Frontend: React, TypeScript, Next.js, Tailwind CSS",
          "Backend: C++, C#, Kotlin, Python, Node.js, PostgreSQL, MongoDB",
          "Library & Frameworks: TensorFlow, Keras, Pandas, NumPy, PyTorch, OpenCV",
          "Tools: Git, Docker, AWS, Vercel, Firebase, Supabase",
          "Design: Figma, Blender"
        ]
      },
      {
        id: 'projects',
        label: 'projects',
        icon: '→',
        content: []
      },
      {
        id: 'experience',
        label: 'experience',
        icon: '→',
        content: [
          "Senior Developer @ Tech Company (2022 - Present)",
          "Full-Stack Developer @ Startup Inc (2020 - 2022)",
          "Frontend Developer @ Agency (2019 - 2020)",
          "Freelance Developer (2018 - 2019)"
        ]
      },
      {
        id: 'contact',
        label: 'contact',
        icon: '→',
        content: [
          "Email: hi@andyduong.dev",
          "LinkedIn: linkedin.com/in/andy--duong",
          "GitHub: github.com/theandelope",
          "Portfolio: andyduong.dev"
        ]
      }
    ]
  };

  useEffect(() => {
    setIsLoaded(true);
    
    // Select 3 random images from 1-10
    const totalImages = 10; // Adjust this if you have more/fewer images
    const imageNumbers = Array.from({ length: totalImages }, (_, i) => i + 1);
    const shuffled = imageNumbers.sort(() => Math.random() - 0.5);
    setRandomImages(shuffled.slice(0, 5));
    
    // Load projects from JSON file
    const loadProjects = async () => {
        setProjects(projectsData.projects);
      };
    
    loadProjects();
  }, []);

  const getMenuContent = () => {
    const item = portfolioData.menuItems.find(m => m.id === selectedMenu);
    if (!item) return null;

    // Special handling for projects
    if (selectedMenu === 'projects') {
      return (
        <div className="space-y-6">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="p-4 border-2 border-black bg-stone-100 opacity-0 animate-fadeIn"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
            >
              <h3 className="text-lg font-bold mb-2">{project.title}</h3>
              <p className="text-stone-700 mb-3">{project.description}</p>
              {project.technologies && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="text-xs px-2 py-1 bg-amber-200 border border-black">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
              {project.link && (
                <a 
                  href={project.link} 
                  className="text-sm text-green-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Project →
                </a>
              )}
            </div>
          ))}
        </div>
      );
    }

    if (Array.isArray(item.content)) {
      return (
        <div className="space-y-3">
          {item.content.map((line, index) => (
            <div 
              key={index}
              className="flex items-start opacity-0 animate-fadeIn"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
            >
              <span className="text-green-600 mr-3 mt-1">▸</span>
              <span className="flex-1">{line}</span>
            </div>
          ))}
        </div>
      );
    }

    return <p className="leading-relaxed opacity-0 animate-fadeIn">{item.content}</p>;
  };

  return (
    <>
      {/* Background */}
      <div className="min-h-screen bg-[#F5F5DC] grid-bg flex items-center justify-center p-4 relative overflow-hidden">
        
        {/* Floating decorative elements */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-amber-300/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-stone-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        
       {/* Floating Image Cards - 5 cards with FIXED positioning */}
        {randomImages.length > 0 && (
          <>
            {/* Card 1 - Top right */}
            <div className="floating-card fixed w-64 h-56 bg-stone-200 border-4 border-black shadow-2xl animate-float overflow-hidden" 
                 style={{ top: '100px', right: '150px', transform: 'rotate(3deg)', zIndex: 5 }}>
              <img 
                src={`${randomImages[0]}.jpg`} 
                alt={`Gallery ${randomImages[0]}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = '<div class="w-full h-full flex items-center justify-center"><div class="text-center"><div class="text-6xl mb-2">🖼️</div><div class="text-sm font-mono text-stone-600">Image ' + randomImages[0] + '</div></div></div>';
                  }
                }}
              />
            </div>
            
            {/* Card 2 - Left side */}
            <div className="floating-card fixed w-56 h-72 bg-amber-100 border-4 border-black shadow-2xl animate-float2 overflow-hidden" 
                 style={{ top: '200px', left: '100px', transform: 'rotate(6deg)', animationDelay: '1s', zIndex: 5 }}>
              <img 
                src={`${randomImages[1]}.jpg`} 
                alt={`Gallery ${randomImages[1]}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = '<div class="w-full h-full flex items-center justify-center"><div class="text-center"><div class="text-6xl mb-2">📸</div><div class="text-sm font-mono text-stone-600">Image ' + randomImages[1] + '</div></div></div>';
                  }
                }}
              />
            </div>
            
            {/* Card 3 - Bottom right */}
            <div className="floating-card fixed w-72 h-60 bg-stone-100 border-4 border-black shadow-2xl animate-float3 overflow-hidden" 
                 style={{ bottom: '70px', right: '360px', transform: 'rotate(-2deg)', animationDelay: '0.5s', zIndex: 5 }}>
              <img 
                src={`${randomImages[2]}.jpg`} 
                alt={`Gallery ${randomImages[2]}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = '<div class="w-full h-full flex items-center justify-center"><div class="text-center"><div class="text-6xl mb-2">🎨</div><div class="text-sm font-mono text-stone-600">Image ' + randomImages[2] + '</div></div></div>';
                  }
                }}
              />
            </div>

            {/* Card 4 - Bottom Right Up */}
            <div className="floating-card fixed w-60 h-64 bg-amber-200 border-4 border-black shadow-2xl animate-float overflow-hidden" 
                 style={{ bottom: '200px', right: '160px', transform: 'rotate(6deg)', animationDelay: '1.5s', zIndex: 5 }}>
              <img 
                src={`${randomImages[3]}.jpg`} 
                alt={`Gallery ${randomImages[3]}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = '<div class="w-full h-full flex items-center justify-center"><div class="text-center"><div class="text-6xl mb-2">🌄</div><div class="text-sm font-mono text-stone-600">Image ' + randomImages[3] + '</div></div></div>';
                  }
                }}
              />
            </div>

            {/* Card 5 - Bottom left */}
            <div className="floating-card fixed w-64 h-56 bg-stone-300 border-4 border-black shadow-2xl animate-float2 overflow-hidden" 
                 style={{ bottom: '140px', left: '220px', transform: 'rotate(-4deg)', animationDelay: '0.8s', zIndex: 5 }}>
              <img 
                src={`${randomImages[4]}.jpg`} 
                alt={`Gallery ${randomImages[4]}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = '<div class="w-full h-full flex items-center justify-center"><div class="text-center"><div class="text-6xl mb-2">🏞️</div><div class="text-sm font-mono text-stone-600">Image ' + randomImages[4] + '</div></div></div>';
                  }
                }}
              />
            </div>
          </>
        )}
       
        {/* Main Card */}
        {selectedMenu === null ? (
          
          // Main Menu Card
          <div className={`card-container bg-amber-50 border-4 border-black max-w-4xl w-full h-[700px] transition-all duration-1000 z-10 relative ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            
            {/* Card Header */}
            <div className="border-b-4 border-black p-6 bg-stone-100">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="card-title text-3xl font-bold text-black mb-1">
                    {portfolioData.name}
                  </h1>
                  <p className="text-stone-700 text-sm font-mono">{portfolioData.title}</p>
                </div>
              </div>
              <p className="text-stone-600 text-sm italic">{portfolioData.tagline}</p>
            </div>

            {/* Menu Grid */}
            <div className="p-8 bg-amber-50 min-h-[400px]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {portfolioData.menuItems.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedMenu(item.id)}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className="text-left p-6 font-mono text-sm transition-all duration-200 animate-slideIn border-4 border-black hover:bg-stone-200 bg-stone-100 shadow-lg hover:shadow-xl"
                    style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards', opacity: 0 }}
                  >
                    <span className="text-2xl mr-3 text-green-600">{item.icon}</span>
                    <span className="text-lg font-bold">{item.label}</span>
                    {hoveredItem === item.id && (
                      <span className="ml-2 text-xs text-stone-500">click to view</span>
                    )}
                  </button>
                ))}
              </div>

              {/* Footer Info */}
              <div className="mt-8 pt-6 border-t-2 border-black">
                <div className="text-xs text-stone-700 space-y-2 font-mono">
                  <div className="flex items-center">
                    <span className="text-green-600 mr-2">●</span>
                    <span>Available for work</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-stone-700 mr-2">&gt;</span>
                    <span>{portfolioData.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="border-t-4 border-black p-4 bg-stone-100">
              <div className="flex items-center justify-between text-xs font-mono text-stone-700">
                <span>Click any menu item to view details</span>
              </div>
            </div>
          </div>
        ) : (
          // Detail Card
          <div className={`card-container bg-amber-50 border-4 border-black max-w-4xl w-full transition-all duration-1000 opacity-100 scale-100 z-10 relative`}>
            
            {/* Card Header */}
            <div className="border-b-4 border-black p-6 bg-stone-100">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="card-title text-3xl font-bold text-black mb-1">
                    {portfolioData.menuItems.find(m => m.id === selectedMenu)?.label}
                  </h1>
                  <p className="text-stone-700 text-sm font-mono">{portfolioData.name}</p>
                </div>
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-500 border border-black"></div>
                  <div className="w-3 h-3 bg-yellow-500 border border-black"></div>
                  <div className="w-3 h-3 bg-green-500 border border-black"></div>
                </div>
              </div>
              <button
                onClick={() => setSelectedMenu(null)}
                className="text-sm text-stone-600 hover:text-black font-mono flex items-center"
              >
                ← Back to menu
              </button>
            </div>

            {/* Content Area */}
            <div className="p-8 bg-amber-50 min-h-[400px]">
              <div className="text-stone-900 font-mono text-sm leading-relaxed">
                {getMenuContent()}
              </div>

              {/* Action Buttons */}
              {selectedMenu === 'contact' && (
                <div className="mt-8 flex flex-wrap gap-3 opacity-0 animate-fadeIn" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
                  <button className="px-5 py-2 bg-black text-amber-50 border-2 border-black text-sm font-medium transition-all duration-200 hover:bg-stone-800">
                    Download Resume
                  </button>
                  <button className="px-5 py-2 border-2 border-black text-black hover:bg-stone-200 text-sm font-medium transition-all duration-200">
                    View Projects
                  </button>
                </div>
              )}
            </div>

            {/* Card Footer */}
            <div className="border-t-4 border-black p-4 bg-stone-100">
              <div className="flex items-center justify-between text-xs font-mono text-stone-700">
                <span>Click back to return to menu</span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-600 animate-pulse"></span>
                  Online
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Portfolio;
