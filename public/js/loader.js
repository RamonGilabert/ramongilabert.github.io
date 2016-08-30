// Loader JavaScript functions.

// By Ramon Gilabert

// Don't really know what I'm doing here.
// And would be nice to have it for today.

function Loader() {

  this.images = [
    './images/sections/myself.jpg',
    './images/sections/lights.jpg',
    './images/sections/varner.jpg',
    './images/sections/branding.jpg',

    './images/hero/header.png',

    './images/resources/gradient.png',

    './images/details/lights/first.jpg',
    './images/details/lights/second.jpg',
    './images/details/lights/third.jpg',
    './images/details/lights/fourth.jpg',
    './images/details/lights/fifth.jpg',
    './images/details/lights/parallax/first.png',
    './images/details/lights/parallax/second.png',

    './images/details/friends/first.jpg',
    './images/details/friends/second.jpg',
    './images/details/friends/third.jpg',
    './images/details/friends/parallax/first.png',

    './images/details/branding/first.jpg',
    './images/details/branding/second.jpg',
    './images/details/branding/third.jpg',
    './images/details/branding/fourth.jpg',
    './images/details/branding/parallax/first.png'
  ];

  this.loaded = [];
  this.amount = 0;
  this.sides = 'right 0.3s ease, left 0.8s ease';
  this.opacity = 'opacity 0.8s ease';
  this.transformation = 'transform 0.8s ease';

  this.preload = function(callback) {
    var page = document.id('loader');

    var bar = document.class('bar');
    var link = document.class('link-wrapper');
    var percentage = document.class('percentage');

    page.style.transition = this.opacity;
    bar.style.transition = this.transformation;
    link.style.transition = this.sides;
    percentage.style.transition = this.transformation;

    if (sessionStorage['loaded'] != undefined) {
      out(false);

      return;
    }

    var self = this;

    function done() {
      self.amount = self.amount + 1;

      var percentage = window.innerWidth * self.amount / self.images.length;
      bar.style.right = (100 - percentage) + '%';

      if (self.amount == self.images.length) {
        sessionStorage['loaded'] = true;
        out();
      }
    }

    function out(animate) {
      animate = animate === undefined ? true : animate;

      if (animate) {
        page.style.opacity = 0;
        bar.style.left = '100%';
        link.style.transform = 'translate(-50%, ' + 20 + '%)';
        percentage.style.transform = 'translateX(' + 100 + 'px)';
      }

      setTimeout(function() {
        page.style.display = 'none';

        setTimeout(function() { callback(); }, 100);
      }, animate ? 1400 : 0);
    }

    for (var i = 0; i < this.images.length; i++) {
      var image = new Image();
      image.src = self.images[i];

      image.addEventListener('load', function() {
        done();
      });

      image.addEventListener('error', function() {
        done();
      });

      self.loaded[i] = image;
    }
  }
}
