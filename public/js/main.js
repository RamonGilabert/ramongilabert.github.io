// JavaScript of the main content of gilabert.design.

// Developers: Me, Myself and I.

// Some code is imported in the HTML partial (head.mustache) from other files.
// Those files are as important as this one. With the same developer on it.

// MARK: - General values

var appearance = new Appearance();
prepareDocument();
setupAnalytics();

// MARK: - Window events

window.addEventListener('load', function() {

  var separator = new Separator('dot-separator');
  separator.generate();

  var scroller = new Scroller();
  scroller.run();

  var resizer = new Resizer();
  resizer.prepare();

  var disappear = new Disappear();
  disappear.prepare();

  var parallax = new Parallax();
  parallax.prepare();

  var loader = new Loader();
  loader.preload(function() {
    appearance.run();
  });

  var images = document.tags('img');
  for (var i = 0; i < images.length; i++) {
    images[i].addEventListener('dragstart', function() {
      event.preventDefault();
    });
  }

  encryptCorreu('email');

  window.addEventListener('resize', function() {
    separator.generate();
    resizer.method();
  });

  var timer = new Date().getTime();

  window.addEventListener('scroll', function() {
    if (window.pageYOffset <= window.innerHeight * 0.25) {
      scroller.run();

      for (var i = 0; i < scroller.sections.length; i++) {
        var section = scroller.sections[i];
        if (!section.classList.contains('scroll-appearance')) {
          section.classList.add('scroll-appearance');
        }
      }
    } else {
      window.requestAnimationFrame(function() {
        scroller.method();
      });
    }

    setTimeout(function() {
      var now = new Date().getTime();
      if (now - timer > 10) {
        timer = now;
        window.requestAnimationFrame(parallax.method);
      }
    }, 0);
  });
});

window.addEventListener('beforeunload', function(event) {
  if (!exists('myself')) {
    window.scrollTo(0, 0);
  }
});

window.addEventListener('pageshow', function(event) {
  if (event.persisted) {
    appearance.run();
  }
});

function Scroller() {

  this.sections = [];
  this.method = empty;
  this.length = 0;

  this.run = function() {
    if (exists('manifesto')) {
      var story = document.class('story').tag('div');
      var manifesto = document.class('manifesto').tag('div');
      var awards = document.class('awards').tag('div');
      var footer = document.id('footer').tag('div');

      this.sections = [story, manifesto, awards, footer];
      this.method = this.manifesto
      this.length = this.sections.length;
    }
  }

  this.manifesto = function() {
    var height = window.innerHeight
    var sectionsLength = this.sections.length;
    var initialPercentage = 0.6;
    var distance = window.innerHeight * initialPercentage;
    var sectionHeight = 0.7;
    var percentage = 0.5;
    var minimumHeight = height > 600 * sectionHeight ? height : 600 * sectionHeight;

    if (this.length !== sectionsLength) {
      distance = height + minimumHeight * (sectionHeight
        * (this.length - sectionsLength - 1) + sectionHeight * percentage)
    }

    if (window.pageYOffset - distance > 0 && sectionsLength > 0) {
      var section = this.sections[0];
      if (section.classList.contains('scroll-appearance')) {
        section.classList.remove('scroll-appearance');
        this.sections.shift();
      }
    }
  }
}

function Disappear() {

  this.elements = [];

  this.prepare = function() {
    if (exists('manifesto') || isDetail()) {
      this.elements = [document.id('back-button'), document.id('next-project')];
    } else if (exists('myself')) {
      this.elements = document.classes('intercept');
    }

    for (var i = 0; i < this.elements.length; i++) {
      var self = this;
      var element = this.elements[i];

      element.addEventListener('click', function(event) {
        event.preventDefault();

        var href = this.href;
        var self = this;

        appearance.method(false, function() {
          setTimeout(function() {

            if (self.innerHTML == 'go home') {
              if (sessionStorage['coming'] != undefined && sessionStorage['coming'].indexOf('index') != -1) {
                sessionStorage['coming'] = window.location;
                history.back();
                return;
              } else {
                href = 'index';
              }
            }

            sessionStorage['coming'] = window.location;

            window.location = href;
          }, 0);
        });
      });
    }
  }
}

function Separator(name) {

  this.elementName = name;
  this.wrapper = document.id(this.elementName);
  this.lastWidth = window.innerWidth;

  this.generate = function() {
    if (this.wrapper === null) { return; }

    if ((window.innerWidth >= 1400
      || abs(this.lastWidth - window.innerWidth) <= 10)
      && this.wrapper.innerHTML != '') {
      return;
    }

    var maximumWidth = 1400;
    var sideOffset = 57;
    var windowWidth = window.innerWidth >= maximumWidth ? maximumWidth : window.innerWidth;
    var width = windowWidth - sideOffset;
    var times = Math.floor(width / 11) * 2;
    var values = [true, true, true, true, true, true, false];

    this.wrapper.innerHTML = '';

    for (var i = 0; i <= times; i++) {
      var dot = document.createElement('div');
      dot.classList.add('dot');

      this.wrapper.appendChild(dot);

      if (!values[Math.floor(Math.random() * values.length)] || i <= 5) {
        dot.style.opacity = 0
      }
    }

    this.lastWidth = window.innerWidth;
  }
}
