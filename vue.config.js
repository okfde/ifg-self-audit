module.exports = {
  publicPath: '/self-audit/',
  filenameHashing: false,
  css: {
    requireModuleExtension: false,
    loaderOptions: {
      css: {
        modules: {
          localIdentName: '[hash:6]'
        }
      }
    }
  }
};
