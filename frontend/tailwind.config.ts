import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1A3C34",
          50: "#f0f5f4",
          100: "#d1e3df",
          200: "#a3c7bf",
          300: "#6da89f",
          400: "#3f8a7f",
          500: "#1a6c5f",
          600: "#15554a",
          700: "#1A3C34",
          800: "#15302a",
          900: "#0f241f"
        },
        accent: "#6fcf97",
        beige: {
          DEFAULT: "#F7F3E9",
          50: "#FDFBF7",
          100: "#F7F3E9"
        },
        "cream-white": "#F5F5F0"
      },
      boxShadow: {
        card: "0 10px 30px rgba(26,60,52,0.08)"
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" }
        }
      },
      animation: {
        "fade-in": "fadeIn 1s ease-out both"
      }
    }
  },
  plugins: []
};

export default config;





