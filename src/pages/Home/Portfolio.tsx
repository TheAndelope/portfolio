import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Project } from '../../types';
import { portfolioData } from '../../data/portfolio';
import { projectsData } from '../../data/projects';
import { imagesData, ImageMeta } from '../../data/images';
import { ProfileCard } from '../../components/ProfileCard';
import { FloatingImageCard } from '../../components/FloatingImageCard';
import { MenuButton } from '../../components/MenuButton';
import { ProjectsWindow } from '../../components/ProjectsWindow';
import { ProjectModal } from '../../components/ProjectModal';
import { XPWindow } from '../../components/XPWindow';
import '../../styles/globals.css';

const Toolbar: React.FC<{ onMinesweeper: () => void; onShuffle: () => void }> = ({ onShuffle //onMinesweeper
  }) => (
  <div className="xp-toolbar">
    <a className="xp-toolbar-btn" href="mailto:hi@andyduong.dev">
      <span>✉</span> email
    </a>
    <div className="xp-toolbar-sep" />
    <a className="xp-toolbar-btn" href="https://github.com/theandelope" target="_blank" rel="noopener noreferrer">
      <img src="/images/github.png" alt="GitHub" style={{ width: 14, height: 14, verticalAlign: 'middle' }} /> github
    </a>
    <div className="xp-toolbar-sep" />
    <a className="xp-toolbar-btn" href="https://www.linkedin.com/in/andy--duong/" target="_blank" rel="noopener noreferrer">
      <span style={{ fontWeight: 700, fontSize: 11, color: '#0a66c2' }}>in</span> linkedin
    </a>
    <div className="xp-toolbar-sep" />
    <button className="xp-toolbar-btn" onClick={onShuffle}>
      <span>🔀</span> shuffle
    </button>
  </div>
);

