import React, { useState, useEffect, useRef } from 'react';

interface HistoryEntry {
  type: 'command' | 'output' | 'error';
  content: string | string[];
}

interface Project {
  title: string;
  description: string;
  tech: string;
  links?: {
    github?: string;
    devpost?: string;
  };
  details: string;
}

const Terminal = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentPath, setCurrentPath] = useState('~/portfolio');
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const projects: Record<string, Project> = {
    identibear: {
      title: "Identibear",
      description: "A Machine Learning tool designed to aid Dementia and Prosopagnosia patients submitted to Hack The 6ix.",
      tech: "Python, Keras, OpenCV, Machine Learning",
      links: {
        github: "https://github.com/Solaror0/Identibear",
        devpost: "https://devpost.com/software/identibear-your-memory-companion"
      },
      details: "Identibear assists individuals with memory-related conditions by recognizing faces and offering contextual information. Users upload videos of faces with details, and the CNN model provides real-time recognition through webcam feed."
    },
    portfolio: {
      title: "Portfolio Website",
      description: "A React and Tailwind CSS portfolio showcasing various programming projects.",
      tech: "React, Tailwind CSS, JavaScript",
      details: "My first major frontend project that helped me understand modern web development principles and responsive design."
    },
    neo_dev_league: {
      title: "Neo Developer League", 
      description: "A competitive programming league for high schoolers that I co-founded.",
      tech: "Python, Gmail API, OpenAI API, Google Sheets API",
      details: "Responsible for sponsor outreach and fund management. Built automated email system for sponsor outreach using Gmail and OpenAI APIs."
    },
    hush: {
      title: "hush",
      description: "A voice-responsive horror game developed for HawkHacks.",
      tech: "Game Development, 3D Modeling, AI Programming",
      details: "Horror game where monster AI responds to player voice volume. Led programming for monster AI and created 3D map modeling."
    }
  };

  const skills = [
    "Python", "JavaScript", "React", "Machine Learning", "OpenCV", "Keras",
    "Game Development", "3D Modeling", "API Integration", "Competitive Programming",
    "Frontend Development", "Backend Development"
  ];

  const commands: Record<string, () => string[]> = {
    help: () => [
      "Available commands:",
      "  help        - Show this help message",
      "  about       - Learn about Andy Duong", 
      "  skills      - View technical skills",
      "  projects    - List all projects",
      "  cat [project] - View project details",
      "  ls          - List directory contents",
      "  clear       - Clear terminal",
      "  contact     - Get contact information",
      "  whoami      - Display current user",
      "  pwd         - Show current directory",
      "  tree        - Show project structure",
      ""
    ],
    
    about: () => [
      "┌─ About Andy Duong ─┐",
      "│                   │",
      "│ Stargazer & Developer │",
      "│ Passionate about ML, Game Dev,  │", 
      "│ and Competitive Programming     │",
      "│                   │",
      "│ Roles: Game Developer, ML Dev,  │",
      "│        Data Scientist, Hacker    │",
      "│                   │",
      "└───────────────────┘",
      ""
    ],

    skills: () => [
      "Technical Skills:",
      "================",
      ...skills.map(skill => `  ◆ ${skill}`),
      "",
      `Total skills: ${skills.length}`
    ],

    projects: () => [
      "Projects Directory:",
      "==================",
      ...Object.keys(projects).map(key => 
        `  📁 ${key.padEnd(15)} - ${projects[key].title}`
      ),
      "",
      "Use 'cat [project_name]' to view details"
    ],

    ls: () => [
      "total 4",
      "drwxr-xr-x  2 andy andy 4096 Jan 15 2025 projects/",
      "drwxr-xr-x  2 andy andy 4096 Jan 15 2025 skills/", 
      "-rw-r--r--  1 andy andy  256 Jan 15 2025 about.txt",
      "-rw-r--r--  1 andy andy  512 Jan 15 2025 contact.txt",
      "-rw-r--r--  1 andy andy  128 Jan 15 2025 README.md",
      ""
    ],

    tree: () => [
      "~/portfolio",
      "├── projects/",
      "│   ├── identibear/",
      "│   ├── portfolio/", 
      "│   ├── neo_dev_league/",
      "│   └── hush/",
      "├── skills/",
      "├── about.txt",
      "├── contact.txt",
      "└── README.md",
      ""
    ],

    whoami: () => ["andy"],

    pwd: () => [currentPath],

    contact: () => [
      "Contact Information:",
      "===================",
      "  📧 Email: andy@example.com",
      "  🐙 GitHub: github.com/andy-duong", 
      "  💼 LinkedIn: linkedin.com/in/andy-duong",
      "  🌐 Portfolio: andy-duong.dev",
      "",
      "Feel free to reach out for collaborations!"
    ],

    clear: () => {
      setHistory([]);
      return [];
    }
  };

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const parts = trimmed.split(' ');
    const command = parts[0];
    const args = parts.slice(1);

    // Add command to history
    setHistory(prev => [...prev, { type: 'command', content: `${currentPath}$ ${cmd}` }]);

    if (command === '') return;

    if (commands[command]) {
      const output = commands[command]();
      if (output.length > 0) {
        setHistory(prev => [...prev, { type: 'output', content: output }]);
      }
    } else if (command === 'cat' && args.length > 0) {
      const projectName = args[0];
      if (projects[projectName]) {
        const project = projects[projectName];
        const output: string[] = [
          `╭─ ${project.title} ─╮`,
          `│ ${project.description}`,
          `│`,
          `│ Tech Stack: ${project.tech}`,
          `│`,
          `│ Details:`,
          `│ ${project.details}`,
        ];
        
        if (project.links) {
          output.push(`│`);
          if (project.links.github) {
            output.push(`│ 🔗 GitHub: ${project.links.github}`);
          }
          if (project.links.devpost) {
            output.push(`│ 🔗 DevPost: ${project.links.devpost}`);
          }
        }
        
        output.push(`╰${'─'.repeat(Math.max(project.title.length + 4, 50))}╯`);
        
        setHistory(prev => [...prev, { type: 'output', content: output }]);
      } else {
        setHistory(prev => [...prev, { type: 'error', content: [`cat: ${projectName}: No such file or directory`] }]);
      }
    } else {
      setHistory(prev => [...prev, { type: 'error', content: [`Command not found: ${command}. Type 'help' for available commands.`] }]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setCommandHistory(prev => [...prev, input]);
      setHistoryIndex(-1);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
    
    // Initial welcome message
    setHistory([
      { type: 'output', content: [
        "╔═══════════════════════════════════════════════════════════╗",
        "║                                                           ║",
        "║           Welcome to Andy Duong's Terminal Portfolio      ║", 
        "║                                                           ║",
        "║  Type 'help' to see available commands                    ║",
        "║  Type 'about' to learn more about me                      ║",
        "║                                                           ║",
        "╚═══════════════════════════════════════════════════════════╝",
        ""
      ]}
    ]);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div 
      className="min-h-screen bg-black text-green-400 font-mono text-sm leading-relaxed cursor-text"
      onClick={handleTerminalClick}
    >
      {/* Terminal Header */}
      <div className="bg-gray-800 text-white p-2 flex items-center space-x-2 border-b border-gray-600">
        <div className="flex space-x-1">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <span className="text-sm text-gray-300">andy@portfolio-terminal</span>
      </div>

      {/* Terminal Content */}
      <div 
        ref={terminalRef}
        className="p-4 h-[calc(100vh-2.5rem)] overflow-y-auto"
      >
        {/* History */}
        {history.map((entry, index) => (
          <div key={index} className="mb-1">
            {entry.type === 'command' && (
              <div className="text-blue-400">{entry.content}</div>
            )}
            {entry.type === 'output' && (
              <div className="text-green-400">
                {Array.isArray(entry.content) 
                  ? entry.content.map((line, i) => (
                      <div key={i}>{line}</div>
                    ))
                  : <div>{entry.content}</div>
                }
              </div>
            )}
            {entry.type === 'error' && (
              <div className="text-red-400">
                {Array.isArray(entry.content)
                  ? entry.content.map((line, i) => (
                      <div key={i}>{line}</div>
                    ))
                  : <div>{entry.content}</div>
                }
              </div>
            )}
          </div>
        ))}

        {/* Current Input Line */}
        <div className="flex items-center">
          <span className="text-blue-400 mr-2">{currentPath}$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-transparent outline-none text-green-400 font-mono flex-1"
            autoFocus
            spellCheck={false}
          />
          <span className="animate-pulse text-green-400">█</span>
        </div>
      </div>
    </div>
  );
};

export default Terminal;