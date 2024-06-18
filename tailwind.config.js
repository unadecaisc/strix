/** @type {import('tailwindcss').Config} */
import flowbite from 'flowbite/plugin'
export default {
  content: [
    './src/**/*.{html,js,svelte,ts}',
    './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}',
  ],
  theme: {
    extend: {},
  },
  plugins: [flowbite()],
};