module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "xs": '0 1px 5px rgba(0, 0, 0, 0.4)',
      },
      screens: {
        "xs": "480px"
      }
    },
  },
  variants: {
    extend: {
      display: ["group-hover"],
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}