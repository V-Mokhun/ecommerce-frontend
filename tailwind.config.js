/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          25: "hsl(var(--primary-25))",
          50: "hsl(var(--primary-50))",
          75: "hsl(var(--primary-75))",
          100: "hsl(var(--primary-100))",
          200: "hsl(var(--primary-200))",
          300: "hsl(var(--primary-300))",
          DEFAULT: "hsl(var(--primary))",
          500: "hsl(var(--primary-500))",
          600: "hsl(var(--primary-600))",
          700: "hsl(var(--primary-700))",
          900: "hsl(var(--primary-900))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          100: "hsl(var(--secondary-100))",
          200: "hsl(var(--secondary-200))",
          300: "hsl(var(--secondary-300))",
          DEFAULT: "hsl(var(--secondary))",
          500: "hsl(var(--secondary-500))",
          600: "hsl(var(--secondary-600))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        gray: {
          50: "hsl(0, 0%, 98%)",
          100: "hsl(0, 0%, 96%)",
          200: "hsl(0, 0%, 93%)",
          300: "hsl(0, 0%, 80%)",
          400: "hsl(0, 0%, 71%)",
          500: "hsl(0, 0%, 62%)",
          600: "hsl(0, 0%, 44%)",
          700: "hsl(0, 0%, 31%)",
          800: "hsl(0, 0%, 27%)",
          900: "hsl(0, 0%, 18%)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          light: "hsl(var(--destructive-light))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          light: "hsl(var(--success-light))",
          foreground: "hsl(var(--success-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      shadow: {
        sm: "-2px 2px 20px -1px rgb(113 113 113 / 0.2)",
        md: "-2px 2px 15px -1px rgb(113 113 113 / 0.12)",
        lg: "-2px 2px 10px -1px rgb(113 113 113 / 0.15)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      maxWidth: {
        container: "1248px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontSize: {
        xs: ["0.75rem", "normal"],
        sm: ["0.875rem", "normal"],
        base: ["1rem", "normal"],
        lg: ["1.125rem", "normal"],
        xl: ["1.25rem", "normal"],
        "2xl": ["1.5rem", "normal"],
        "3xl": ["1.875rem", "normal"],
        "4xl": ["2.25rem", "normal"],
        "5xl": ["3rem", "normal"],
        "6xl": ["3.75rem", "normal"],
        "7xl": ["4.5rem", "normal"],
        "8xl": ["6rem", "normal"],
        "9xl": ["8rem", "normal"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
