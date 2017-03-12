// JavaScript of the main content of gilabert.design.

// MARK: - General values

prepareDocument();
setupAnalytics();

window.addEventListener('load', function() {
  var scroller = new Scroller();
  scroller.run();

  var parallax = new Parallax();
  parallax.prepare();

  var prevent = new Prevent();
  prevent.images();

  var click = new Click();
  click.indicator();

  encryptCorreu('email');
});

function Parallax() {

  this.method = empty;
  this.margin = 1.5;

  this.prepare = function() {
    if (exists('myself')) {
      this.method = this.myself;
    }

    this.method();
  }

  this.myself = function() {
    var self = this;
    var maximum = window.innerHeight;
    var translate = 100;
    var tagging = 200;
    var scale = 0.9;
    var opacity = 0;
    var element = document.class('myself');
    var name = document.class('name');
    var tag = document.class('designer');

    window.addEventListener('scroll', function() {
      calculate();
    });

    function calculate() {
      var offset = window.pageYOffset;

      if (offset > maximum * self.margin) { return }
      var translation = -(translate * offset) / maximum;
      var tratag = (-tagging * offset - 50 * maximum + 50 * offset) / maximum;
      var scalation = (scale * offset + maximum - offset) / maximum;
      var opaque = (maximum - offset * 2) / maximum;

      animation(function() {
        element.style.transform = 'translate3d(-50%, ' + translation / 3.5 + '%, 0) scale3d(' + scalation + ', ' + scalation + ', 1)';
        tag.style.transform = 'translate3d(-50%, ' + tratag + '%, 0)';
        name.style.opacity = opaque;
        tag.style.opacity = opaque;
      });
    }

    calculate();
  }
}

function Scroller() {

  this.run = function() {
    if (exists('myself')) {
      var header = document.tag('header');
      var footer = document.tag('footer');
      var content = document.class('content');
      var offset = contentOffset(content);
      var position = window.pageYOffset;
      var lastScroll = 0;
      var margin = 2;
      var superior = 2;
      var inferior = 1;

      window.addEventListener('scroll', function() {
        offset = contentOffset(content);
        position = window.pageYOffset;
        calculate();
      });

      calculate();

      function calculate() {
        if (position > offset * margin) {
          header.style.zIndex = inferior;
          footer.style.zIndex = superior;
        } else if (position < offset) {
          header.style.zIndex = superior;
          footer.style.zIndex = inferior;
        }
      }
    } else if (document.tag('body').classList[0] === 'case') {
      var home = document.class('home');
      var last = 0;
      var threshold = 400;

      window.addEventListener('scroll', function() {
        var position = window.pageYOffset;
        var up = position < last;

        if (up || last == 0) {
          home.style.transform = 'rotateZ(90deg)';
        } else if (position > threshold) {
          home.style.transform = 'rotateZ(90deg) translateX(-100%)';
        }

        last = position;
      });
    }
  }
}

function Click() {

  this.indicator = function() {
    if (exists('myself')) {
      var indicator = document.class('work');
      var offset = contentOffset(document.class('content'));

      indicator.addEventListener('click', function() {
        scrollTo(offset + 50, 750);
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
