// /** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      aspectRatio: {
        "4/3": "4 / 3",
      },

      gridTemplateColumns: {
        fluid: "repeat(auto-fit, minmax(20rem, 1fr))",
      },
    },
    screens: {
      sm: "480px",

      md: "768px",

      lg: "1024px",

      xl: "1280px",
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
