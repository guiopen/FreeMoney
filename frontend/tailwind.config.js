/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'project-blue': '#3298ab',
        'project-hover-blue': '#8eceda',
        'background-blue': '#D8FDFF',
      },
      margin: {
        '300': '300px',
        '200': '200px',
        '100': '100px'
      },
      height: {
        '100': '25rem',
        '110': '27rem',
      },
      width: {
        '100': '25rem',
        '110': '27rem',
      }
    },
  },
  plugins: [],
}

