'use strict';

var fs = require('fs');
var rewire = require('rewire');
var yaml = require('js-yaml');

global.sinon = require('sinon');
global.assert = require('chai').assert;

module.exports = {
  rewireFromProjectRoot: function(relativePath) {
    return rewire(__dirname + '/../src/' + relativePath);
  },
  loadFixtureYML: function(filename) {
    return yaml.safeLoad(fs.readFileSync(__dirname + '/fixtures/' + filename, 'utf8'));
  },
  loadFixtureJSONRaw: function(filename) {
    return fs.readFileSync(__dirname + '/fixtures/' + filename, 'utf8');
  },
  loadFixtureJSON: function(filename) {
    return JSON.parse(this.loadFixtureJSONRaw(filename));
  }
};
