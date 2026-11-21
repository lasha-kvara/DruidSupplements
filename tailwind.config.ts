import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", md: "2rem" },
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        forest: {
          DEFAULT: "#1B3022",
          50: "#EEF3EF",
          100: "#D5E2D8",
          200: "#A9C3AF",
          300: "#7A9F83",
          400: "#4E7559",
          500: "#2E4D38",
          600: "#1B3022",
          700: "#14241A",
          800: "#0E1912",
        },
        parchment: {
          DEFAULT: "#F7F5F0",
          dark: "#EDE8DD",
          deeper: "#E2DACB",
        },
        terracotta: {
          DEFAULT: "#C86D51",
          light: "#E09A82",
          dark: "#A85540",
          50: "#FBEFEA",
        },
        charcoal: {
          DEFAULT: "#1F2421",
          soft: "#4A524D",
          muted: "#6F7772",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        // Headings use the same family (FiraGO) at heavier weights; kept as a separate token so a display font can be swapped in.
        serif: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(27, 48, 34, 0.18)",
        lift: "0 24px 60px -20px rgba(27, 48, 34, 0.35)",
      },
      keyframes: {
        "pulse-ring": {
          "0%": { transform: "scale(1)", opacity: "0.55" },
          "100%": { transform: "scale(1.7)", opacity: "0" },
        },
      },
      animation: {
        "pulse-ring": "pulse-ring 2.2s cubic-bezier(0.2, 0.6, 0.4, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
