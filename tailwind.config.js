const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{hmtl,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: { ...colors },
    },
  },
  plugins: [],
};
