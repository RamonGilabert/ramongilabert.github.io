// JavaScript for the pagination in the myself page.

window.addEventListener('load', function() {

  var animating = false;
  var safety = 700;
  var shouldAnimate = true
  var sections = document.getElementsByTagName('section');
  var navigators = document.getElementsByClassName('navigator');
  var triangle = document.getElementById('triangle');
  var indicator = document.getElementById('indicator');
  var myself = document.getElementById('sections');
  var position = Math.abs(myself.scrollTop / window.innerHeight);

  swipe(myself);
  positionIndicator();

  window.addEventListener('resize', function() {
    shouldAnimate = false;
    positionIndicator();
  });

  document.addEventListener('swipeUp', function(event) {
    scrollUp()
  });

  document.addEventListener('swipeDown', function(event) {
    scrollDown()
  });

  window.addEventListener('DOMMouseScroll', scrollHandler);
  window.addEventListener('mousewheel', scrollHandler);

  for (var i = 0; i < navigators.length; i++) {
    var navigator = navigators[i];

    navigator.addEventListener('mouseover', function() {
      positionIndicator(this);
    });

    navigator.addEventListener('mouseout', function() {
      setTimeout(function() {
        positionIndicator();
      }, 25);
    });

    navigator.addEventListener('click', function() {
      if (animating === false) {
        position = convertToArray(navigators).indexOf(this);
        scroll(position * window.innerHeight);
      }
    });
  }

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
    console.log(position);
    if (position <= 0) {
      animating = false;
      return;
    }

    position = position - 1;
    scroll(position * window.innerHeight);
  }

  function scrollDown() {
    if (position >= sections.length - 1) {
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
    positionIndicator();

    myself.addEventListener('transitionend', function() {
      setTimeout(function() {
        animating = false;
      }, safety);
    });
  }

  function positionIndicator(button) {
    var navigator = button || navigators[position];
    var y = navigator.getBoundingClientRect().top;
    var width = navigator.offsetWidth;
    var triangleWidth = triangle.offsetWidth;

    if (shouldAnimate) {
      indicator.style.transition = 'top 0.6s ease, height 0.6s ease';
      triangle.style.transition = 'top 0.6s ease';
    } else {
      indicator.style.transition = '';
      triangle.style.transition = '';
    }

    shouldAnimate = true;

    indicator.style.top = y + 'px';
    indicator.style.height = width + 'px';

    if (button === undefined) {
      triangle.style.top = y + width / 2 - triangleWidth / 2 + 'px';
    }
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

// MARK: - Private functions

function convertToArray(object) {
  return [].map.call(object, function(element) { return element; });
}
