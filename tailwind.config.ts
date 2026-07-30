import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          pink: "#F00A78",
          "pink-light": "#F5288A",
          "pink-dark": "#D00868",
          yellow: "#FACC15",
          "yellow-light": "#FCDB4D",
          cyan: "#00A0DC",
          "cyan-light": "#14B4F0",
        },
        dark: {
          bg: "#0A0A0F",
          card: "#12121A",
          border: "#1E1E2A",
        },
        primary: {
          DEFAULT: "#F00A78",
          light: "#F5288A",
          dark: "#D00868",
        },
        secondary: {
          DEFAULT: "#FACC15",
          light: "#FCDB4D",
        },
        accent: "#00A0DC",
        success: "#10B981",
        orange: "#F97316",
        yellow: "#FACC15",
        white: "#FFFFFF",
        gray: {
          light: "#E2E8F0",
          DEFAULT: "#94A3B8",
          dark: "#64748B",
        },
      },
      fontFamily: {
        display: ["Inter", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "mesh-grid":
          "linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        "glass-sm": "0 4px 16px 0 rgba(31, 38, 135, 0.25)",
        glow: "0 0 20px rgba(240, 10, 120, 0.15)",
        "glow-lg": "0 0 40px rgba(240, 10, 120, 0.25)",
        "glow-yellow": "0 0 20px rgba(250, 204, 21, 0.15)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.5s ease-out forwards",
        "slide-down": "slideDown 0.3s ease-out forwards",
        "scale-in": "scaleIn 0.3s ease-out forwards",
        float: "float 6s ease-in-out infinite",
        "counter": "counter 2s ease-out forwards",
        "drift": "drift 8s ease-in-out infinite",
        "pulse-soft": "pulseSoft 4s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        drift: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "33%": { transform: "translate(10px, -15px)" },
          "66%": { transform: "translate(-5px, 10px)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.6" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
