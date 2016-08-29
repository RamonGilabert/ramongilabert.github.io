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

  HTMLElement.prototype.tags = function(name) {
    return convert(this.getElementsByTagName(name));
  }

  HTMLElement.prototype.tag = function(name) {
    return this.tags(name)[0];
  }
}

function abs(number) {
  return Math.abs(number);
}

function encryptCorreu(id) {
  var email = document.id(id);
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
  if (document.tags('body').length <= 0) {
    return false
  }
  return document.tag('body').id === name;
}

function convert(object) {
  return [].map.call(object, function(element) { return element; });
}

function slice(element, sizes) {
  var array = [];
  var i, j;

  for (i = 0, j = element.length; i < j; i = i + sizes) {
    array.push(element.slice(i, i + sizes));
  }

  return array
}

function toggle(element, name, remove) {
  remove ? element.classList.remove(name) : element.classList.add(name);
}

function getTransform(element) {
  var style = getComputedStyle(element)
  var transform = style.transform || style.webkitTransform;
  var expression = transform.match(/^matrix3d\((.+)\)$/);

  if (expression) {
    return parseFloat(expression[1].split(', ')[13]);
  }

  expression = transform.match(/^matrix\((.+)\)$/);

  return expression ? parseFloat(expression[1].split(', ')[5]) : 0;
}

function iterate(array, delay, callback, reverse) {
  if (reverse) {
    array.reverse();
  }

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

function positionOffset(element) {
  var height = element.clientHeight;
  var offsetLeft = 0;
  do {
    if (!isNaN(element.offsetTop)) {
      offsetLeft += element.offsetTop;
    }
  } while(element = element.offsetParent);

  return offsetLeft - window.innerHeight * 0.2 - height;
}

function isDetail() {
  return document.body.classList.contains('detail');
}

var empty = function() { }
