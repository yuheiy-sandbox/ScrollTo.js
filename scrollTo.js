/*! ScrollTo.js - v.0.1.0 */
;(function () {
  'use strict';

  var scrollTo = function scrollTo(target, duration, easing, callback) {
    callback = [target, duration, easing, callback].filter(function (arg) {
      return typeof arg === 'function';
    })[0];

    if (!target || typeof target !== 'number') {
      target = 0;
    }

    if (!duration || typeof duration !== 'number') {
      duration = 400;
    }

    if (!easing || typeof easing !== 'string') {
      easing = 'swing';
    }

    var fps = 13;
    var from = window.pageYOffset;
    var diff = from - target;
    var offset = from;
    var elapsedTime = 0;

    var tick = function tick() {
      if (elapsedTime >= duration) {
        offset = target;
        document.documentElement.scrollTop = document.body.scrollTop = offset;
        if (callback) callback();
        return;
      }

      var elapsedTimeRate = elapsedTime / duration;
      var valueChangeRate = easings[easing](elapsedTimeRate);
      offset = from - diff * valueChangeRate;
      document.documentElement.scrollTop = document.body.scrollTop = offset;
      elapsedTime += fps;
      setTimeout(tick, fps);
    };
    tick();
  };

  var easings = {
    linear: function linear(p) {
      return p;
    },
    swing: function swing(p) {
      return 0.5 - Math.cos(p * Math.PI) / 2;
    }
  };

  // Special Easings

  var baseEasings = {};

  ['Quad', 'Cubic', 'Quart', 'Quint', 'Expo'].forEach(function (name, i) {
    return baseEasings[name] = function (p) {
      return Math.pow(p, i + 2);
    };
  });

  baseEasings.Sine = function (p) {
    return 1 - Math.cos(p * Math.PI / 2);
  };

  baseEasings.Circ = function (p) {
    return 1 - Math.sqrt(1 - p * p);
  };

  baseEasings.Elastic = function (p) {
    return p === 0 || p === 1 ? p : -Math.pow(2, 8 * (p - 1)) * Math.sin(((p - 1) * 80 - 7.5) * Math.PI / 15);
  };

  baseEasings.Back = function (p) {
    return p * p * (3 * p - 2);
  };

  baseEasings.Bounce = function (p) {
    var pow2 = undefined;
    var bounce = 4;
    while (p < ((pow2 = Math.pow(2, --bounce)) - 1) / 11) {}
    return 1 / Math.pow(4, 3 - bounce) - 7.5625 * Math.pow((pow2 * 3 - 2) / 22 - p, 2);
  };

  Object.keys(baseEasings).forEach(function (name) {
    easings['easeIn' + name] = baseEasings[name];
    easings['easeOut' + name] = function (p) {
      return 1 - baseEasings[name](1 - p);
    };
    easings['easeInOut' + name] = function (p) {
      return p < 0.5 ? baseEasings[name](p * 2) / 2 : 1 - baseEasings[name](p * -2 + 2) / 2;
    };
  });

  window.scrollTo = scrollTo;
})();
