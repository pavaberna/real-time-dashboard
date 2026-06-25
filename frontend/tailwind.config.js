/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        orbitron: ["Orbitron", "sans-serif"],
      },
      colors: {
        darkBg: "#030712",
        cyberCyan: "#06b6d4",
        cyberPurple: "#a855f7",
        cyberPink: "#ec4899",
        neonGreen: "#10b981",
      },
    },
  },
  plugins: [],
};
