// JavaScript for the pagination in the myself page.

window.addEventListener('load', function() {

  var safety = 700;
  var shouldAnimate = true;
  var cubicBezier = 'cubic-bezier(0.88, 0.12, 0.36, 0.79)'
  var sections = document.getElementsByTagName('section');
  var navigators = document.getElementsByClassName('navigator');
  var triangle = document.getElementById('triangle');
  var indicator = document.getElementById('indicator');
  var myself = document.getElementById('sections');
  var titles = document.getElementsByClassName('title');
  var selectedWork = document.getElementById('selected-work');
  var selectedWrapper = document.getElementById('selected-wrapper');
  var backTop = document.getElementById('back-top-button');
  var position = Math.abs(myself.scrollTop / window.innerHeight);
  var currentPosition = Math.abs(myself.scrollTop / window.innerHeight);
  var currentTime = new Date().getTime();
  var pastTime = 0;

  swipe(myself);
  positionIndicator();

  backTop.addEventListener('click', function() {
    currentPosition = Math.abs(myself.scrollTop / window.innerHeight);
    position = 0;
    scroll(0);
  });

  window.addEventListener('resize', function() {
    resize();
  });

  window.addEventListener('focus', function() {
    resize();
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
      currentTime = new Date().getTime();

      if (currentTime - pastTime > safety + 800) {
        currentPosition = Math.abs(myself.scrollTop / window.innerHeight);
        position = convertToArray(navigators).indexOf(this);
        scroll(position * window.innerHeight);

        pastTime = currentTime;
  		}
    });
  }

  function resize() {
    var windowHeight = '100%';
    for (var i = 0; i < this.sections.length; i++) {
      var section = this.sections[i];
      section.style.height = windowHeight;
    }

    myself.style.height = windowHeight;

    shouldAnimate = false;
    scroll(position * window.innerHeight, false);
  }

  function scrollHandler(event) {
    currentTime = new Date().getTime();

    if (currentTime - pastTime < safety + 800) {
			event.preventDefault();
			return;
		}

  	event.preventDefault();
  	var delta = event.wheelDelta || -event.detail;

		delta > 0 ? scrollUp() : scrollDown();
    pastTime = currentTime;
  }

  function scrollUp() {
    if (position <= 0) { return; }

    currentPosition = position;
    position = position - 1;
    scroll(position * window.innerHeight);
  }

  function scrollDown() {
    if (position >= sections.length - 1) { return; }

    currentPosition = position;
    position = position + 1;
    scroll(position * window.innerHeight);
  }

  function scroll(point, animate) {
    if (point > window.innerHeight * sections.length - window.innerHeight || point < 0) {
      return;
    }

    var initialTitle = titles[currentPosition];
    var finalTitle = titles[position];

    // TODO: Do the titles animation.
    // initialTitle.style.top = '100px';
    //
    // setTimeout(function() {
    //   finalTitle.style.top = '0px';
    // }, 400);

    if (position == 0) {
      selectedWork.style.bottom = '85px';
      selectedWrapper.style.clip = 'rect(auto, auto, auto, auto)';
      backTop.style.opacity = 0;
      backTop.style.left = '50px';
      backTop.style.cursor = 'default';
    } else {
      selectedWork.style.bottom = '105px';
      selectedWrapper.style.clip = 'rect(auto, auto, auto, 100px)';
      backTop.style.opacity = 1;
      backTop.style.left = '77px';
      backTop.style.cursor = 'pointer';
    }

    myself.style.transition = animate === undefined ? 'transform 0.8s ' + cubicBezier : '';
    myself.style.transform = 'translate3d(0, ' + -point + 'px, 0)';

    positionIndicator();
  }

  function positionIndicator(button) {
    var navigator = button || navigators[position];
    var y = navigator.getBoundingClientRect().top;
    var width = navigator.offsetWidth;
    var triangleWidth = triangle.offsetWidth;

    if (shouldAnimate) {
      indicator.style.transition = 'top 0.6s ' + cubicBezier + ', height 0.6s ' + cubicBezier;
      triangle.style.transition = 'top 0.6s ' + cubicBezier;
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
  window.onmousewheel = preventDefault;
  document.onkeydown = preventDefaultForScrollKeys;
}

disableScroll();

// MARK: - Private functions

function convertToArray(object) {
  return [].map.call(object, function(element) { return element; });
}
