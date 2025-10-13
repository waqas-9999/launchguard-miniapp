/** @type {import('tailwindcss/defaultTheme')} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      screens: {
        sm: "640px",   // fixed typo: "640p" → "640px"
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Open Sans", ...defaultTheme.fontFamily.sans],
        onest: ["Onest", "sans-serif"],
        grotesk: ["Space Grotesk", "sans-serif"],
      },
      colors: {
        primary: "#efb81c",
        secondary: "#191F24",
        dark: "#1a2025",
        highlight: "#F9FF38", // used for yellow text like "Remittix"
      },
    },
  },
  plugins: [],
};
