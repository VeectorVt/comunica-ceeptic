/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        brand: {
          blue: '#3B82F6',
          'blue-dark': '#1E3A5F',
          red: '#EF4444',
          'red-light': '#F87171',
          teal: '#14B8A6',
          'teal-dark': '#0D9488',
          orange: '#F97316',
          'orange-light': '#FB923C',
          navy: '#0F172A',
          'navy-light': '#1E293B',
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
