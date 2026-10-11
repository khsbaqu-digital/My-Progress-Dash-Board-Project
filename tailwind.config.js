/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sedra: {
          purple: '#6F4E7C',
          'purple-light': '#f3edf5',
          green: '#8DAA91',
          cream: '#F8F5F1',
          gold: '#C9A96A',
          pink: '#D8A6D1',
          dark: '#32463C',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans Arabic', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
