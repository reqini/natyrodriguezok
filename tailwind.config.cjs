/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './client/**/*.{js,ts,jsx,tsx}',
    './client/index.html',
  ],
  theme: {
    extend: {
      colors: {
        coral: {
          50: '#fff0ed',
          100: '#ffd6cc',
          400: '#ff7e5f',
          500: '#ff6f61',
          700: '#e55d4a',
        },
        beige: {
          50: '#fdf6ee',
          100: '#f7e9d7',
          200: '#f3e1c7',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out',
        'slide-up': 'slideUp 0.7s cubic-bezier(0.4,0,0.2,1)',
        'slide-left': 'slideLeft 0.7s cubic-bezier(0.4,0,0.2,1)',
        bounce: 'bounce 1.5s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { transform: 'translateY(40px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        slideLeft: {
          '0%': { transform: 'translateX(40px)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
