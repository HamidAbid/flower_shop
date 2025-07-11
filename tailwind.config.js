/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F7C4CD',
        'primary-dark': '#E9A6B0',
        'primary-100': '#FDF2F4',
        'primary-50': '#FEF6F8',
        'primary-800': '#C45A6A',
        secondary: '#8F7240',
        'secondary-dark': '#7A6136',
        accent: '#8F7240',
        text: '#8F7240'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 