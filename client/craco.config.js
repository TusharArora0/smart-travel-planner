const webpack = require('webpack');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Add fallbacks for Node.js core modules
      webpackConfig.resolve.fallback = {
        "util": require.resolve("util/"),
        "http": require.resolve("stream-http"),
        "https": require.resolve("https-browserify"),
        "url": require.resolve("url/"),
        "assert": require.resolve("assert/"),
        "stream": require.resolve("stream-browserify"),
        "buffer": require.resolve("buffer/"),
        "process": require.resolve("process/browser.js")
      };

      // Add plugins to provide global variables
      if (!webpackConfig.plugins) {
        webpackConfig.plugins = [];
      }
      
      webpackConfig.plugins.push(
        new webpack.ProvidePlugin({
          process: 'process/browser.js',
          Buffer: ['buffer', 'Buffer']
        })
      );

      return webpackConfig;
    }
  }
};