module.exports = {
  purge: ['./src/**/*.vue'],
  theme: {
    extend: {
      colors: {
        gray: {
          100: '#F6F7F9',
          200: '#E8EBF0',
          300: '#C9D2DC',
          400: '#ABBAC9',
          500: '#7B91A9',
          600: '#5C748D',
          700: '#4A5D71',
          800: '#3B4A5A',
          900: '#1C232B'
        },
        blue: {
          10: '#DFEFF9',
          20: '#B6DDF5',
          30: '#8DBAD4',
          100: '#F0F4FF',
          200: '#DEE8FF',
          300: '#B8CEFF',
          400: '#719DFF',
          500: '#296DFF',
          600: '#0047E1',
          700: '#0034A5',
          800: '#001C5A'
        },
        yellow: {
          100: '#FDE9AE',
          200: '#FACE44',
          300: '#E8B106'
        },
        red: '#FF5029',
        green: '#3BB273'
      },
      screens: {
        print: { raw: 'print' }
      }
    },
    fontFamily: {
      display: ['Inter', 'sans-serif'],
      body: ['Inter', 'sans-serif']
    }
  },
  variants: {},
  plugins: []
};
