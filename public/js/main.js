// JavaScript gilabert.design

// MARK: - Window events

var appearance = new Appearance();

window.addEventListener('load', function() {

  appearance.run();

  var separator = new Separator('dot-separator');
  separator.generate();

  var scroller = new Scroller();
  scroller.run();

  var resizer = new Resizer();
  resizer.prepare();

  var disappear = new Disappear();
  disappear.prepare();

  encryptEmail();

  window.addEventListener('resize', function() {
    separator.generate();
    resizer.method();
  });

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
  });
});

window.onbeforeunload = function() {
	window.scrollTo(0, 0);
}

function Scroller() {

  this.sections = [];
  this.method = function() { };
  this.length = 0;

  this.run = function() {
    if (exists('manifesto')) {
      var story = document.getElementsByClassName('story')[0]
      .getElementsByTagName('div')[0];
      var manifesto = document.getElementsByClassName('manifesto')[0]
      .getElementsByTagName('div')[0];
      var awards = document.getElementsByClassName('awards')[0]
      .getElementsByTagName('div')[0];
      var footer = document.getElementById('footer')
      .getElementsByTagName('div')[0];

      this.sections = [story, manifesto, awards, footer];
      this.method = this.manifesto
      this.length = this.sections.length;
    }
  }

  this.manifesto = function() {
    var height = window.innerHeight
    var sectionsLength = this.sections.length;
    var initialPercentageTrigger = 0.6;
    var distance = window.innerHeight * initialPercentageTrigger;
    var sectionHeight = 0.7;
    var percentageTrigger = 0.5;
    var minimumHeight = window.innerHeight > 600 * 0.7 ? window.innerHeight : 600 * 0.7;

    if (this.length !== sectionsLength) {
      distance = window.innerHeight + minimumHeight * (sectionHeight
        * (this.length - sectionsLength - 1) + sectionHeight * percentageTrigger)
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

function Appearance() {

  this.method = function() { };

  this.run = function() {
    if (exists('manifesto')) {
      this.method = this.manifesto;
      this.method(true);
    } else if (exists('myself')) {
      this.method = this.myself;
      this.method(true);
    }
  }

  this.manifesto = function(enter, callback) {
    callback = callback || empty

    var image = document.getElementById('hero-image').getElementsByTagName('img')[0];
    var header = document.getElementById('header');
    var glitches = document.getElementById('header-glitches');
    var descriptionNodes = document.getElementsByClassName('description-line');
    var imageTiming = enter ? 0 : 500;
    var beautyTiming = enter ? 700 : 0;
    var descriptionTiming = enter ? 200 : 0;

    setTimeout(function() {
      toggle(image, 'loading-hero-image', enter);
    }, imageTiming);

    setTimeout(function() {
      toggle(header, 'loading-header', enter);
      toggle(glitches, 'loading-header', enter);
    }, beautyTiming);

    iterate(descriptionNodes, descriptionTiming, function(component) {
      toggle(component, 'loading-hero-line', enter);
    });

    setTimeout(function() {
      callback();
    }, 1000);
  }

  this.myself = function(enter, callback) {
    callback = callback || empty

    var myself = document.getElementById('sections');
    var index = Math.abs(myself.scrollTop / window.innerHeight);
    var figures = convert(myself.getElementsByTagName('figure'));
    var titles = convert(document.getElementsByClassName('title'));
    var texts = convert(myself.getElementsByTagName('p'));
    var buttons = convert(myself.getElementsByTagName('a'));
    var navigation = document.getElementsByTagName('nav')[0];
    var details = document.getElementById('details');
    var header = document.getElementsByTagName('header')[0];
    var opacity = enter ? 1 : 0;
    var left = enter ? 'auto' : '-75px';
    var detailsTiming = enter ? 700 : 0;

    var figure = figures[index];
    var title = titles[index];
    var paragraph = texts[index];
    var button = buttons[index];

    figures.splice(figures.indexOf(figure), 1);
    titles.splice(titles.indexOf(title), 1);
    texts.splice(texts.indexOf(paragraph), 1);
    buttons.splice(buttons.indexOf(button), 1);

    for (var i = 0; i < titles.length; i++) {
      var components = [titles[i], texts[i], buttons[i], figures[i]];

      for (var j = 0; j < components.length; j++) {
        var component = components[j];
        component.style.transition = '';
        component.style.opacity = opacity;

        if (!figures.includes(component)) {
          component.style.left = left;
        }
      }
    }

    iterate([title, paragraph, button], 0, function(node) {
      node.style.transition = 'left 0.6s ease, opacity 0.6s ease';
      node.style.left = left;
      node.style.opacity = opacity;
    });

    setTimeout(function() {
      var curve = 'opacity 0.8s ease';
      var array = [header, navigation, details, figure];

      for (var position = 0; position < array.length; position++) {
        var element = array[position];
        element.style.transition = curve;
        element.style.opacity = opacity;
      }
    }, detailsTiming);

    setTimeout(function() {
      callback();
    }, 1500);
  }
}

function Disappear() {

  this.elements = [];
  this.method = function() { };

  this.prepare = function() {
    if (exists('manifesto')) {
      this.elements = [document.getElementById('back-button')];
      this.method = this.manifesto;
    } else if (exists('myself')) {
      this.elements = convert(document.getElementsByClassName('intercept'));
      this.method = this.myself;
    }

    for (var i = 0; i < this.elements.length; i++) {
      var self = this;
      var element = this.elements[i];

      element.addEventListener('click', function(event) {
        event.preventDefault();
        var href = element.href;
        element.href = '#';

        appearance.method(false, function() {
          window.location = href;
        });
      });
    }
  }
}

function Resizer() {

  this.method = function() { };
  this.reference = '';
  this.movable = '';
  this.minimumWidth = 900;

  this.prepare = function() {
    if (exists('manifesto')) {
      this.method = this.manifesto;
      this.reference = document.getElementById('hero-image');
      this.movable = document.getElementById('hero-description');
    } else if (exists('myself')) {
      this.method = this.myself;
      this.sections = document.getElementsByTagName('sections');
      this.movable = document.getElementsByTagName('nav')[0];
    }

    this.method();
  }

  this.manifesto = function() {
    var halfWindow = window.innerWidth / 2;
    var referenceWidth = this.reference.offsetWidth / 2;
    var margin = 30;

    this.movable.style.left = halfWindow + referenceWidth + margin + 'px';
  }

  this.myself = function() {
    var ownWidth = this.movable.offsetWidth / 2;
    var margin = 44;

    this.movable.style.right = margin - ownWidth + 'px';
  }
}

function Separator(name) {

  this.elementName = name;
  this.wrapper = document.getElementById(this.elementName);
  this.lastWidth = window.innerWidth;

  this.generate = function() {
    if (!exists(this.elementName)) { return; }

    if ((window.innerWidth >= 1400
      || Math.abs(this.lastWidth - window.innerWidth) <= 10)
      && this.wrapper.innerHTML != '') {
      return;
    }

    var maximumWidth = 1400;
    var sideOffset = 57;
    var windowWidth = window.innerWidth >= maximumWidth
    ? maximumWidth : window.innerWidth;
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

// MARK: - Helper functions

function encryptEmail() {
  var email = document.getElementById('email-link');
  if (email !== null) {
    email.addEventListener('click', function() {
      var letter = decode("znvygb:enzba@tvynoreg.qrfvta");
      var subject = decode("Uryyb gurer! :)");
      var reference = letter + '?subject=' + subject;

      email.href = reference;
    });
  }
}

function decode(letters) {
  return letters.replace(/[a-zA-Z]/g, function(c) {
    return String.fromCharCode((c <= "Z" ? 90 : 122)
    >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
  })
}

function exists(name) {
  if (document.getElementsByTagName('body').length <= 0) {
    return false
  }
  return document.getElementsByTagName('body')[0].id === name;
}

function convert(object) {
  return [].map.call(object, function(element) { return element; });
}

function toggle(element, name, remove) {
  remove ? element.classList.remove(name) : element.classList.add(name);
}

function iterate(array, delay, callback) {
  var index = 0;
  setTimeout(function() { loop(); }, delay);

  function loop() {
    setTimeout(function() {
      callback(array[index]);

      index = index + 1;

      if (index < array.length) { loop(); }
    }, 150 + (index * 5));
  }
}

function empty() { }
