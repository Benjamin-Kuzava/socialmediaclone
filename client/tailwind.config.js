module.exports = {
  future: {
    removeDeprecatedGapUtilities: true
  },
  theme: {
    colors: {
      white: '#ffffff',
      blue: {
        medium: '#005c98'
      },
      black: {
        light: '#262626',
        faded: '#00000059'
      },
      gray: {
        base: '#616161',
        background: '#fafafa',
        primary: '#dbdbdb'
      },
      red: {
        primary: '#ed4956'
      }
    },
    fill: (theme) => ({
      red: theme('colors.red.primary')
    })
  },
  variants: {
    extend: {
      display: ['group-hover']
    }
  },
  purge: ['./src/**/*.{js,jsx}', './src/**/**/*.{js, jsx}', './public/index.html']
};
