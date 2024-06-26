/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "cus-blue": "#2D3142",
        "cus-orange": "#EF8354",
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
};
