// JavaScript for the pagination in the myself page.
// Developers: Me, Myself and I.

// MARK: - Window events

window.addEventListener('load', function() {

  var triangle = document.id('triangle');
  var indicator = document.id('indicator');
  var myself = document.id('sections');
  var selectedWork = document.id('selected-work');
  var selectedWrapper = document.id('selected-wrapper');
  var backTop = document.id('back-top-button');

  var titles = slice(document.classes('text'), 3);
  var navigators = document.classes('navigator');

  var sections = document.tags('section');

  var position = 0;
  var currentPosition = position;
  var currentTime = new Date().getTime();
  var pastTime = 0;
  var safety = 700;
  var shouldAnimate = true;
  var cubicBezier = 'cubic-bezier(0.88, 0.12, 0.36, 0.79)'

  swipe(myself);
  positionIndicator();

  backTop.addEventListener('click', function() {
    currentPosition = position;
    position = 0;
    scroll(0);
  });

  window.addEventListener('resize', function() {
    resize();
    positionIndicator();
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
        currentPosition = position;
        position = navigators.indexOf(this);

        scroll(position * window.innerHeight);
  		}
    });
  }

  // MARK: - Methods for the document scrolling.

  function scrollHandler(event) {
    currentTime = new Date().getTime();

    if (currentTime - pastTime < safety + 800) {
      event.preventDefault();
      return;
    }

    event.preventDefault();
    var delta = event.wheelDelta || -event.detail;

    delta > 0 ? scrollUp() : scrollDown();
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
    if (point > window.innerHeight * sections.length - window.innerHeight
      || point < 0 || currentPosition == position) {
        return;
    }

    if (animate == undefined) {
      scrollingTitles();
    }

    var remove = position == 0;

    toggle(selectedWork, 'selected-work-scroll', remove);
    toggle(selectedWrapper, 'selected-wrapper-scroll', remove);
    toggle(backTop, 'back-top-scroll', remove);

    myself.style.transition = animate === undefined ? 'transform 0.8s ' + cubicBezier : '';
    myself.style.transform = 'translate3d(0, ' + -point + 'px, 0)';

    getTransform(myself);
    positionIndicator();

    pastTime = currentTime;
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

  function scrollingTitles() {
    var initialTitles = titles[currentPosition];
    var finalTitles = titles[position];
    var titleTransition = 'top 1s ease';
    var timeout = 800;
    var starter = 200;
    var transitionPadding = 80;
    var up = currentPosition - position > 0;

    var index = 0;
    loop();

    function loop() {
      var initialTitle = up
      ? initialTitles[initialTitles.length - index - 1] : initialTitles[index];
      var finalTitle = up
      ? finalTitles[finalTitles.length - index - 1] : finalTitles[index];
      var initialClass = up ? 'down' : 'up';
      var finalClass = up ? 'up' : 'down';

      initialTitle.style.transition = titleTransition;
      initialTitle.classList.add(initialClass);

      finalTitle.style.transition = '';
      finalTitle.classList.add(finalClass);

      setTimeout(function() {
        initialTitle.classList.remove(initialClass);
      }, timeout);

      setTimeout(function() {
        finalTitle.style.transition = titleTransition;
        finalTitle.classList.remove(finalClass);
      }, starter);

      index = index + 1;
      setTimeout(function() {
        if (index < initialTitles.length) { loop(); }
      }, transitionPadding * index);
    }
  }

  function positionIndicator(button) {
    var navigator = button || navigators[position];
    var y = navigator.getBoundingClientRect().top;
    var width = navigator.offsetWidth;
    var triangleWidth = triangle.offsetWidth;

    indicator.style.transition = shouldAnimate
    ? 'top 0.6s ' + cubicBezier + ', height 0.6s ' + cubicBezier : '';
    triangle.style.transition = shouldAnimate ? 'top 0.6s ' + cubicBezier : '';

    shouldAnimate = true;

    setTimeout(function() {
      indicator.style.top = y + 'px';
      indicator.style.height = width + 'px';

      if (button === undefined) {
        triangle.style.top = y + width / 2 - triangleWidth / 2 + 'px';
      }
    }, 0);

    indicator.style.transition = 'top 0.6s ' + cubicBezier + ', height 0.6s ' + cubicBezier;
    triangle.style.transition = 'top 0.6s ' + cubicBezier;
  }

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
          var event = new Event('swipeDown');
          document.dispatchEvent(event);
        } else if (delta <= -50) {
          var event = new Event('swipeUp');
          document.dispatchEvent(event);
        }

        if (abs(delta) >= 50) {
          document.removeEventListener('touchmove', touchMove);
        }
      }
    }
  }
});

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
