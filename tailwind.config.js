/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        game: {
          bg: '#1a1a2e',
          primary: '#e94560',
          secondary: '#0f3460',
          accent: '#16213e',
        },
      },
    },
  },
  plugins: [],
};
