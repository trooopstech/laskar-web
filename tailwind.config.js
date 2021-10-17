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
          400: "#E2E2E2",
          600: "#2C2C2E",
          700: "#1C1C1E",
          800: "#0B0B0B",
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
