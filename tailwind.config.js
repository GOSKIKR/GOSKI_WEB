/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff5fe",
          100: "#e2ebfd",
          200: "#cbdafa",
          300: "#abc1f6",
          400: "#899ff0",
          500: "#697be7",
          600: "#515bda",
          700: "#4248c0",
          800: "#383e9b",
          900: "#343b7b",
          950: "#1e2048",
        },
      },
    },
    fontFamily: {
      sans: ["Pretendard-Regular", "sans-serif"],
    },
  },
  plugins: [],
};
