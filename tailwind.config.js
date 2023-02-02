module.exports = {
  content: [
    './views/**/*.{js,ejs}',
  ],
  theme: {

    extend: {
      colors: {
        "primary": {
          50: "#E4E6F1",
          100: "#C9CDE4",
          200: "#929BC9",
          300: "#5C69AD",
          400: "#3D477A",
          DEFAULT: "#232946",
          600: "#1B2036",
          700: "#141829",
          800: "#0E101B",
          900: "#07080E"
        },
        "paragraph": {
          50: "#F7F8FD",
          100: "#EFF1FB",
          200: "#E3E6F7",
          300: "#D3D8F3",
          400: "#C7CEF0",
          DEFAULT: "#B8C1EC",
          600: "#7687DA",
          700: "#354DC5",
          800: "#243485",
          900: "#111940"
        },
        'headline': '#fffffe',
        "button": {
          50: "#FDF7F8",
          100: "#FCF3F4",
          200: "#F8E2E6",
          300: "#F5D6DB",
          400: "#F2CAD0",
          DEFAULT: "#EEBBC3",
          600: "#DD7888",
          700: "#CC334A",
          800: "#872231",
          900: "#451119"
        },
        'button-text': '#232946'
      },
    },
  },
  plugins: [],
}
