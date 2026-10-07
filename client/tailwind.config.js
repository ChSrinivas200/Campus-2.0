/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#F8F5EE',
        ink: '#121212',
        neon: '#CCFF00',
        punch: '#FF5A1F',
        pink: {
          soft: '#FEE7EA',
          vibrant: '#FF4D8D',
        },
        maroon: {
          deep: '#5C1D24',
        },
        yellow: {
          soft: '#FFF5C0',
          punch: '#FFE500',
        },
        blue: {
          soft: '#D4F6FF',
          punch: '#00B2FE',
        },
        lime: {
          soft: '#E4F973',
          volt: '#CCFF00',
        },
        lavender: {
          soft: '#E8DEFF',
          punch: '#8F5BFF',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'Courier New', 'monospace'],
      },
      boxShadow: {
        'brutal-sm': '2px 2px 0px 0px #121212',
        'brutal-btn': '3px 3px 0px 0px #121212',
        'brutal': '4px 4px 0px 0px #121212',
        'brutal-lg': '6px 6px 0px 0px #121212',
        'brutal-xl': '8px 8px 0px 0px #121212',
        'brutal-hover': '6px 6px 0px 0px #121212',
        'brutal-pop': '5px 5px 0px 0px #CCFF00',
        'brutal-orange': '5px 5px 0px 0px #FF5A1F',
      },
      animation: {
        'marquee': 'marquee 22s linear infinite',
        'marquee-reverse': 'marqueeReverse 22s linear infinite',
        'ticker': 'ticker 18s linear infinite',
        'bounce-subtle': 'bounceSubtle 2.5s ease-in-out infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'spin-slow': 'spin 14s linear infinite',
        'float-slow': 'floatSlow 7s ease-in-out infinite',
        'float-medium': 'floatMedium 5s ease-in-out infinite',
        'float-fast': 'floatFast 3.5s ease-in-out infinite',
        'float-reverse': 'floatReverse 6s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeReverse: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        ticker: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-22px) rotate(6deg)' },
        },
        floatMedium: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-16px) rotate(-5deg)' },
        },
        floatFast: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(4deg)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(18px) rotate(-6deg)' },
        }
      }
    },
  },
  plugins: [],
}
