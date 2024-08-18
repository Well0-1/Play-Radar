/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    listStyleType: {
      disc: "disc",
      square: "square",
    },
    fontFamily: {
      inter: ["Inter", "sans-serif"],
      cairo: ["Cairo", "sans-serif"],
    },
  },
  plugins: [],
};
