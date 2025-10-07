/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'racing': ['"Racing Sans One"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}