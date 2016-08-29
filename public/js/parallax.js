// Parallax effects in the detail

// Ramon Gilabert's art.

function Parallax() {

  this.elements = [];
  this.method = empty;

  this.prepare = function() {
    if (isDetail()) {
      this.method = this.detail;

      var containers = document.classes('image-wrapper');

      for (var i = 0; i < 2; i++) {
        var image = document.createElement('img');

        var source = './images/details/lights/parallax/first.png';
        var width = '540px';
        var left = '135px';
        var right = 'auto';
        var top = '0px';
        var position = 0;

        if (i == 1) {
          source = './images/details/lights/parallax/second.png';
          left = '120px';
          position = 2;
        }

        image.classList.add('parallax');
        image.src = source;
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
  }
}
