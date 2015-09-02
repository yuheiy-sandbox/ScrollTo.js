/*! ScrollTo.js - v.0.1.0 */
;(function () {
  'use strict';

  const scrollTo = (target, duration, easing, callback) => {
    callback = [target, duration, easing, callback].filter(arg => typeof arg === 'function')[0];

    if (!target || typeof target !== 'number') {
      target = 0;
    }

    if (!duration || typeof duration !== 'number') {
      duration = 400;
    }

    if (!easing || typeof easing !== 'string') {
      easing = 'swing';
    }

    const fps = 13;
    const start = window.pageYOffset;
    const valueInChange = start - target;
    let elapsedTime = 0;

    const tick = () => {
      if (elapsedTime >= duration) {
        const offset = target;
        document.documentElement.scrollTop = document.body.scrollTop = offset;
        if (callback) callback();
        return;
      }

      const elapsedTimeRate = elapsedTime / duration;
      const valueChangeRate = easings[easing](elapsedTimeRate);
      const offset = start - (valueInChange * valueChangeRate);
      document.documentElement.scrollTop = document.body.scrollTop = offset;
      elapsedTime += fps;
      setTimeout(tick, fps);
    };
    tick();
  };

  const easings = {
    linear:
      p => p,
    swing:
      p => 0.5 - Math.cos(p * Math.PI) / 2
  };

  // Special Easings

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

  window.scrollTo = scrollTo;
})();
