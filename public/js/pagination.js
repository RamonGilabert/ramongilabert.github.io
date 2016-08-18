// JavaScript for the pagination in the myself page.

window.addEventListener('load', function() {

  var keys = {
    37 : 1,
    38 : 1,
    39 : 1,
    40 : 1
  };

  function preventDefault(event) {
    event = event || window.event;

    if (event.preventDefault) {
      event.preventDefault();
    }

    event.returnValue = false;
  }

  function preventDefaultForScrollKeys(event) {
    if (keys[event.keyCode]) {
      preventDefault(event);

      return false;
    }
  }

  function disableScroll() {
    window.addEventListener('DOMMouseScroll', preventDefault, false);

    window.onwheel = preventDefault;
    window.onmousewheel = document.onmousewheel = preventDefault;
    window.ontouchmove  = preventDefault;
    document.onkeydown  = preventDefaultForScrollKeys;
  }

  disableScroll();

  window.addEventListener('swipeUp', function() {
    console.log('Swipe up');
  });

  window.addEventListener('swipeDown', function() {
    console.log('Swipe down');
  });
});
