import type { Config } from "tailwindcss";

/**
 * HiHSK "Stadium Night" theme.
 *
 * Every palette the app uses is driven by CSS variables declared in globals.css:
 *   --c-<palette>-<shade>  backgrounds, borders, rings, gradients
 *   --t-<palette>-<shade>  text, icons (fill/stroke), placeholders
 * The dark theme is the default; [data-theme="light"] on <html> swaps every variable,
 * so existing classes such as `bg-white`, `text-slate-900` or `bg-blue-600` re-skin
 * automatically in both themes.
 */

const SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;

function ramp(prefix: "c" | "t", palette: string) {
  return Object.fromEntries(
    SHADES.map((s) => [s, `rgb(var(--${prefix}-${palette}-${s}) / <alpha-value>)`])
  );
}

// Tailwind palette name -> token palette
const ALIASES: Record<string, string> = {
  slate: "slate",
  gray: "slate",
  zinc: "slate",
  neutral: "slate",
  stone: "slate",
  blue: "blue",
  primary: "blue",
  orange: "orange",
  emerald: "emerald",
  green: "emerald",
  rose: "rose",
  red: "rose",
  amber: "amber",
  yellow: "amber",
  violet: "violet",
  purple: "violet",
  indigo: "violet",
  fuchsia: "violet",
  sky: "sky",
  cyan: "sky",
  teal: "sky",
  pink: "pink",
};

function palettes(prefix: "c" | "t") {
  return Object.fromEntries(
    Object.entries(ALIASES).map(([name, token]) => [name, ramp(prefix, token)])
  );
}

const base = {
  transparent: "transparent",
  current: "currentColor",
  inherit: "inherit",
  black: "rgb(0 0 0 / <alpha-value>)",
  // Brand tokens
  night: "rgb(var(--night) / <alpha-value>)",
  surface: "rgb(var(--surface) / <alpha-value>)",
  raised: "rgb(var(--raised) / <alpha-value>)",
  line: "rgb(var(--line) / <alpha-value>)",
  ink: "rgb(var(--ink) / <alpha-value>)",
  blaze: "rgb(var(--c-blue-500) / <alpha-value>)",
};

const backgroundPalette = {
  ...base,
  ...palettes("c"),
  // Cards written as `bg-white` become the raised surface in dark mode
  white: "rgb(var(--surface) / <alpha-value>)",
};

const textPalette = {
  ...base,
  ...palettes("t"),
  white: "rgb(255 255 255 / <alpha-value>)",
  onaccent: "rgb(var(--ink) / <alpha-value>)",
  ink: "rgb(var(--ink) / <alpha-value>)",
};

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: backgroundPalette,
    textColor: textPalette,
    placeholderColor: textPalette,
    fill: textPalette,
    stroke: textPalette,
    caretColor: textPalette,
    accentColor: { ...textPalette, auto: "auto" },
    textDecorationColor: textPalette,
    extend: {
      fontFamily: {
        sans: [
          "Barlow",
          "Noto Sans SC",
          "PingFang SC",
          "Microsoft YaHei",
          "system-ui",
          "sans-serif",
        ],
        display: [
          '"Barlow Condensed"',
          "Barlow",
          "Noto Sans SC",
          "Microsoft YaHei",
          "sans-serif",
        ],
      },
      borderRadius: {
        card: "14px",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0", transform: "translateY(4px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.92)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "20%": { transform: "translateX(-7px)" },
          "40%": { transform: "translateX(6px)" },
          "60%": { transform: "translateX(-4px)" },
          "80%": { transform: "translateX(2px)" },
        },
        rise: {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        sweep: {
          "0%": { transform: "scaleX(0)", transformOrigin: "left" },
          "55%": { transform: "scaleX(1)", transformOrigin: "left" },
          "56%": { transform: "scaleX(1)", transformOrigin: "right" },
          "100%": { transform: "scaleX(0)", transformOrigin: "right" },
        },
        "bar-fill": {
          from: { transform: "scaleX(0)" },
          to: { transform: "scaleX(1)" },
        },
        "flame-flicker": {
          "0%, 100%": { transform: "scale(1) rotate(-2deg)" },
          "50%": { transform: "scale(1.08) rotate(2deg)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.22s ease-out both",
        "fade-in": "fadeIn 0.22s ease-out both",
        "scale-in": "scale-in 0.24s cubic-bezier(0.2, 0.9, 0.3, 1.2) both",
        shake: "shake 0.42s ease-in-out",
        rise: "rise 0.38s cubic-bezier(0.2, 0.8, 0.2, 1) both",
        sweep: "sweep 0.7s cubic-bezier(0.6, 0, 0.2, 1) both",
        "bar-fill": "bar-fill 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) both",
        flame: "flame-flicker 1.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
