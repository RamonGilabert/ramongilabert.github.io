// JavaScript gilabert.design

// MARK: - Window events

window.addEventListener('load', function() {

  var appearance = new Appearance();
  appearance.run();

  var separator = new Separator('dot-separator');
  separator.generate();

  var scroller = new Scroller();
  scroller.run();

  var email = document.getElementById('email-link');
  if (email !== undefined) {
    email.addEventListener('click', function() {
      var letter = decode("znvygb:enzba@tvynoreg.qrfvta");
      var subject = decode("Uryyb gurer! :)");
      var reference = letter + '?subject=' + subject;

      email.href = reference;
    });
  }

  window.addEventListener('resize', function() {
    separator.generate();
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
      scroller.method();
    }
  });
});

window.onbeforeunload = function() {
	window.scrollTo(0, 0);
}

function Scroller() {

  this.sections = [];
  this.method = '';
  this.length = 0;
  this.remaining = 0;

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
      this.remaining = this.length;
    }
  }

  this.manifesto = function() {
    var height = window.innerHeight;
    var sectionsLength = this.sections.length;
    var distance = window.innerHeight * 0.6;

    if (this.length !== sectionsLength) {
      distance = window.innerHeight * (1 + 0.7 * (this.length - sectionsLength - 1) + 0.7 * 0.5)
    }

    if (window.pageYOffset - distance > 0 && sectionsLength > 0) {
        var section = this.sections[0];
        if (section.classList.contains('scroll-appearance')) {
          section.classList.remove('scroll-appearance');
          this.sections.shift();
        }
    }

    this.remaining = this.sections.length;
  }
}

function Appearance() {

  this.run = function() {
    if (exists('manifesto')) {
      this.manifesto()
    }
  }

  this.manifesto = function() {
    var image = document.getElementById('hero-image');
    var header = document.getElementById('header');
    var glitches = document.getElementById('header-glitches');
    var descriptionNodes = document.getElementsByClassName('description-line');

    image.classList.remove('loading-hero-image');

    setTimeout(function() {
      header.classList.remove('loading-header');
      glitches.classList.remove('loading-header');
    }, 700);

    var i = 0;

    setTimeout(function() { loop() }, 200);

    function loop() {
      setTimeout(function() {
        var line = descriptionNodes[i];
        line.classList.remove('loading-hero-line');

        i = i + 1;

        if (i < 3) { loop() }
      }, 200 + (i * 5));
    }
  }
}

function Separator(name) {

  this.elementName = name;
  this.wrapper = document.getElementById(this.elementName);
  this.lastWidth = window.innerWidth;

  this.generate = function() {
    if ((window.innerWidth >= 1400
      || Math.abs(this.lastWidth - window.innerWidth) <= 10)
      && this.wrapper.innerHTML != '' || this.wrapper === undefined) {
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

function decode(letters) {
  return letters.replace(/[a-zA-Z]/g, function(c) {
    return String.fromCharCode((c <= "Z" ? 90 : 122)
    >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
  })
}

function exists(name) {
  return document.getElementById(name) !== undefined
}
