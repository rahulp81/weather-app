/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.html','./index.html', './src/**/*.js', './src/**/*.jsx', './src/**/*.ts', './src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        'primary-100': '#1E213A',
        'primary-200':'#100E1D',
        'accent-100':'#E7E7EB',
        'accent-200': '#88869D',

      },
      fontFamily: {
        sans: ['Raleway', 'sans-serif'],
      },
      boxShadow: {
        'button': '0px 4px 4px 0px #00000040',
      },
    },
  },
  plugins: [],
}

