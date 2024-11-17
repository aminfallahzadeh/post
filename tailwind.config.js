/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./views/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#164194",
        secondary: "#fcd900",
        tertiary: "#00075a",
        lightBlue: "#f0f0f0",
        grey1: "#fafafa",
        grey2: "#333",
        grey3: "#dadada",
        grey4: "#d0d0d0",
        grey5: "#a3a3a3",
      },
      fontFamily: {
        isansblack: ["IranSans-Black", "sans-serif"],
        isansbold: ["IranSans-Bold", "sans-serif"],
        isansdemibold: ["IranSans-DemiBold", "sans-serif"],
        isansextrabold: ["IranSans-ExtraBold", "sans-serif"],
        isansextralight: ["IranSans-ExtraLight", "sans-serif"],
        isansheavy: ["IranSans-Heavy", "sans-serif"],
        isanslight: ["IranSans-Light", "sans-serif"],
        isansmedium: ["IranSans-Medium", "sans-serif"],
        isansregular: ["IranSans-Regular", "sans-serif"],
        isansultralight: ["IranSans-UltraLight", "sans-serif"],
        isansthin: ["IranSans-Thin", "sans-serif"],
      },
    },
  },
  plugins: [],
};
