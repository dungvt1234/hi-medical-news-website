import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand — lavender / purple (Hi Medical)
        brand: {
          50: '#f6f4fc',
          100: '#e6e6fa',
          200: '#d8cfe8',
          300: '#b9a8d6',
          400: '#8a6fc0',
          500: '#5e3fa3',
          600: '#4a2886',
          700: '#3a1f6e',
          800: '#2c1754',
          900: '#1f1040',
        },
        // Gold CTA
        gold: {
          DEFAULT: '#d4af37',
          dark: '#b8942f',
          light: '#f7edd0',
        },
        ink: {
          DEFAULT: '#33303f',
          light: '#6b6780',
        },
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"Be Vietnam Pro"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 10px 30px rgba(74,40,134,.10)',
        'card-lg': '0 18px 50px rgba(74,40,134,.16)',
      },
      borderRadius: {
        xl2: '18px',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pop-in': {
          '0%': { opacity: '0', transform: 'scale(.6)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(.8)', opacity: '.7' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
      },
      animation: {
        'fade-up': 'fade-up .5s ease both',
        'pop-in': 'pop-in .25s cubic-bezier(.34,1.56,.64,1) both',
        'pulse-ring': 'pulse-ring 1.6s cubic-bezier(.4,0,.6,1) infinite',
      },
    },
  },
  plugins: [],
};

export default config;
