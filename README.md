# ScrollTo.js
A JavaScript library supports only smoothly scrolling.

## Usage
    <script src="scrollTo.min.js"></script>
    <script>
      scrollTo(0, 200, 'linear', function () {
        console.log('Scrolling has ended');
      });
    </script>

## Details
    scrollTo([target][, duration][, easing][, callback])
* **target**  
Type: Number  
A number of scroll position that the animation will move toward.
* **duration**  
Type: Number  
A number determing how long the animation will run.
* **easing**  
Type: String  
A string indicating which easing function to use for the transition.
* **callback**  
Type: Function()  
A function to call once the animation is complete.

This library corresponds to [an easing name of jQuery UI](https://jqueryui.com/easing/).When you designate that, so it's possible to use it.
