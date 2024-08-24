/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",

  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Noto Sans', 'sans-serif'],
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      boxShadow: {
        'glow': '0 0 30px rgba(247, 231, 160, 0.7)',
        'softglow': '0 0 10px rgba(247, 231, 160, 0.5)',
        'custom': '0 10px 20px rgba(0, 0, 0, 0.15), 0 4px 6px rgba(0, 0, 0, 0.1)',
        'border-radius': '0.5rem'
      },
      colors: {
        primary: "#000A1D",
        secondary: "#F7E7A0",
        accent: "#2d3d3d",
        text: "#ECF0F1"
      },
      fontSize: {
        title: "5rem",
      },
    },
  },
  plugins: [],
}

