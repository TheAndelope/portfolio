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
        'custom': '0 10px 20px rgba(0, 0, 0, 0.15), 0 4px 6px rgba(0, 0, 0, 0.1)',
        'border-radius': '0.5rem'
      },
      colors: {
        green: "#107e06",
        primary: "#343b5c",
        secondary: "#ffffff",
        accent: "#f9ef80",
        skyblue: "#7b8cff",
        subtitle: "#c6a12a"

      },
      fontSize: {
        title: "5rem",
      },
    },
  },
  plugins: [],
}

