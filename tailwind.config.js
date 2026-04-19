/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
],
  theme: {
    extend: {
      fontFamily: {
        cocomat: ['CocomatPro', 'sans-serif'],
      },
       colors: {
        'studio-green': '#055651',
        'studio-pink': '#facdd5',
        },
    },
  },
  plugins: [],
}