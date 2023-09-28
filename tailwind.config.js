/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          25: "#E4EEFE",
          50: "#AECDFB",
          75: "#78ABF9",
          100: "#428AF6",
          200: "#2779F5",
          300: "#0951BE",
          400: "#0C68F4",
          500: "#063A88",
          600: "#052E6D",
          700: "#042352",
          900: "#021736",
        },
        secondary: {
          100: "#FDDBC9",
          200: "#FAB793",
          300: "#F68242",
          400: "#F45E0C",
          500: "#BE4909",
          600: "#883406",
        },
        dark: "#0C0C0C",
        gray: {
          50: "#F9F9F9",
          100: "#F6F6F6",
          200: "#EDEDED",
          300: "#CBCBCB",
          400: "#B4B4B4",
          500: "#9E9E9E",
          600: "#717171",
          700: "#505050",
          800: "#444444",
          900: "#2D2D2D",
        },
        error: {
          DEFAULT: "#C91433",
          light: "#FAE7EB",
        },
        success: {
          DEFAULT: "#198754",
          light: "#D1F7E5",
        },
      },
      shadow: {
        sm: "-2px 2px 20px -1px rgb(113 113 113 / 0.2)",
        md: "-2px 2px 15px -1px rgb(113 113 113 / 0.12)",
        lg: "-2px 2px 10px -1px rgb(113 113 113 / 0.15)",
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
