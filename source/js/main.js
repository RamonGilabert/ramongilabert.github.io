// JavaScript of the main content of gilabert.design.

// MARK: - General values

window.addEventListener('load', function() {
  prepareDocument();

  const parallax = new Parallax();
  parallax.prepare();

  const scroller = new Scroller();
  scroller.run();

  const resizer = new Resizer();
  resizer.run();

  const prevent = new Prevent();
  prevent.images();

  const click = new Click();
  click.indicator();

  encryptCorreu('email');
  setupAnalytics();
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
    const self = this;
    const translate = 100;
    const tagging = 210;
    const scale = 0.9;
    const fade = 0.05;
    const opacity = 0;
    const maximum = window.innerHeight;
    const element = document.class('myself');
    const name = document.class('name');
    const tag = document.class('designer');

    window.addEventListener('scroll', function() {
      calculate();
    });

    function calculate() {
      const offset = window.pageYOffset;

      if (offset > maximum * self.margin) { return }
      const translation = -(translate * offset) / maximum;
      const tratag = (-tagging * offset - 50 * maximum + 50 * offset) / maximum;
      const scalation = (scale * offset + maximum - offset) / maximum;
      const fading = (fade * offset + maximum - offset) / maximum;
      const opaque = (maximum - offset * 2) / maximum;

      animation(function() {
        element.style.transform = 'translate3d(-50%, ' + translation / 3.5 + '%, 0) scale3d(' + scalation + ', ' + scalation + ', 1)';
        tag.style.transform = 'translate3d(-50%, ' + tratag + '%, 0)';
        name.style.opacity = opaque;
        tag.style.opacity = fading;
      });
    }

    calculate();
  }
}

function Scroller() {

  this.run = function() {
    if (exists('myself')) {
      const content = document.class('content');
      const header = document.tag('header');
      const footer = document.tag('footer');
      const margin = 2;
      const inferior = 1;
      const superior = 2;

      var position = window.pageYOffset;
      var offset = contentOffset(content);

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
      const threshold = 400;
      const home = document.class('home');

      var last = 0;

      window.addEventListener('scroll', function() {
        const position = window.pageYOffset;
        const up = position < last;

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

function Resizer() {

  this.run = function() {
    if (exists('myself')) {
      const projects = document.class('projects').getElementsByClassName('inner')[0];

      window.addEventListener('resize', function() {
        calculate();
      });

      function calculate() {
        if (window.innerWidth < 700) { return }
        const gluten = document.class('gluten');
        const revolution = document.class('revolution');

        projects.style.height = gluten.offsetHeight + revolution.offsetHeight + 60 + 'px';
      }

      calculate();
    }
  }
}

function Click() {

  this.indicator = function() {
    if (exists('myself')) {
      const indicator = document.class('work');
      const offset = contentOffset(document.class('content'));

      indicator.addEventListener('click', function() {
        scrollTo(offset + 50, 750);
      });
    }
  }
}

function Prevent() {

  this.images = function() {
    const images = document.tags('img');

    for (var i = 0; i < images.length; i++) {
      const image = images[i];
      image.addEventListener('dragstart', function(event) {
        event.preventDefault();
      });
    }
  }
}
