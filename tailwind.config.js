/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/index.html', './src/**/*.{html,js}'],
  future: {},
  theme: {
    extend: {
      screens: {
        'dark': {'raw': '(prefers-color-scheme:dark)'}
      }
    },
  },
  variants: {},
  plugins: [],
}

