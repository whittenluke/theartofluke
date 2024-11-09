/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Space-specific colors only
        space: {
          dark: '#0A0F1C',      // Darker base for deep space
          darker: '#050810',    // Even darker for contrast
          star: '#F7FAFC',      // Bright white for stars
          nebula: '#6B46C1',    // Purple nebula base
          'nebula-light': '#805AD5',  // Lighter nebula areas
          'nebula-dark': '#553C9A',   // Darker nebula areas
          'planet-1': '#F6AD55', // Orange planet
          'planet-2': '#4299E1', // Blue planet
          'aurora': '#68D391',   // Green aurora effects
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-out': 'fadeOut 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'parallax-slow': 'parallax 25s linear infinite',
        'parallax-medium': 'parallax 15s linear infinite',
        'parallax-fast': 'parallax 10s linear infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
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
        twinkle: {
          '0%, 100%': { opacity: 0.2 },
          '50%': { opacity: 1 },
        },
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
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
