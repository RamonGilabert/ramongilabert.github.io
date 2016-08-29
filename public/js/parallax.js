// Parallax effects in the detail

// Ramon Gilabert's art.

function Parallax() {

  this.elements = [];
  this.method = empty;

  this.prepare = function() {
    if (isDetail()) {
      this.method = this.detail;
    }
  }

  this.detail = function() {
    var headerText = document.class('hero-text-wrapper');

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
        var value = -(offset - positioning) * 50 / (height + image.clientHeight);
        image.style.transform = 'translate3d(0, ' + value + '%, 0)';
      }
    }
  }
}
