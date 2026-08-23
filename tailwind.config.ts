import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // ===== Hi Medical — Medical Luxury Lavender Glow palette =====
        night: {
          DEFAULT: '#F5F1FA', // Lavender White — nền chính (60%)
          2: '#FFFFFF', // White — card/section phụ
          3: '#8B5FC7', // Violet — footer
        },
        lavender: {
          DEFAULT: '#8B5FC7', // Violet — thương hiệu (10%)
          soft: '#A982D8', // Lavender (25%)
        },
        rose: {
          DEFAULT: '#8B5FC7', // Violet — CTA chính
          deep: '#7A4FB3', // Violet đậm — hover / text nhỏ
        },
        gold: '#E8C95A', // Champagne Gold — điểm nhấn (5%)
        cream: '#D8C8F0', // Soft Lavender — section nhẹ
        // Text
        ink: {
          DEFAULT: '#302642', // Deep Purple — text chính
          light: '#6E6285', // Text phụ
        },
      },
      fontFamily: {
        heading: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 60px rgba(139, 95, 199, 0.22)',
        card: '0 18px 50px rgba(48, 38, 66, 0.14)',
      },
      borderRadius: {
        '3xl': '20px',
        '4xl': '32px',
        '5xl': '48px',
      },
      borderColor: {
        luxury: 'rgba(139, 95, 199, 0.25)',
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
