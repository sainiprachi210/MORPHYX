/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: '#050711',
          card: '#0a0e24',
          surface: '#111736',
          border: 'rgba(0, 240, 255, 0.25)',
          neonCyan: '#00f0ff',
          neonPurple: '#9d4edd',
          neonPink: '#ff007f',
          matrixGreen: '#00ff88',
          electricGold: '#ffd166',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Orbitron', 'sans-serif'],
        mono: ['Rajdhani', 'monospace'],
      },
      boxShadow: {
        'neon-cyan': '0 0 20px rgba(0, 240, 255, 0.45)',
        'neon-purple': '0 0 25px rgba(157, 78, 221, 0.45)',
        'cyber-card': '0 8px 32px 0 rgba(0, 0, 0, 0.6), inset 0 0 0 1px rgba(0, 240, 255, 0.15)',
      },
      animation: {
        'pulse-glow': 'pulseGlow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.9' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};
