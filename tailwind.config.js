/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Scene-specific colors
        mountain: {
          peak: '#4A5568',
          base: '#2D3748',
          tree: '#276749',
          water: '#2B6CB0',
        },
        beach: {
          sand: '#F6E05E',
          water: '#4299E1',
          deep: '#2C5282',
        },
        space: {
          dark: '#1A202C',
          star: '#F7FAFC',
          nebula: '#6B46C1',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-out': 'fadeOut 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'parallax-slow': 'parallax 25s linear infinite',
        'parallax-medium': 'parallax 15s linear infinite',
        'parallax-fast': 'parallax 10s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        parallax: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-100%)' },
        },
      },
      transitionTimingFunction: {
        'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
      screens: {
        'xs': '475px',
        'tall': { 'raw': '(min-height: 800px)' },
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      height: {
        'screen-50': '50vh',
        'screen-75': '75vh',
        'screen-90': '90vh',
      },
    },
  },
  plugins: [],
}
