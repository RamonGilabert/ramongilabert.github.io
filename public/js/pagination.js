// JavaScript for the pagination in the myself page.

window.addEventListener('load', function() {

  prepareWindowFrames();

  var animating = false;
  var safety = 700;
  var sections = document.getElementsByTagName('section');
  var navigators = document.getElementsByClassName('navigator');
  var indicator = document.getElementById('indicator');
  var myself = document.getElementById('sections');
  var position = Math.abs(myself.scrollTop / window.innerHeight);
  swipe(myself);

  document.addEventListener('swipeUp', function(event) {
    scrollUp()
  });

  document.addEventListener('swipeDown', function(event) {
    scrollDown()
  });

  window.addEventListener('DOMMouseScroll', scrollHandler);
  window.addEventListener('mousewheel', scrollHandler);

  function scrollHandler(event) {
  	event.preventDefault();
  	var delta = event.wheelDelta || -event.detail;

    if (animating) {
      event.preventDefault();
      return;
    }

    animating = true;
		delta > 0 ? scrollUp() : scrollDown();
  }

  function scrollUp() {
    if (position == 0) {
      animating = false;
      return;
    }

    position = position - 1;
    scroll(position * window.innerHeight);
  }

  function scrollDown() {
    if (position == sections.length) {
      animating = false;
      return;
    }

    position = position + 1;
    scroll(position * window.innerHeight);
  }

  function scroll(point) {
    if (point > window.innerHeight * sections.length - window.innerHeight || point < 0) {
      animating = false;
      return;
    }

    myself.style.transform = 'translate3d(0, ' + -point + 'px, 0)';
    indicator.style.top = navigators[position].getBoundingClientRect().top;

    myself.addEventListener('transitionend', function() {
      setTimeout(function() {
        animating = false;
      }, safety);
    });
  }
});

// Inspiration from:
// github.com/peachananr/purejs-onepage-scroll/blob/master/onepagescroll.js#L173

function swipe(element) {
  var initial = 0;

  document.addEventListener('touchstart', function(event) {
    console.log('Sup');
    var touches = event.touches;
    if (touches && touches.length) {
      initial = touches[0].pageY;
      document.addEventListener('touchmove', touchMove);
    }
  }, false);

  function touchMove(event) {
    var touches = event.touches;

    if (touches && touches.length) {
      event.preventDefault();
      var delta = initial - touches[0].pageY;

      if (delta >= 50) {
        var event = new Event('swipeUp');
        document.dispatchEvent(event);
      } else if (delta <= -50) {
        var event = new Event('swipeDown');
        document.dispatchEvent(event);
      }

      if (Math.abs(delta) >= 50) {
        document.removeEventListener('touchmove', touchMove);
      }
    }
  }
}

// MARK: - Prevent scrolling

var keys = {
  32 : 1,
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
  window.onscroll = preventDefault;
  window.onmousewheel = preventDefault;
  document.onkeydown = preventDefaultForScrollKeys;
}

disableScroll();

// MARK: - Helper methods

function prepareWindowFrames() {
  window.requestAnimationFrame = window.requestAnimationFrame
  || window.webkitRequestAnimationFrame
  || window.mozRequestAnimationFrame
  || window.oRequestAnimationFrame
  || window.msRequestAnimationFrame
  || function(callback) { window.setTimeout(callback, 1000 / 60) };
}
