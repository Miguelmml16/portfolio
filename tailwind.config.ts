import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark, elegant base
        ink: {
          950: "#0a0a0b",
          900: "#101012",
          800: "#17171a",
          700: "#1f1f23",
          600: "#2a2a30",
        },
        // Crimson / maroon accent
        crimson: {
          400: "#f2556b",
          500: "#e11d48",
          600: "#be123c",
          700: "#9f1239",
          800: "#7d0f2e",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "0.7" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse-slow 5s ease-in-out infinite",
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(225, 29, 72, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
