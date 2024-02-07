/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: '15px',
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '960px',
      xl: '1200px',
    },
    extend: {
      colors: {
        primary: '#1a1a1a',
        secondary: '#393A47',
        accent: '#4452fb',
      },
      backgroundImage: {
        explosion: 'url("/bg-explosion.png")',
        circles: 'url("/bg-circles.png")',
        circleStar: 'url("/circle-star.svg")',
        site: 'url("/site-bg.svg")',
      },

      keyframes: {
        
        blink: {
          '90%': {
            transform: 'none',
            animationTimingFunction: 'ease-in',
          },
          '93%': {
            transform: 'translateY(25px) scaleY(0)',
          },
          '100%': {
            animationTimingFunction: 'ease-out',
          },
        },

        
        move: {
          '0%': {
            transform:'translateX(-3px) translateY(3px) scale(0.99)',
          },
          '20%': {
            transform: 'translateX(-10px) translateY(10px) scale(0.95)',
          },
          '25%, 44%': {
            transform: 'none',
          },
          '50%, 60%': {
            transform: 'translateX(10px) translateY(-10px) scale(0.95)',
          },
          '66%, 100%': {
            transform: 'none',
          },
        },


      },

      animation: {
        'spin-slow': 'spin 6s linear infinite',
         vblink: 'blink 5s',
         vmove: 'move 8s infinite'

      },
      
      fontFamily: {
        inter: [`var(--font-inter)`, 'sans-serif'],
      },


    }, 
    // Extend


  },
   // theme
   
  container: {
    padding: {
      DEFAULT: '15px',
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
