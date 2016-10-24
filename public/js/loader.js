// Loader JavaScript functions.

// By Ramon Gilabert

// Don't really know what I'm doing here.
// And would be nice to have it for today.

function Loader() {

  this.images = [
    './images/sections/myself.jpg',
    './images/sections/lights.jpg',
    './images/sections/friends.jpg',
    './images/sections/branding.jpg',

    './images/hero/header.jpg',

    './images/resources/gradient.png',

    './images/details/lights/first.jpg',
    './images/details/lights/second.jpg',
    './images/details/lights/third.jpg',
    './images/details/lights/fourth.jpg',
    './images/details/lights/fifth.jpg',
    './images/details/lights/parallax/first.png',
    './images/details/lights/parallax/second.png',
    './images/details/lights/process/first.jpg',
    './images/details/lights/process/second.jpg',
    './images/details/lights/attempt/first.jpg',
    './images/details/lights/attempt/second.jpg',
    './images/details/lights/attempt/third.jpg',

    './images/details/branding/first.jpg',
    './images/details/branding/second.jpg',
    './images/details/branding/third.jpg',
    './images/details/branding/fourth.jpg',
    './images/details/branding/parallax/first.png',
    './images/details/branding/process/first.jpg',
    './images/details/branding/process/second.jpg',
    './images/details/branding/attempt/first.jpg',
    './images/details/branding/attempt/second.jpg'
  ];

  this.loaded = [];
  this.amount = 0;
  this.actualPercentage = 0;
  this.sides = 'right 0.15s linear, left 0.8s ease';
  this.opacity = 'opacity 0.8s ease';
  this.transformation = 'transform 0.8s ease';

  this.preload = function(callback) {
    var startingTime = new Date().getTime();
    var page = document.id('loader');

    var bar = document.class('bar');
    var link = document.class('link-wrapper');
    var percentage = document.class('percentage');
    var self = this;

    page.style.transition = this.opacity;
    bar.style.transition = this.sides;
    link.style.transition = this.transformation;
    percentage.style.transition = this.transformation;

    if (sessionStorage['loaded'] != undefined) {
      out(false);
      return;
    }

    link.style.transform = 'translate(-50%, ' + 0 + '%)';
    percentage.style.transform = 'translateX(0px)';
    percentage.innerHTML = '0%';

    function done() {
      self.amount = self.amount + 1;

      var value = 100 * self.amount / self.images.length;
      bar.style.right = (100 - value) + '%';

      var i = Math.floor(self.actualPercentage);
      self.actualPercentage = Math.floor(value);
      numbers();

      function numbers() {
        setTimeout(function() {
          percentage.innerHTML = i + '%';

          i = i + 1;
          if (i <= value) { numbers(); }
        });
      }

      if (self.amount === self.images.length) {
        sessionStorage['loaded'] = true;
        setTimeout(function() { out(); }, 200);
      }
    }

    function out(animate) {
      animate = animate === undefined ? true : animate;

      var currentTime = new Date().getTime()

      if (animate) {
        page.style.opacity = 0;
        bar.style.left = '100%';
        link.style.transform = 'translate(-50%, ' + 500 + '%)';
        percentage.style.transform = 'translateX(200px)';
      }

      setTimeout(function() {
        page.style.display = 'none';

        setTimeout(function() { callback(); }, 0);
      }, animate ? 400 : 0);
    }

    var i = 0;
    setTimeout(function() { loop(); }, 1400);

    function loop() {
      setTimeout(function() {
        var image = new Image();
        image.src = self.images[i];

        image.addEventListener('load', function() {
          done();
        });

        image.addEventListener('error', function() {
          done();
        });

        self.loaded[i] = image;

        i = i + 1;

        if (i < self.images.length) { loop(); }
      }, 25);
    }
  }
}
