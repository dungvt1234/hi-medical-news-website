import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // ===== Midnight Luxury Spa palette (pastel sáng) =====
        night: {
          DEFAULT: '#C9B7EA', // Primary background — tím pastel sáng
          2: '#D9CCF5', // Secondary background (cards)
          3: '#BEAAE6', // Footer
        },
        lavender: {
          DEFAULT: '#8E7FB0', // Dusty lavender — icon/text/border trên nền sáng
          soft: '#AEA0CE',
        },
        rose: {
          DEFAULT: '#B98DAD', // Dusty rose — CTA/highlight
          deep: '#A97C9F', // text nhỏ trên nền sáng
        },
        cream: '#F6F0F4', // Warm cream — light sections
        // Text
        ink: {
          DEFAULT: '#3B3157', // Primary text — tối trên nền sáng
          light: '#6E648C', // Secondary text
        },
      },
      fontFamily: {
        heading: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 60px rgba(140, 120, 190, 0.30)',
        card: '0 18px 50px rgba(80, 65, 120, 0.20)',
      },
      borderRadius: {
        '3xl': '20px',
        '4xl': '32px',
        '5xl': '48px',
      },
      borderColor: {
        luxury: 'rgba(90, 72, 130, 0.28)',
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
