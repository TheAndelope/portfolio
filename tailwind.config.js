/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",

  ],
  theme: {
    extend: {
      colors: {
        green: "#107e06",
        primary: "#343b5c",
        secondary: "#ffffff",
        accent: "#fc1256",
      },
      fontSize: {
        title: "5rem",
      },
    },
  },
  plugins: [],
}

