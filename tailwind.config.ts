import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // ===== Midnight Luxury Spa palette =====
        night: {
          DEFAULT: '#171D35', // Primary background
          2: '#272744', // Secondary background (cards)
          3: '#151728', // Footer
        },
        lavender: {
          DEFAULT: '#C2B3D4', // Dusty lavender — icon/border/hover (nhạt hơn)
          soft: '#D2C5E2',
        },
        rose: {
          DEFAULT: '#D7BFD0', // Soft dusty rose — CTA/highlight
          deep: '#C4A6BC',
        },
        cream: '#F1E9ED', // Warm cream — light sections
        // Text
        ink: {
          DEFAULT: '#F8F4F7', // Primary text
          light: '#B9B1C1', // Secondary text
        },
      },
      fontFamily: {
        heading: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 60px rgba(194, 179, 212, 0.20)',
        card: '0 18px 50px rgba(9, 11, 24, 0.35)',
      },
      borderRadius: {
        '3xl': '20px',
        '4xl': '32px',
        '5xl': '48px',
      },
      borderColor: {
        luxury: 'rgba(215, 191, 208, 0.25)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slow-zoom': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.06)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(.8)', opacity: '.7' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
      },
      animation: {
        'fade-up': 'fade-up .9s cubic-bezier(.22,1,.36,1) both',
        'slow-zoom': 'slow-zoom 1.6s cubic-bezier(.22,1,.36,1) both',
        'pulse-ring': 'pulse-ring 1.8s cubic-bezier(.4,0,.6,1) infinite',
      },
    },
  },
  plugins: [],
};

export default config;
