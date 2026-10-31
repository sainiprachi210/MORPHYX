/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        urban: {
          olive: '#252923', // Deep olive charcoal — main dark surfaces & navigation
          sand: '#D6C7A1', // Warm sand — highlights & selected elements
          sage: '#78836B', // Muted sage — secondary accents
          terracotta: '#A65F43', // Terracotta — important actions & warm accents
          ivory: '#E8E4D9', // Warm ivory — primary text & light surfaces
          stone: '#AAA99D', // Stone grey — secondary text
          panel: '#30352E', // Dark panel — HUD & interface panels
          border: 'rgba(214, 199, 161, 0.2)', // Subtle sand border
          borderMuted: 'rgba(120, 131, 107, 0.25)',
        },
        // Backwards compatibility alias
        cyber: {
          dark: '#252923',
          card: '#30352E',
          surface: '#30352E',
          border: 'rgba(214, 199, 161, 0.25)',
          neonCyan: '#D6C7A1',
          neonPurple: '#78836B',
          neonPink: '#A65F43',
          matrixGreen: '#78836B',
          electricGold: '#D6C7A1',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'urban-sm': '0 2px 8px 0 rgba(0, 0, 0, 0.25)',
        'urban-panel': '0 12px 32px -4px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(214, 199, 161, 0.15)',
        'urban-button': '0 4px 14px 0 rgba(166, 95, 67, 0.35)',
        // Retain alias for existing utility references
        'neon-cyan': '0 4px 16px rgba(214, 199, 161, 0.25)',
        'neon-purple': '0 4px 16px rgba(120, 131, 107, 0.25)',
        'cyber-card': '0 12px 32px -4px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(214, 199, 161, 0.15)',
      },
    },
  },
  plugins: [],
};
