/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1C1C1B",
        secondory: "#272727",
        third: "#181817",
        textPrimary: "#B5B585",
        textSecondory: "#FDFDFD",
        heroPrimary: "#FF9E01",
        heroSecondory: "#F77801",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
