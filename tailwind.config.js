/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    './components/**/*.{html,ts}'
  ],
  theme: {
    extend: {
      animation: {
        'bounce-slow': 'bounce 3s linear infinite ',
      },
    },
  },
  plugins: [],
}

