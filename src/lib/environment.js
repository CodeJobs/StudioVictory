'use strict';

module.exports = function() {
  return {
    name: process.env.NODE_ENV ? process.env.NODE_ENV : 'production'
  };
};
