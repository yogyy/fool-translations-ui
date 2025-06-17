/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ['class'],
  content: ['./src/**/*.{html,js,svelte,ts}'],
  safelist: ['dark'],
  theme: {
    container: {
      center: true,
      padding: '.75rem',
      screens: {
        '2xl': '1200px'
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
};

export default config;
