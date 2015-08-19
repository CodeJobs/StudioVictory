'use strict';

var config = require('../config');
var crypto = require('crypto');
var salt   = config().security.secret;

module.exports = {
  sha1: function(str) {
    return crypto.createHash('sha1').update(salt + str.toString()).digest('hex');
  },

  md5: function(str) {
    return crypto.createHash('md5').update(salt + str.toString()).digest('hex');
  }
};
