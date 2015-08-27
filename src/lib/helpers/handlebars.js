'use strict';

var config = require('../config');
var minify = require('html-minifier').minify;
var utils  = require('./utils');

module.exports = {
  // String helpers
  debug: function(variable) {
    console.log('Debugging Handlebars:');
    console.log('=====================');
    console.log(this);

    console.log('Dumping Variable:');
    console.log('========================');
    console.log(variable);
  },

  lowercase: function(str) {
    return str.toLowerCase();
  },

  uppercase: function(str) {
    return str.toUpperCase();
  },

  reverse: function(str) {
    return str.split('').reverse().join('');
  },

  // Numbers helpers
  ceil: function(number) {
    return Math.ceil(parseFloat(number));
  },

  // Date helpers
  now: function() {
    return new Date();
  },

  // Conditionals helpers
  is: function(variable, value, options) {
    if (variable && variable === value) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  },

  isNot: function(variable, value, options) {
    if (!variable || variable !== value) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  },

  gt: function(value1, value2, options) {
    if (value1 > value2) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  },

  gte: function(value1, value2, options) {
    if (value1 >= value2) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  },

  lt: function(value1, value2, options) {
    if (value1 < value2) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  },

  lte: function(value1, value2, options) {
    if (value1 <= value2) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  },

  // HTML & Json helpers
  json: function(content) {
    return JSON.stringify(content);
  },

  minify: function(content) {
    if (config().html.minify) {
      return minify(content.fn(this), {
        removeComments: true,
        collapseWhitespace: true,
        minifyJS: true
      });
    }

    return content.fn(this);
  }
};
