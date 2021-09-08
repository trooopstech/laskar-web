module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false,
  important: true, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gray: {
          700: "#252525",
          800: "#151515",
          900: "#050505",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
