/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#8849EE",
        content: "#343a40",
        error: "#EE5749",
      },
    },
  },
  plugins: [],
};
