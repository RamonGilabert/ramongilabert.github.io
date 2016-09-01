// Parallax effects in the detail

// Ramon Gilabert's art.

function Parallax() {

  this.elements = [];
  this.images = [];
  this.method = empty;
  this.headerText = '';
  this.quote = '';
  this.figure = '';

  this.prepare = function() {
    if (isDetail()) {
      this.method = this.detail.bind(this);

      var containers = document.classes('image-wrapper');
      var times = exists('lights') ? 2 : 1;

      for (var i = 0; i < times; i++) {
        var image = document.createElement('img');

        var source, width, left, right, top, position, alt, title;

        if (exists('lights')) {
          source = './images/details/lights/parallax/first.png';
          width = '55%';
          top = '-15px';
          right = 'auto';
          left = '14%';
          position = 0;
          alt = 'Lights Starting screen detail';
          title = 'Lights Start';

          if (i == 1) {
            source = './images/details/lights/parallax/second.png';
            left = '12%';
            position = 2;
            alt = 'Lights Paired screen detail';
            title = 'Lights Paired';
          }
        } else if (exists('friends')) {
          source = './images/details/friends/parallax/first.png';
          width = '70%';
          left = '15%';
          right = 'auto';
          top = '0px';
          position = 1;
          alt = 'Bonus Checks and coupons of the app';
          title = 'Bonus Checks';
        } else if (exists('branding')) {
          source = './images/details/branding/parallax/first.png';
          width = '75%';
          left = '12.5%';
          right = 'auto';
          top = '100px';
          position = 1;
          alt = 'Business cards of Ramon Gilabert';
          title = 'Business Card';
        }

        image.src = source;
        image.alt = alt;
        image.title = title;
        image.classList.add('parallax');
        image.style.position = 'absolute';
        image.style.width = width;
        image.style.top = top;
        image.style.right = right;
        image.style.left = left;

        containers[position].appendChild(image);
      }

      this.images = document.classes('parallax');
      this.figure = document.class('hero').tag('figure');
      this.headerText = document.class('hero-text-wrapper');
      this.quote = document.class('quoter');
    }
  }

  this.detail = function() {
    var height = window.innerHeight;
    var offset = window.pageYOffset;

    if (offset < height) {
      var value = -50 + (offset * 100 / height);
      this.headerText.style.transform = 'translate3d(0, ' + value + '%, 0)';

      // TODO: Uncomment if it applies.
      // var background = 50 - 100 * offset / height;
      // this.figure.style.backgroundPosition = '50% ' + background + '%';
    }

    if (this.quote !== undefined) {
      var positioning = positionOffset(this.quote) - 100;
      if (positioning <= offset && positioning + this.quote.clientHeight + height >= offset) {
        var value = (offset - positioning) * 50 / (height + this.quote.clientHeight);
        this.quote.style.transform = 'translate3d(0, ' + value + '%, 0)';
      }
    }

    for (var i = 0; i < this.images.length; i++) {
      var image = this.images[i];
      var positioning = positionOffset(image);

      if (positioning <= offset && positioning + image.clientHeight + height >= offset) {
        var value = (offset - positioning) * 20 / (height + image.clientHeight);
        image.style.transform = 'translate3d(0, ' + value + '%, 0)';
      }
    }
  }
}
