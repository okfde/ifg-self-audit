const targets = require('./package.json').browserslist;

module.exports = {
  presets: [
    [
      '@vue/babel-preset-app',
      {
        polyfills: process.env.VUE_CLI_MODERN_BUILD
          ? []
          : require('core-js-compat')({ targets }).list
      }
    ]
  ],
  plugins: ['@babel/plugin-proposal-optional-chaining']
};
