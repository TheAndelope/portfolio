/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",

  ],
  theme: {
    extend: {
      boxShadow: {
        'custom': '0 10px 20px rgba(0, 0, 0, 0.15), 0 4px 6px rgba(0, 0, 0, 0.1)',
        'border-radius': '0.5rem'
      },
      colors: {
        green: "#107e06",
        primary: "#343b5c",
        secondary: "#ffffff",
        accent: "#fc1256",
        skyblue: "#94a6ff"

      },
      fontSize: {
        title: "5rem",
      },
    },
  },
  plugins: [],
}

