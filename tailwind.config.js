/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bright: {
          bg: '#FDFBF7',
          card: '#FFFFFF',
          border: '#E7E0D3',
          text: '#1C1917',
          emerald: '#059669',
          emeraldLight: '#ECFDF5',
          amber: '#D97706',
          amberLight: '#FEF3C7',
          blue: '#0284C7',
          blueLight: '#E0F2FE',
          rose: '#E11D48',
          roseLight: '#FFE4E6'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        display: ['"Outfit"', 'sans-serif']
      }
    },
  },
  plugins: [],
}
