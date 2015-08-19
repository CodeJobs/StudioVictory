'use strict';

var config = require('../config');
var security = require('./security');

module.exports = {
  md5: function(str) {
    if (this.isDefined(str)) {
      return security.md5(str);
    }

    return false;
  },

  sha1: function(str) {
    if (this.isDefined(str)) {
      return security.sha1(str);
    }

    return false;
  },

  encrypt: function(str) {
    return security.sha1(security.md5(str));
  },

  hash: function(str) {
    if (this.isDefined(str) && config().encryptInputs) {
      return security.md5(str);
    }

    return false;
  },

  isYear: function(year) {
    return (typeof year !== 'undefined' && year.length === 4 && !isNaN(year));
  },

  isMonth: function(month) {
    return (typeof month !== 'undefined' && month.length === 2 && !isNaN(month) && month <= 12);
  },

  isDay: function(day) {
    return (typeof day !== 'undefined' && day.length === 2 && !isNaN(day) && day <= 31);
  },

  isDesktop: function(ua) {
    return !(/mobile/i.test(ua));
  },

  isMobile: function(ua) {
    return (/mobile/i.test(ua));
  },

  getCurrentDevice: function(ua) {
    return (/mobile/i.test(ua)) ? 'mobile' : 'desktop';
  },

  isFunction: function(func) {
    return (typeof func === 'function') ? true : false;
  },

  isDefined: function(variable) {
    return (typeof variable !== 'undefined') ? true : false;
  },

  isUndefined: function(variable) {
    return (typeof variable === 'undefined') ? true : false;
  },

  isNumber: function(number) {
    return !isNaN(number) ? true : false;
  },

  getParamsFromUrl: function(params) {
    params = params.split('/');
    params.shift();

    return params;
  },

  randomCode: function(max, charSet) {
    var randomCode = '';
    var randomPoz;

    max = max || 12;
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < max; i++) {
      randomPoz = Math.floor(Math.random() * charSet.length);
      randomCode += charSet.substring(randomPoz, randomPoz + 1);
    }

    return randomCode;
  },

  removeHTML: function(str) {
    if (this.isDefined(str)) {
      return str.replace(/(<([^>]+)>)/ig, '');
    }

    return false;
  },

  escape: function(str) {
    if (this.isDefined(str)) {
      return str
        .replace(/'/g, '\\\'')
        .replace(/"/g, '\\\\"')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    }

    return false;
  },

  clean: function(str) {
    if (this.isDefined(str)) {
      return this.removeHTML(str).replace(/[`ª´·¨Ç~¿!#$%^&*()_|+\-=?;'",<>\{\}\[\]\\]/gi, '');
    }

    return false;
  },

  convertSecondsToHHMMSS: function(seconds) {
    if (!seconds) {
        return '00:00:00';
    }

    var time;
    var hours = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds - (hours * 3600)) / 60);

    seconds = seconds - (hours * 3600) - (minutes * 60);

    if (hours < 10) {
      hours = '0' + hours;
    }

    if (minutes < 10) {
      minutes = '0' + minutes;
    }

    if (seconds < 10) {
      seconds = '0' + seconds;
    }

    time = hours + ':' + minutes + ':' + seconds;

    return time;
  },

  convertCamelToNatural: function(str) {
    str = str.charAt(0).toUpperCase() + str.slice(1);

    return str.split(/(?=[A-Z])/).join(' ');
  },

  isJson: function(str) {
    if (str === null) {
      return false;
    }

    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }

    return true;
  }
};
