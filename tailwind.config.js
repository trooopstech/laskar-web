module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false,
  important: true, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ["Roboto", "sans-serif"],
    },
    extend: {
      width: {
        120: "26rem",
      },
      colors: {
        gray: {
          100: "#F8F8F8",
          200: "#E2E2E2",
          300: "#C4C4C4",
          400: "#989898",
          500: "#838487",
          600: "#545456",
          700: "#2C2C2E",
          800: "#252529",
          900: "#1C1C1E",
          1000: "#111212",
          modal: "#252529",
        },
      },
    },
  },
  variants: {
    extend: {
      margin: ["hover", "focus", "first", "last"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
