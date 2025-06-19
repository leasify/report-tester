// Tailwind only scans source files; no root index.html is present
export default {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brandOrange: '#FEB241',
        brandBlue: '#4F758D',
      },
    },
  },
  plugins: [],
}
