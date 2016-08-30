// Parallax effects in the detail

// Ramon Gilabert's art.

function Parallax() {

  this.elements = [];
  this.method = empty;

  this.prepare = function() {
    if (isDetail()) {
      this.method = this.detail;

      var containers = document.classes('image-wrapper');
      var times = exists('lights') ? 2 : 1;

      for (var i = 0; i < times; i++) {
        var image = document.createElement('img');

        var source, width, left, right, top, position;

        if (exists('lights')) {
          source = './images/details/lights/parallax/first.png';
          width = '55%';
          left = '14%';
          right = 'auto';
          top = '0px';
          position = 0;

          if (i == 1) {
            source = './images/details/lights/parallax/second.png';
            left = '12%';
            position = 2;
          }
        } else if (exists('friends')) {
          source = './images/details/friends/parallax/first.png';
          width = '70%';
          left = '15%';
          right = 'auto';
          top = '0px';
          position = 1;
        } else if (exists('branding')) {
          source = './images/details/branding/parallax/first.png';
          width = '75%';
          left = '12.5%';
          right = 'auto';
          top = '100px';
          position = 1;
        }

        image.src = source;
        image.classList.add('parallax');
        image.style.position = 'absolute';
        image.style.width = width;
        image.style.top = top;
        image.style.right = right;
        image.style.left = left;

        containers[position].appendChild(image);
      }
    }
  }

  this.detail = function() {
    var headerText = document.class('hero-text-wrapper');
    var images = document.classes('parallax');
    var quote = document.class('quoter');

    var height = window.innerHeight;
    var offset = window.pageYOffset;

    if (offset < height) {
      var value = -50 + (offset * 150 / height);
      headerText.style.transform = 'translate3d(0, ' + value + '%, 0)';
    }

    for (var i = 0; i < images.length; i++) {
      var image = images[i];
      var positioning = positionOffset(image);

      if (positioning <= offset && positioning + image.clientHeight + height >= offset) {
        var value = (offset - positioning) * 20 / (height + image.clientHeight);
        image.style.transform = 'translate3d(0, ' + value + '%, 0)';
      }
    }

    if (quote === undefined) { return; }

    var positioning = positionOffset(quote) - 100;
    if (positioning <= offset && positioning + quote.clientHeight + height >= offset) {
      var value = (offset - positioning) * 100 / (height + quote.clientHeight);
      quote.style.transform = 'translate3d(0, ' + value + '%, 0)';
    }
  }
}
