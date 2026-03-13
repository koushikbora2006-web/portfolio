/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // enable dark mode manually
  theme: {
    extend: {
      colors: {
        primary: "#0ea5e9", // Custom primary color (sky-500)
        secondary: "#8b5cf6", // Custom secondary color (violet-500)
        dark: {
          bg: "#0f172a", // slate-900
          card: "#1e293b", // slate-800
          text: "#f8fafc", // slate-50
          muted: "#94a3b8", // slate-400
        },
        light: {
          bg: "#f8fafc", // slate-50
          card: "#ffffff",
          text: "#0f172a", // slate-900
          muted: "#475569", // slate-600
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      animation: {
        blob: "blob 7s infinite",
        spark: "spark 1.5s ease-out infinite",
        lightning: "lightning 2s infinite",
      },
      keyframes: {
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
        spark: {
          "0%, 100%": { opacity: "0", transform: "scale(0.5)" },
          "50%": { opacity: "1", transform: "scale(1.2)" },
        },
        lightning: {
          "0%, 100%": { opacity: "0.1" },
          "10%, 30%, 50%": { opacity: "1" },
          "20%, 40%": { opacity: "0.2" },
        },
      },
    },
  },
  plugins: [],
};
