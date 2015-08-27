'use strict';

var _ = require('lodash');
var utils = require('./utils');
var config = require('../config');

module.exports = function(req, res, next) {
  var configData = config().session;
  var cookiePrefix = configData.cookiePrefix;
  var sessionData = parseSession();

  var options = {
    domain: configData.cookieDomain,
    path: configData.path,
    maxAge: configData.maxAge,
    httpOnly: configData.httpOnly
  };

  var deleteOptions = {
    domain: configData.cookieDomain,
    path: configData.path,
    httpOnly: configData.httpOnly
  };

  res.session = session;
  res.clearSession = clearSession;
  res.destroySessions = destroySessions;

  next();

  function parseSession() {
    var rVal = {};

    _.forEach(req.cookies, function(value, key) {
      var sessionPrefix = new RegExp('^' + cookiePrefix);
      var isSessionCookie = key.search(sessionPrefix) !== -1;

      if (isSessionCookie) {
        key = key.replace(sessionPrefix, '');

        if (utils.isJson(value)) {
          value = JSON.parse(value);
        }

        rVal[key] = value;
      }
    });

    return rVal;
  }

  function session(key, value) {
    var domain;
    var cookieKey;
    var cookieValue;

    // required params missing
    if (!key && (typeof value === 'undefined' || value === null)) {
      return sessionData;
    }

    // retrieve value
    if (!value) {
      return sessionData[key];
    }

    // set value
    sessionData[key] = value;

    // set cookie
    cookieKey = cookiePrefix + key;
    cookieValue = typeof value === 'string' ? value : JSON.stringify(value);

    res.cookie(cookieKey, cookieValue, options);
  }

  function clearSession(keys) {
    var cookieKey;
    var key = keys;

    if (keys instanceof Array) {
      _.forEach(keys, function(key) {
        delete sessionData[key];
        cookieKey = cookiePrefix + key;
        res.clearCookie(cookieKey, deleteOptions);
      });
    } else {
      delete sessionData[key];
      cookieKey = cookiePrefix + key;
      res.clearCookie(cookieKey, deleteOptions);
    }
  }

  function destroySessions() {
    if (sessionData) {
      var cookieKey;

      _.forEach(sessionData, function(value, key) {
        delete sessionData[key];

        cookieKey = cookiePrefix + key;
        res.clearCookie(cookieKey, deleteOptions);
      });
    } else {
      return;
    }
  }
};
