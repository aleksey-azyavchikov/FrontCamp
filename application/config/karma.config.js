var webpackConfig = require('./webpack.dev.config.js');
module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      {pattern: './karma-shim.config.js', watched: false}
    ],

    browsers: ['PhantomJS'],

    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },

    preprocessors: {
      './karma-shim.config.js': ['webpack']
    },

    singleRun: true,
    autoWatch: false,
    frameworks: ['jasmine'],
    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-webpack'
    ]
  });
};