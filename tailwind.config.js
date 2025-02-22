export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    colors: {
      // Light Theme
      'white': '#FFFFFF',
      'very-light-gray': 'hsl(0, 0%, 98%)',
      'very-light-grayish-blue': 'hsl(236, 33%, 92%)',
      'light-grayish-blue': 'hsl(233, 11%, 84%)',
      'dark-grayish-blue': 'hsl(236, 9%, 61%)',
      'very-dark-grayish-blue': 'hsl(235, 19%, 35%)',

      'purple': "#4C3BCF",

      // Dark Theme
      'very-dark-blue': 'hsl(235, 21%, 11%)',
      'very-dark-desaturated-blue': 'hsl(235, 24%, 19%)',
      'light-grayish-blue-dark': 'hsl(234, 39%, 85%)',
      'light-grayish-blue-hover': 'hsl(236, 33%, 92%)',
      'dark-grayish-blue-dark': 'hsl(234, 11%, 52%)',
      'very-dark-grayish-blue-dark': 'hsl(233, 14%, 35%)',
      'very-dark-grayish-blue-alt': 'hsl(237, 14%, 26%)',
      'blue-custom': '#3A82F7', 
      'purple-custom': '#A855F7', 
    },

    fontFamily: {
      josefin: ['Josefin Sans', 'sans-serif'],
    },
  },
  plugins: [],
}
