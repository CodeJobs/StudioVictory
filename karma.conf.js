'use strict';

module.exports = function(config) {
  config.set({
    basePath: '',

    frameworks: ['mocha', 'chai', 'sinon'],

    files: [
      // Dependencies
      'src/public/bower_components/lodash/dist/lodash.min.js',

      // Tests files
      'test/public/js/**/*Test.js'
    ],

    exclude: [],

    preprocessors: {
      'test/fixtures/public/js/**/*.html': ['html2js'],
      'test/fixtures/public/js/**/*.json': ['html2js']
    },

    reporters: ['mocha'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: false,

    browsers: ['PhantomJS'],

    singleRun: true,

    client: {
      captureConsole: true
    }
  });
};
