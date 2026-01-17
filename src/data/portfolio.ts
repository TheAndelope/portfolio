import { PortfolioData } from '../types';

export const portfolioData: PortfolioData = {
  name: "andy duong",
  title: "developer",
  tagline: "building digital experiences that matter",
  location: "waterloo, canada",
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