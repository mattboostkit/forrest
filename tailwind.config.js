/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-light': '#e5e7eb',
      },
      letterSpacing: {
        'tighter-custom': '-0.075em',
        'tightest': '-0.075em',
      },
    },
  },
  plugins: [],
}