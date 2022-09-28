/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#a30041',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
