// Helper methods to make you type less.

// By Ramon Gilabert.

function prepareDocument() {
  HTMLDocument.prototype.id = function(name) {
    return this.getElementById(name);
  }

  HTMLDocument.prototype.classes = function(name) {
    return convert(this.getElementsByClassName(name));
  }

  HTMLDocument.prototype.class = function(name) {
    return this.classes(name)[0];
  }

  HTMLDocument.prototype.tags = function(name) {
    return convert(this.getElementsByTagName(name));
  }

  HTMLDocument.prototype.tag = function(name) {
    return this.tags(name)[0];
  }
}

function toggle(element, name, remove) {
  remove ? element.classList.remove(name) : element.classList.add(name);
}

function setupAnalytics() {
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','./js/analytics.js','ga');

  ga('create', 'UA-83429673-1', 'auto');
  ga('send', 'pageview');
}

function encryptCorreu(id) {
  const emails = document.classes(id);
  for (var i = 0; i < emails.length; i++) {
    const email = emails[i];

    email.addEventListener('click', function() {
      const letter = decode("znvygb:enzba@tvynoreg.qrfvta");
      const subject = decode("Lb!");
      const reference = letter + '?subject=' + subject;

      window.location.href = reference;
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
  if (document.tags('body').length <= 0) {
    return false
  }
  return document.tag('body').id === name;
}

function lives(variable) {
  return !(variable === undefined || variable === null);
}

function convert(object) {
  return [].map.call(object, function(element) { return element; });
}

function contentOffset(element) {
  const height = element.clientHeight;

  var offsetLeft = 0;

  do {
    if (!isNaN(element.offsetTop)) {
      offsetLeft += element.offsetTop;
    }
  } while(element = element.offsetParent);

  return offsetLeft;
}

const empty = function() { }

// Convenience

var animation = function() {
  return window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || function(callback) { window.setTimeout(callback, 1000 / 60) };
}();

// Modification of code by: james2doyle at: https://gist.github.com/james2doyle/5694700.

Math.inOutQuintic = function(t, b, c, d) {
  const ts = (t/=d)*t;
  const tc = ts*t;

  return b+c*(6*tc*ts + -15*ts*ts + 10*tc);
};

function scrollTo(position, time, callback) {

  function move(amount) {
    document.documentElement.scrollTop = amount;
    document.body.parentNode.scrollTop = amount;
    document.body.scrollTop = amount;
  }

  const start = window.pageYOffset;
  const change = position - start;
  const increment = 20;
  const duration = (typeof(time) === 'undefined') ? 500 : time;

  var currentTime = 0;

  function animate() {
    currentTime += increment;
    move(Math.inOutQuintic(currentTime, start, change, duration));

    if (currentTime < duration) {
      animation(animate);
    } else {
      if (typeof(callback) !== 'undefined') {
        callback();
      }
    }
  }

  animate();
}
