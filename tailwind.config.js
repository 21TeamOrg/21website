/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Arial", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
        display: ["Orbitron", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        neon: {
          cyan: "#00fff7",
          blue: "#00baff",
          pink: "#ff00e0",
        },
        glass: "rgba(30,41,59,0.7)",
      },
      backgroundImage: {
        "neon-gradient": "linear-gradient(90deg, #00fff7 0%, #00baff 100%)",
        "glass-gradient":
          "linear-gradient(135deg, rgba(30,41,59,0.7) 0%, rgba(0,255,247,0.15) 100%)",
      },
      boxShadow: {
        neon: "0 0 16px 4px #00fff7, 0 0 32px 8px #00baff",
        glass: "0 4px 32px 0 rgba(0,255,247,0.15)",
        glow: "0 0 8px 2px #00fff7",
      },
      dropShadow: {
        neon: "0 0 8px #00fff7",
        glass: "0 4px 32px rgba(0,255,247,0.15)",
      },
      blur: {
        xs: "2px",
      },
      transitionTimingFunction: {
        "in-expo": "cubic-bezier(0.95,0.05,0.795,0.035)",
        "out-expo": "cubic-bezier(0.19,1,0.22,1)",
      },
      animation: {
        "gradient-x": "gradient-x 8s ease-in-out infinite",
      },
      keyframes: {
        "gradient-x": {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
