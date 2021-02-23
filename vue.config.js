module.exports = {
  publicPath: '/self-audit/',
  filenameHashing: false,
  css: {
    requireModuleExtension: false,
    loaderOptions: {
      css: {
        modules: {
          localIdentName: '[hash:base64]'
        }
      }
    }
  },
  transpileDependencies: ['jsoncrush', 'copy-text-to-clipboard']
};
