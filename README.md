# ScrollTo.js
A JavaScript library supports only smoothly scrolling.

    $ npm i @yuheiy/scroll-to

## Usage
    var ScrollTo = require('@yuheiy/scroll-to');

    document.querySelector('.to-top').addEventListener('click', function () {
      ScrollTo({y: 0, duration: 600, easing: 'easeInOutQuart'}, function () {
        console.log('Scrolling has ended');
      });
    });

## Details
### ScrollTo(options, callback)
* `options` is an object
  - `x` (optional) is offset position (default: window.pageXOffset)
  - `y` (optional) is offset position (default: window.pageYOffset)
  - `duration` (optional) is milliseconds (default: `800`)
  - `easing` (optional) is the [animation type](#Animation-Type) (default: `swing`)
* `callback` (optional) is the completion callback

### Animation Type
It's same as [easings of jQuery UI](https://jqueryui.com/easing/)
