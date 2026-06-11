/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0A0A14',
        accent: '#7B61FF',
        secondary: '#F0EFF4',
        graphite: '#18181B'
      },
      fontFamily: {
        sans: ['Sora', 'sans-serif'],
        serif: ['"Instrument Serif"', 'serif'],
        mono: ['"Fira Code"', 'monospace'],
      },
      boxShadow: {
        'glow': '0 0 20px rgba(123, 97, 255, 0.5)',
      }
    },
  },
  plugins: [],
}
