/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,tsx,jsx}',
    './components/**/*.{js,ts,tsx,jsx}',
    './pages/**/*.{js,ts,tsx,jsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        HantenGrotesk: ['Hanten_Grotesk', 'sans-serif'],
        Inter: ['Inter', 'sans-serif'],
        Rubik: ['Rubik', 'sans-serif'],
      },
      colors: {
        darkBlue: {
          DEFAULT: '#081b33',
        },
        peach: {
          DEFAULT: '#d8b4fe',
        },
      },
      screens: {
        bsm: {
          min: '350px',
        },
      },
    },
  },
  plugins: [],
};
