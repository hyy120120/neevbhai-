/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1a6b44',
          foreground: '#ffffff',
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          500: '#22c55e',
          600: '#1a6b44',
          700: '#15573a',
          800: '#11432d',
          900: '#0a2b1c',
        },
        gold: {
          DEFAULT: '#b8960c',
          light: '#d4af37',
          pale: '#f0e68c',
        },
        background: '#fafaf8',
        foreground: '#1a1a18',
        muted: {
          DEFAULT: '#6b7280',
          foreground: '#9ca3af',
        },
        border: '#e5e7eb',
        secondary: {
          DEFAULT: '#d4af37',
          foreground: '#1a1a18',
        },
        card: {
          DEFAULT: '#ffffff',
          foreground: '#1a1a18',
        },
        destructive: {
          DEFAULT: '#ef4444',
          foreground: '#ffffff',
        },
      },
      fontFamily: {
        // CSS variables injected by next/font in layout.tsx
        heading: ['var(--font-cormorant)', 'Georgia', 'serif'],
        paragraph: ['var(--font-lato)', 'sans-serif'],
        display: ['var(--font-playfair)', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.8s ease-out forwards',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp: { from: { opacity: '0', transform: 'translateY(30px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        slideInLeft: { from: { opacity: '0', transform: 'translateX(-30px)' }, to: { opacity: '1', transform: 'translateX(0)' } },
      },
    },
  },
  plugins: [],
};
