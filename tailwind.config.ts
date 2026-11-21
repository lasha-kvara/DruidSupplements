import type { Config } from "tailwindcss";

const v = (name: string) => `rgb(var(--c-${name}) / <alpha-value>)`;

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  // `dark:` variants follow the data-theme attribute set by the theme toggle (src/components/layout/ThemeToggle.tsx)
  darkMode: ["selector", '[data-theme="dark"]'],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
      screens: { "2xl": "1280px" },
    },
    extend: {
      /**
       * Theme-aware colors are CSS variables (src/app/globals.css: light on :root, dark on [data-theme="dark"]),
       * written as "R G B" so opacity modifiers like bg-forest/10 keep working.
       * - forest / parchment / charcoal / surface / terracotta-50|dark  → switch with the theme
       * - pine / cream / forest-600..800                                 → fixed brand colors (dark sections, text on them)
       */
      colors: {
        forest: {
          DEFAULT: v("forest"),
          50: v("forest-50"),
          100: v("forest-100"),
          200: v("forest-200"),
          300: v("forest-300"),
          400: v("forest-400"),
          500: v("forest-500"),
          600: "#1B3022",
          700: "#14241A",
          800: "#0E1912",
        },
        /** Fixed dark green for sections, buttons and active pills — dark in both themes */
        pine: { DEFAULT: "#1B3022", light: "#2E4D38" },
        /** Fixed light text used on pine / photos — light in both themes */
        cream: "#F7F5F0",
        parchment: {
          DEFAULT: v("parchment"),
          dark: v("parchment-dark"),
          deeper: v("parchment-deeper"),
        },
        /** Cards, inputs, popovers (white in light mode) */
        surface: v("surface"),
        terracotta: {
          DEFAULT: "#C86D51",
          light: "#E09A82",
          /** Same hue, darker: white text on it passes WCAG AA (4.8:1) — buttons and badges */
          deep: "#AE5B42",
          dark: v("terracotta-dark"),
          50: v("terracotta-50"),
        },
        charcoal: {
          DEFAULT: v("charcoal"),
          soft: v("charcoal-soft"),
          muted: v("charcoal-muted"),
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
        soft: "0 10px 40px -12px rgb(var(--c-shadow) / 0.18)",
        lift: "0 24px 60px -20px rgb(var(--c-shadow) / 0.35)",
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
