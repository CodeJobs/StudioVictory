'use strict';

var testHelper = require('./../testHelper');
var config = testHelper.rewireFromProjectRoot('lib/config');

// use fixture config
config.__set__('environment', function() {
  return { name: 'foo' };
});

config.__set__('config', testHelper.loadFixtureYML('config.yml'));

describe('Config', function() {
  it('should return an object', function() {
    assert.typeOf(config(), 'Object', 'Config returns an object');
  });

  it('should return config by environment', function() {
    config.__set__('environment', function() {
      return { name: 'foo' };
    });

    assert.deepEqual(config(), { a: 'foo', b: 'bar', c: 'baz' }, 'Config returns the foo config');

    config.__set__('environment', function() {
      return { name: 'bar' };
    });

    assert.deepEqual(config(), { a: 'foo', b: 'bar', c: 'zab' }, 'Config returns the bar config');
  });
});
