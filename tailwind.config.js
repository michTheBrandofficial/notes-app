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
      },
      colors: {
        darkBlue: {
          DEFAULT: '#081b33',
        },
      },
    },
  },
  plugins: [],
};
