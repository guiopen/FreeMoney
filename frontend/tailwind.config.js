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
    },
  },
  plugins: [],
}

