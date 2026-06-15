import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "oklch(0.55 0.15 250)",
          ink: "oklch(0.99 0 0)",
        },
        pay: {
          DEFAULT: "oklch(0.58 0.13 150)",
          ink: "oklch(0.99 0 0)",
        },
      },
      fontFamily: {
        ui: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        mono: ["var(--font-space-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
