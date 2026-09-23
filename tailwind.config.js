/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          950: '#020b14', // deepest abyss
          900: '#031422', // dark navy oceanic
          850: '#031B2E', // primary deep ocean blue
          800: '#062640',
          700: '#0c3b5e',
          600: '#145380',
          500: '#1d71a8',
          400: '#2b96d6',
          300: '#5ab6eb',
          200: '#9cd6f7',
          100: '#d7effc',
        },
        marine: {
          dark: '#06111C',
          base: '#031B2E',
          surface: '#0a233a',
          card: 'rgba(3, 27, 46, 0.75)',
          border: 'rgba(103, 217, 232, 0.18)',
        },
        cyan: {
          accent: '#67D9E8',
          glow: '#42c5d8',
          subtle: 'rgba(103, 217, 232, 0.12)',
        },
        sonar: {
          amber: '#e59d3b',
          glow: '#f3b458',
          green: '#22c55e',
          alert: '#f59e0b',
          danger: '#ef4444',
        }
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'sonar-sweep': 'sweep 4s linear infinite',
        'boat-bob': 'bob 6s ease-in-out infinite',
        'water-drift': 'drift 20s ease-in-out infinite alternate',
      },
      keyframes: {
        bob: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-8px) rotate(0.8deg)' },
        },
        drift: {
          '0%': { transform: 'scale(1.02) translate(0px, 0px)' },
          '100%': { transform: 'scale(1.08) translate(-15px, -10px)' },
        }
      }
    },
  },
  plugins: [],
}
