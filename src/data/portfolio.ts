import { PortfolioData } from '../types';

export const portfolioData: PortfolioData = {
  name: "andy duong",
  title: "aspiring data scientist, machine learning dev",
  tagline: "relentless by design.",
  location: "waterloo, canada",
  menuItems: [
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
      id: 'notes',
      label: 'notes',
      icon: '→',
      content: ''
    },
    {
      id: 'cool things',
      label: 'cool things',
      icon: '→',
      content: ''
    },
  ]
};