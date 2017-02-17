var webpackConfig = require('./webpack.dev.config.js');
module.exports = function(config) {
  config.set({
    basePath: '../src',
    files: [
      // all files ending in "_test"
      '*.spec.js',
      '**/*.spec.js'
      // each file acts as entry point for the webpack configuration
    ],

    preprocessors: {
      // add webpack as preprocessor
      '*spec.js': ['webpack'],
      '**/*spec.js': ['webpack']
    },

    webpack: webpackConfig,

    singleRun: true,
    autoWatch: false,
    frameworks: ['jasmine'],
    browsers: ['Chrome'],
    plugins: [
      'karma-chrome-launcher',
      'karma-jasmine',
      'karma-webpack'
    ]
  });
};