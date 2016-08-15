// JavaScript gilabert.design

// MARK: - Window events

window.addEventListener('load', function() {

  var appearance = new Appearance();
  appearance.run()

  var separator = new Separator('dot-separator');
  separator.generate();

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
});

function Appearance() {

  this.run = function() {
    if (document.getElementById('manifesto') !== undefined) {
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

window.onbeforeunload = function() {
	window.scrollTo(0, 0);
}

// MARK: - Helper functions

function decode(letters) {
  return letters.replace(/[a-zA-Z]/g, function(c) {
    return String.fromCharCode((c <= "Z" ? 90 : 122)
    >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
  })
}
