// JavaScript gilabert.design

document.addEventListener('DOMContentLoaded', function() {

  var email = document.getElementById('email-link');
  var separator = new Separator('dot-separator');

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

function Separator(name) {

  this.elementName = name;
  this.wrapper = document.getElementById(this.elementName);
  this.lastWidth = window.innerWidth;

  this.generate = function() {
    if ((window.innerWidth >= 1400
      || Math.abs(this.lastWidth - window.innerWidth) <= 10)
      && this.wrapper.innerHTML != '') {
      return
    }

    var windowWidth = window.innerWidth >= 1400 ? 1400 : window.innerWidth;
    var width = windowWidth - 57;
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
