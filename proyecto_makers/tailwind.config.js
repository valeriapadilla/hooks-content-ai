/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8b5cf6',
          dark: '#6d28d9',
          light: '#a78bfa',
        },
        accent: '#ec4899',
        bg: {
          DEFAULT: '#0a0a0a',
          secondary: '#1a1a1a',
        },
        text: {
          DEFAULT: '#ffffff',
          secondary: '#b0b0b0',
        },
      },
      animation: {
        'pulse-slow': 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}

