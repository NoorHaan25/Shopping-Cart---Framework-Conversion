/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        franklin: ["'Franklin Gothic Medium'", "'Arial Narrow'", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
}
