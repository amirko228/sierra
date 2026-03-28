import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sierra: {
          snow: '#fdfcfa',
          oat: '#f5f0e7',
          cream: '#f5f0e7',
          latte: '#e8e2d6',
          mist: '#c8d8d2',
          sage: '#8a9e92',
          moss: '#5c6f60',
          forest: '#3d5247',
          pine: '#3d5247',
          deep: '#2c3a32',
          ink: '#3f3b37',
          clay: '#9c7b5c',
          honey: '#c4a574',
          sand: '#c4a574',
          dusk: '#6b7d8f',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 4px 28px -6px rgba(44, 58, 50, 0.12)',
        lift: '0 12px 40px -12px rgba(44, 58, 50, 0.18)',
        glow: '0 0 60px -10px rgba(138, 158, 146, 0.45)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-12px) scale(1.02)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '33%': { transform: 'translate(2%, -2%)' },
          '66%': { transform: 'translate(-1%, 1%)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.35' },
          '50%': { opacity: '0.55' },
        },
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        drift: 'drift 18s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
