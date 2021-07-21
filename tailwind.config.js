module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        '48': '12.5rem',
        '72': '18.75rem',
      },
      height: {
        '60vh': '60vh',
        '80vh': '80vh',
      },
      inset: {
        '10%': '10%',
        '20%': '20%',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