const Portfolio: React.FC = () => {
  const [subWindows, setSubWindows] = useState<{ id: string; offset: number }[]>([]);
  const windowCountRef = useRef(0);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [projects] = useState<Project[]>(projectsData.projects);
  const [randomImages, setRandomImages] = useState<ImageMeta[]>([]);
  const [visibleFloatingCards, setVisibleFloatingCards] = useState<number[]>([]);
  const [mainWindowVisible, setMainWindowVisible] = useState(true);
  const [projectsWindowOpen, setProjectsWindowOpen] = useState(false);
  const [projectsCloseReq, setProjectsCloseReq] = useState(0);
  const [openProjects, setOpenProjects] = useState<Project[]>([]);

  const openProject = (project: Project) => {
    setOpenProjects(prev => {
      const without = prev.filter(p => p.title !== project.title);
      return [...without, project];
    });
    bringToFront(`project-${project.title}`);
  };

  const closeProject = (project: Project) => {
    setOpenProjects(prev => prev.filter(p => p.title !== project.title));
    setGlobalZOrder(prev => prev.filter(id => id !== `project-${project.title}`));
    setProjectsWindowOpen(false);
    setProjectsCloseReq(0);
    setGlobalZOrder(prev => prev.filter(w => w !== 'projects'));
  };

  const focusProject = (project: Project) => {
    setOpenProjects(prev => {
      const without = prev.filter(p => p.title !== project.title);
      return [...without, project];
    });
    bringToFront(`project-${project.title}`);
  };

  const closeProjectsWindow = useCallback(() => {
    setProjectsWindowOpen(false);
    setProjectsCloseReq(0);
    setGlobalZOrder(prev => prev.filter(w => w !== 'projects'));
  }, []);

  const [minesweeperOpen, setMinesweeperOpen] = useState(false);

  // Unified global z-order for all windows
  const [globalZOrder, setGlobalZOrder] = useState<string[]>([
    'floating-0',
    'floating-1',
    'floating-2',
    'floating-3',
    'floating-4',
    'profile',
    'main',
  ]);

  const bringToFront = (id: string) =>
    setGlobalZOrder(prev => [...prev.filter(w => w !== id), id]);

  const getZ = (id: string) => 10 + globalZOrder.indexOf(id);

  const openSubWindow = (id: string) => {
    if (subWindows.some(w => w.id === id)) {
      bringToFront(id);
      return;
    }
    const offset = (windowCountRef.current % 6) * 24;
    windowCountRef.current++;
    setSubWindows(prev => [...prev, { id, offset }]);
    setGlobalZOrder(prev => [...prev.filter(w => w !== id), id]);
  };

  const closeSubWindow = (id: string) => {
    setSubWindows(prev => prev.filter(w => w.id !== id));
    setGlobalZOrder(prev => prev.filter(w => w !== id));
  };

  const handleCloseActiveWindow = () => {
    const isMobile = window.innerWidth <= 768;
    if (projectsWindowOpen) {
      setProjectsCloseReq(r => r + 1);
    } else if (subWindows.length > 0) {
      // Close the topmost sub-window based on globalZOrder
      const subIds = subWindows.map(w => w.id);
      const topmost = [...globalZOrder].reverse().find(id => subIds.includes(id));
      if (topmost) closeSubWindow(topmost);
    } else if (!isMobile) {
      setMainWindowVisible(false);
    }
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'x' || e.key === 'X') {
        if (projectsWindowOpen) {
          setProjectsCloseReq(r => r + 1);
        } else if (subWindows.length > 0) {
          const subIds = subWindows.map(w => w.id);
          const topmost = [...globalZOrder].reverse().find(id => subIds.includes(id));
          if (topmost) closeSubWindow(topmost);
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [globalZOrder, subWindows, projectsWindowOpen]);

  useEffect(() => {
    const shuffled = [...imagesData].sort(() => Math.random() - 0.5);
    const picked = shuffled.slice(0, Math.min(5, shuffled.length));
    setRandomImages(picked);
    setVisibleFloatingCards(picked.map((_, i) => i));
  }, []);

  const handleShuffle = () => {
    const shuffled = [...imagesData].sort(() => Math.random() - 0.5);
    const picked = shuffled.slice(0, Math.min(5, shuffled.length));
    setRandomImages(picked);
    setVisibleFloatingCards(picked.map((_, i) => i));
  };

  const handleCloseFloatingCard = (index: number) => {
    setVisibleFloatingCards(prev => prev.filter(i => i !== index));
    setGlobalZOrder(prev => prev.filter(id => id !== `floating-${index}`));
  };

  const handleMenuClick = (id: string) => {
    if (id === 'projects') {
      setProjectsWindowOpen(true);
      setGlobalZOrder(prev => [...prev.filter(w => w !== 'projects'), 'projects']);
    } else {
      openSubWindow(id);
    }
  };

  const getWindowContent = (menuId: string) => {
    const item = portfolioData.menuItems.find(m => m.id === menuId);
    if (!item) return null;

    const body = Array.isArray(item.content) ? (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {item.content.map((line, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
            <span style={{ color: '#0000ff' }}>▸</span>
            <span style={{ flex: 1, fontSize: 14 }}>{line}</span>
          </div>
        ))}
      </div>
    ) : (
      <p style={{ fontSize: 14, lineHeight: 1.6 }}>{item.content}</p>
    );

    return (
      <>
        {menuId === 'cool things' ? (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            <a href="https://aaronye.dev/" target="_blank" rel="noopener noreferrer">
              <img src="/aaron.gif" alt="Aaron Ye" style={{ display: 'block', imageRendering: 'pixelated' }} />
            </a>
          </div>
        ) : body}
        {menuId === 'contact' && (
          <div style={{ marginTop: 16, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              <button>Download Resume</button>
            </a>
            <button onClick={() => { closeSubWindow('contact'); setProjectsWindowOpen(true); }}>
              View Projects
            </button>
          </div>
        )}
      </>
    );
  };

  const floatingCards = [
    { top: '10vh',    right: 'clamp(10px, 4vw, 150px)', width: 'clamp(200px, 20vw, 320px)', animation: 'float 6s ease-in-out infinite' },
    { top: '20vh',    left:  'clamp(10px, 3vw, 8vw)',   width: 'clamp(180px, 18vw, 280px)', animation: 'float2 7s ease-in-out infinite',   delay: '1s' },
    { bottom: '8vh',  right: 'clamp(10px, 8vw, 25vw)',  width: 'clamp(220px, 22vw, 360px)', animation: 'float3 5.5s ease-in-out infinite',  delay: '0.5s' },
    { bottom: '25vh', right: 'clamp(10px, 2vw, 12vw)',  width: 'clamp(190px, 19vw, 300px)', animation: 'float 6.5s ease-in-out infinite',   delay: '1.5s' },
    { bottom: '18vh', left:  'clamp(10px, 4vw, 18vw)',  width: 'clamp(200px, 20vw, 320px)', animation: 'float2 6.8s ease-in-out infinite',  delay: '0.8s' },
  ] as const;


  return (
    <div
      className="grid-bg"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Profile card — pinned top-left */}
      <ProfileCard
        zIndex={getZ('profile')}
        onFocus={() => bringToFront('profile')}
      />

      {/* Decorative blurs */}
      <div style={{ position: 'absolute', top: 80, left: 80, width: 256, height: 256, background: 'rgba(217,119,6,0.2)', borderRadius: '50%', filter: 'blur(48px)', animation: 'float 6s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', bottom: 80, right: 80, width: 384, height: 384, background: 'rgba(120,113,108,0.2)', borderRadius: '50%', filter: 'blur(48px)', animation: 'float 6s ease-in-out infinite', animationDelay: '2s' }} />

      {/* Floating image windows */}
      {randomImages.length > 0 && floatingCards.map((card, idx) =>
        visibleFloatingCards.includes(idx) ? (
          <FloatingImageCard
            key={idx}
            src={randomImages[idx].src}
            title={randomImages[idx].title}
            caption={randomImages[idx].caption}
            onClose={() => handleCloseFloatingCard(idx)}
            onFocus={() => bringToFront(`floating-${idx}`)}
            style={{
              position: 'fixed',
              top: (card as any).top,
              bottom: (card as any).bottom,
              left: (card as any).left,
              right: (card as any).right,
              width: card.width,
              zIndex: getZ(`floating-${idx}`),
              animation: card.animation,
              animationDelay: (card as any).delay,
              animationFillMode: 'backwards',
            }}
          />
        ) : null
      )}

      {/* Main portfolio window */}
      {mainWindowVisible && (
        <XPWindow
          title={`portfolio`}
          onClose={handleCloseActiveWindow}
          onMouseDown={() => bringToFront('main')}
          skipOpenAnimation
          scrollable
          resizable
          icon="portfolio.ico"
          toolbar={<Toolbar onMinesweeper={() => { setMinesweeperOpen(true); bringToFront('minesweeper'); }} onShuffle={handleShuffle} />}
          className="main-window-wrapper"
          style={{
            width: 'clamp(360px, 55vw, 780px)',
            zIndex: getZ('main'),
            position: 'relative',
          }}
          bodyStyle={{
            maxHeight: 'clamp(340px, 65vh, 640px)',
          }}
        >
          <h4 style={{ margin: '0 0 6px', fontSize: 30, color: '#003c74' }}>
            Andy Duong
          </h4>
          <p style={{ margin: '0 0 18px', fontSize: 18, color: '#555' }}>
            {portfolioData.title}
          </p>

          <p style={{ margin: '0 0 10px', fontSize: 17, textDecoration: 'underline', color: '#222' }}>
            about me
          </p>

  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
    <span style={{ fontSize: 18, color: '#555' }}>- studying math @ university of waterloo</span>
    <img src="/images/uw.avif" alt="UW" style={{ width: 20, height: 20, objectFit: 'contain', flexShrink: 0 }} />
  </div>
  <div style={{ marginBottom: 6 }}>
    <span style={{ fontSize: 18, color: '#555' }}>- into kaggle and rl competitions</span>
  </div>
  <div style={{ marginBottom: 6 }}>
    <span style={{ fontSize: 18, color: '#555' }}>- exploring computer architecture and fpga development</span>
  </div>
  <div style={{ marginBottom: 22 }}>
    <span style={{ fontSize: 18, color: '#555' }}>- i also cook a lot</span>
  </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {portfolioData.menuItems.map((item, index) => (
              <MenuButton
                key={item.id}
                item={item}
                index={index}
                isHovered={hoveredItem === item.id}
                onHover={() => setHoveredItem(item.id)}
                onLeave={() => setHoveredItem(null)}
                onClick={() => handleMenuClick(item.id)}
              />
            ))}
          </div>
        </XPWindow>
      )}

      {/* Sub-menu windows */}
      {subWindows.map(({ id, offset }) => (
        <XPWindow
          key={id}
          title={portfolioData.menuItems.find(m => m.id === id)?.label ?? ''}
          onClose={() => closeSubWindow(id)}
          onMouseDown={() => bringToFront(id)}
          scrollable
          resizable
          icon={`${id.replace(/\s+/g, '-')}.ico`}
          style={{
            position: 'fixed',
            top: `calc(15vh + ${offset}px)`,
            left: `calc(50vw - 220px + ${offset}px)`,
            width: 'clamp(280px, 38vw, 440px)',
            zIndex: getZ(id),
          }}
          bodyStyle={{ maxHeight: 'clamp(180px, 50vh, 400px)' }}
        >
          {getWindowContent(id)}
        </XPWindow>
      ))}

      {/* Minesweeper window */}
      {minesweeperOpen && (
        <XPWindow
          title="minesweeper"
          icon="minesweeper.ico"
          onClose={() => { setMinesweeperOpen(false); setGlobalZOrder(prev => prev.filter(w => w !== 'minesweeper')); }}
          onMouseDown={() => bringToFront('minesweeper')}
          resizable
          style={{
            position: 'fixed',
            top: '8vh',
            left: 'calc(50vw - 260px)',
            width: 520,
            zIndex: getZ('minesweeper'),
          }}
          bodyStyle={{ padding: 0 }}
        >
          {/* Crop ~36px off the top to hide the iframe's own XP title bar */}
          <div style={{ overflow: 'hidden', height: 500 }}>

          </div>
        </XPWindow>
      )}

      {/* Project detail modals — siblings of ProjectsWindow, not children */}
      {openProjects.map((project) => (
        <ProjectModal
          key={project.title}
          project={project}
          onClose={() => closeProject(project)}
          onFocus={() => focusProject(project)}
          zIndex={1000 + openProjects.indexOf(project)}
        />
      ))}

      {/* Projects window */}
      {projectsWindowOpen && (
        <ProjectsWindow
          projects={projects}
          onClose={closeProjectsWindow}
          closeRequest={projectsCloseReq}
          onFocus={() => bringToFront('projects')}
          zIndex={getZ('projects')}
          onProjectClick={openProject}
        />
      )}
    </div>
  );
};

export default Portfolio;
