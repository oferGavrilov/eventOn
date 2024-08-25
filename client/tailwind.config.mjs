/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{mjs,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        'primary': '#8dc2fa',
        'secondary': '#ffed4a',
        'danger': '#e3342f',
      }
    }
  },
  plugins: []
}
