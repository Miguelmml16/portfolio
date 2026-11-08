import type { Config } from "tailwindcss";

// Monochrome design tokens. Every color resolves to a CSS variable defined in
// globals.css, so night mode and the inverted `theme-ink` sections only swap
// variables — components never need dark: variants.
const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: token("bg"),
        fg: token("fg"),
        muted: token("muted"),
        subtle: token("subtle"),
        line: token("line"),
        surface: token("surface"),
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        display: ["clamp(3.25rem, 9vw, 8.5rem)", { lineHeight: "0.9" }],
        title: ["clamp(2.25rem, 5vw, 4rem)", { lineHeight: "0.95" }],
      },
      maxWidth: {
        page: "76rem",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "marquee-reverse": "marquee 40s linear infinite reverse",
      },
    },
  },
  plugins: [],
};

export default config;
