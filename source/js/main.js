// JavaScript of the main content of gilabert.design.

// MARK: - General values

prepareDocument();
setupAnalytics();

window.addEventListener('load', function() {
  var scroller = new Scroller();
  scroller.run();

  var prevent = new Prevent();
  prevent.images();

  encryptCorreu('email');
});

function Scroller() {

  this.run = function() {
    if (exists('myself')) {
      var header = document.tag('header');
      var footer = document.tag('footer');
      var content = document.class('content');
      var lastScroll = 0;
      var margin = 2;
      var superior = 2;
      var inferior = 1;

      window.addEventListener('scroll', function() {
        var offset = contentOffset(content);
        var position = window.pageYOffset;
        var up = position < lastScroll;

        if (position > offset * margin) {
          header.style.zIndex = inferior;
          footer.style.zIndex = superior;
        } else if (position < offset) {
          header.style.zIndex = superior;
          footer.style.zIndex = inferior;
        }

        lastScroll = position;
      });
    }
  }
}

function Prevent() {

  this.images = function() {
    var images = document.tags('img');

    for (var i = 0; i < images.length; i++) {
      var image = images[i];
      image.addEventListener('dragstart', function(event) {
        event.preventDefault();
      });
    }
  }
}
