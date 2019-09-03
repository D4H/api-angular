const path = require('path');

// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = config => {
  config.set({
    autoWatch: true,
    basePath: '',
    colors: true,
    logLevel: config.LOG_INFO,
    port: 9876,
    restartOnFileChange: true,
    singleRun: false,
    browsers: [
      'ChromeHeadless'
    ],
    client: {
      captureConsole: false,
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    reporters: [
      'mocha'
    ],
    frameworks: [
      '@angular-devkit/build-angular',
      'jasmine',
      'jasmine-matchers'
    ],
    plugins: [
      '@angular-devkit/build-angular/plugins/karma',
      'karma-chrome-launcher',
      'karma-coverage-istanbul-reporter',
      'karma-jasmine',
      'karma-jasmine-html-reporter',
      'karma-jasmine-matchers',
      'karma-mocha-reporter'
    ],
    mochaReporter: {
      showDiff: true
    },
    coverageIstanbulReporter: {
      dir: path.join(__dirname, '../../coverage/client'),
      reports: [
        'html',
        'lcovonly'
      ],
      fixWebpackSourcePaths: true
    },
  });
};
