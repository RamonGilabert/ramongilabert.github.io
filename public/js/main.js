// JavaScript gilabert.design

window.addEventListener('load', function() {

  var email = document.getElementById('email-link');
  var manifesto = document.getElementById('hero');
  var separator = new Separator('dot-separator');

  manifesto.classList.remove('loading');
  separator.generate();

  email.addEventListener('click', function() {
    var letter = decode("znvygb:enzba@tvynoreg.qrfvta");
    var subject = decode("Uryyb gurer! :)");
    var reference = letter + '?subject=' + subject;

    email.href = reference;
  });

  function decode(letters) {
    return letters.replace(/[a-zA-Z]/g, function(c) {
      return String.fromCharCode((c <= "Z" ? 90 : 122)
      >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
    })
  }

  window.addEventListener('resize', function() {
    separator.generate();
  });
});

function Appearance() {

  this.manifesto = function() {

  }
}

function Separator(name) {

  this.elementName = name;
  this.wrapper = document.getElementById(this.elementName);
  this.lastWidth = window.innerWidth;

  this.generate = function() {
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

window.onbeforeunload = function() {
	window.scrollTo(0, 0);
}
