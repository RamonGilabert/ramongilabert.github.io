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

function encryptCorreu() {
  var email = document.id('email-link');
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

function toggle(element, name, remove) {
  remove ? element.classList.remove(name) : element.classList.add(name);
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

function empty() { }
