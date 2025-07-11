import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',

  content: [
    './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
    './storage/framework/views/*.php',
    './resources/views/**/*.blade.php',
    './resources/js/**/*.tsx',
    './resources/js/**/*.jsx',
  ],

  theme: {
    extend: {
      colors: {
        'primary': '#465fff',
      },
      fontFamily: {
        'poppins': ['Poppins']
      }
    },
  },

  plugins: [forms],
};
