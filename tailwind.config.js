/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#1E40AF', // Changed from teal to a vibrant blue
        'primary-light': '#DBEAFE',
        'secondary': '#6D28D9', // Added purple as secondary color
        'secondary-light': '#EDE9FE',
        'accent': '#F59E0B', // Added amber as accent color
        'accent-light': '#FEF3C7',
        'success': '#10B981', // Added success color
        'error': '#EF4444', // Added error color
        'neutral': '#6B7280', // Added neutral color
      },
      letterSpacing: {
        'tighter-custom': '-0.075em',
        'tightest': '-0.075em',
      },
    },
  },
  plugins: [],
}
