/**
 * @preserve ScrollTo.js v.0.2.1
 *
 * https://github.com/yuheiy/ScrollTo.js
 */
;(function () {
  'use strict';

  /** Not deep object clone */
  const clone = o => {
    const newO = {};
    for (let prop in o) {
      newO[prop] = o[prop];
    }
    return newO;
  };

  /** Normal easings */
  const easings = {
    linear:
      p => p,
    swing:
      p => 0.5 - Math.cos(p * Math.PI) / 2
  };

  /** Special Easings */
  const baseEasings = {};

  ['Quad', 'Cubic', 'Quart', 'Quint', 'Expo'].forEach((name, i) => baseEasings[name] =
    p => Math.pow(p, i + 2));

  baseEasings.Sine =
    p => 1 - Math.cos(p * Math.PI / 2);

  baseEasings.Circ =
    p => 1 - Math.sqrt(1 - p * p);

  baseEasings.Elastic =
    p => p === 0 || p === 1 ? p :
      -Math.pow(2, 8 * (p - 1)) * Math.sin (((p - 1) * 80 - 7.5) * Math.PI / 15);

  baseEasings.Back =
    p => p * p * (3 * p - 2);

  baseEasings.Bounce =
    p => {
      let pow2;
      let bounce = 4;
      while (p < ((pow2 = Math.pow(2, --bounce)) - 1) / 11) {}
      return 1 / Math.pow(4, 3 - bounce) - 7.5625 * Math.pow((pow2 * 3 - 2) / 22 - p, 2);
    };

  Object.keys(baseEasings).forEach(name => {
    easings['easeIn' + name] = baseEasings[name];

    easings['easeOut' + name] =
      p => 1 - baseEasings[name](1 - p);

    easings['easeInOut' + name] =
      p => p < 0.5 ? baseEasings[name](p * 2) / 2 : 1 - baseEasings[name](p * -2 + 2) / 2;
  });

  /** Main function */
  const ScrollTo = (options = {}, callback = function () {}) => {
    if (typeof options !== 'object') {
      console.error('The first argument must be an object.');
      return;
    }
    options = clone(options);

    if (typeof options.x === 'undefined') {
      options.x = window.pageXOffset;
    } else if (typeof options.x !== 'number') {
      console.error('Options.x must be a number.');
      return;
    }

    if (typeof options.y === 'undefined') {
      options.y = window.pageYOffset;
    } else if (typeof options.y !== 'number') {
      console.error('Options.y must be a number.');
      return;
    }

    if (typeof options.duration === 'undefined') {
      options.duration = 800;
    } else if (typeof options.duration !== 'number') {
      console.error('Options.duration must be a number.');
      return;
    }

    if (typeof options.easing === 'undefined') {
      options.easing = 'swing';
    } else if (Object.keys(easings).indexOf(options.easing) === -1) {
      console.error('Specified easing is undefined');
      return;
    }

    if (typeof callback !== 'function') {
      console.error('Callback is not function');
      return;
    }

    const fps = 13;
    const from = {
      x: window.pageXOffset,
      y: window.pageYOffset
    };
    const valueInChange = {
      x: from.x - options.x,
      y: from.y - options.y
    };
    let elapsedTime = 0;

    if (options.x === from.x && options.y === from.y) {
      return;
    }

    const tick = () => {
      if (elapsedTime >= options.duration) {
        window.scrollTo(options.x, options.y);
        callback();
        return;
      }

      const elapsedTimeRate = elapsedTime / options.duration;
      const valueChangeRate = easings[options.easing](elapsedTimeRate);
      const offset = {
        x: from.x - valueInChange.x * valueChangeRate,
        y: from.y - valueInChange.y * valueChangeRate
      };

      window.scrollTo(offset.x, offset.y);
      elapsedTime += fps;
      setTimeout(tick, fps);
    };
    tick();
  };

  /** Export function */
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = ScrollTo;
  } else {
    window.ScrollTo = ScrollTo;
  }
})();
