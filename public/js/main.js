// JavaScript of the main content of gilabert.design.

// MARK: - General values

const displaying = '1.6s transform cubic-bezier(0.5, 0.15, 0.15, 1)';
const leaving = '0.7s transform cubic-bezier(0.5, 0.15, 0.15, 1)';

const load = new Load();
const transition = new Transition();
const loader = new Loader();
const grid = new Grid();
const resizer = new Resizer();
const prevent = new Prevent();
const hover = new Hover();
const parallax = new Parallax();
const scroller = new Scroller();

document.addEventListener('DOMContentLoaded', function() {
  prepareDocument();
  // load.prepare(); // REMOVE THIS

  const white = document.class('transition');
  setTimeout(function() {
    white.style.transition = displaying;
    load.prepare();

    setTimeout(function() {
      white.style.transform = 'translate3d(300%, 0, 0)';

      setTimeout(function() {
        white.style.display = 'none';
      }, 4000);
    }, 200);
  }, 0);

  // hover.watch();
});

window.addEventListener('load', function() {
  loader.run();
  transition.prepare();

  setupAnalytics();
});

function Load() {

  this.prepare = function() {
    grid.listen();
    resizer.run();
    prevent.images();
    parallax.prepare();
    scroller.run();

    encryptCorreu('email');
  }
}

function Loader() {

  this.images = [
    './images/projects/linjer/linjer.jpg',
    './images/projects/aparcat/aparcat.jpg',
    './images/projects/manjaras/manjaras.jpg',
    './images/projects/redbull/redbull.jpg',
    './images/projects/linjer/introduction.jpg',
    './images/projects/aparcat/introduction.jpg',
    './images/projects/manjaras/introduction.jpg'
  ]

  this.loaded = [];

  this.run = function() {
    const self = this;

    var i = 0;

    function loop() {
      setTimeout(function() {
        var image = new Image();
        image.src = self.images[i];

        image.addEventListener('load', function() { });
        image.addEventListener('error', function() { });

        self.loaded[i] = image;

        i = i + 1;

        if (i < self.images.length) { loop(); }
      }, 0);
    }

    setTimeout(function() { loop(); }, 0);
  }
}

function Grid() {
  this.listen = function() {
    window.onkeyup = function(event) {
      const key = event.keyCode ? event.keyCode : event.which;
      const row = document.class('row');

      if (key == 71) {
        row.style.opacity = row.style.opacity == 0 ? 1 : 0;
      }
    }
  }
}

function Resizer() {

  this.run = function() {
    const boxes = document.classes('box');
    const rights = document.classes('proof-right');
    const lefts = document.classes('proof-left');
    const fulls = document.classes('full');
    const backgrounds = document.classes('full-box');
    const cards = document.classes('imagery');
    const container = document.class('cards');
    const navigation = document.class('navigation-wrapper');
    const social = document.class('social');
    const texts = [];

    window.removeEventListener('resize', calculate);
    window.addEventListener('resize', calculate);

    function iterate(properties, value, should = false, full = true) {
      for (var i = 0; i < properties.length; i++) {
        const proof = properties[i];
        
        if (window.innerWidth > 1920) {
          proof.style.marginLeft = '-' + ((window.innerWidth - 1920) / 2 + (19.2 * 12.4)) + 'px';
          proof.style.width = ((window.innerWidth - 1920) / 2 + (19.2 * value)) + 'px';

          if (value == 100) {
            proof.style.width = '100vw';
          }

          if (should == true) {
            proof.style.marginLeft = '0px';
            proof.style.width = ((window.innerWidth - 1920) / 2 + (19.2 * 87.6)) + 'px';
          }
        } else if (window.innerWidth < 1300) {
          proof.style.marginLeft = '-6.2vw';
          proof.style.width = '100vw';
        } else if (window.innerWidth < 1920) {
          proof.style.marginLeft = '-12.4vw';
          proof.style.width = 93.9 + 'vw';

          if (value == 100) {
            proof.style.width = '100vw';
          }

          if (should == true) {
            proof.style.marginLeft = '0px';
            proof.style.width = 87.6 + 'vw';
          }
        }
      }
    }

    function calculate() {
      iterate(boxes, 93.8, false);
      iterate(rights, 93.8, true, false);
      iterate(lefts, 93.8, false, false);
      iterate(fulls, 100, false);
      iterate(backgrounds, 100, false);

      var variable = window.innerWidth;
      var factor = 4 / 3;
      var number = 2;
      var description = 148;
      var percentage = 0.355;
      var margin = 80;
      var additional = 140;

      if (variable > 1920) {
        variable = 1920;
      }

      if (variable < 650) {
        percentage = 0.875;
        description = 80;
        number = 4;
        margin = 40;
        additional = 240;
      } else if (variable < 900 && variable > 650) {
        factor =  1.75;
        percentage = 0.875;
        description = 116;
        number = 4;
        margin = 52;
      } else if (variable <= 1600) {
        description = 120;
        additional = 100

        if (variable < 1050) {
          additional = 180;
        } else if (variable < 1450) {
          additional = 220;
        }
      }

      const calculation = (variable * percentage * factor - description);
      const containerHeight = (calculation + description + margin) * number + additional;

      for (var i = 0; i < cards.length; i++) {
        const card = cards[i];
        card.style.height = calculation + 'px';
      }

      if (lives(container)) {
        container.style.height = containerHeight + 'px';
      }

      if (lives(social)) {
        social.style.marginLeft = variable * 0.846 + 'px';
      }
    }

    calculate();
  }
}

function Prevent() {

  this.images = function() {
    const images = document.tags('img');

    for (var i = 0; i < images.length; i++) {
      const image = images[i];
      image.removeEventListener('dragstart', drag);
      image.addEventListener('dragstart', drag);
    }

    function drag(event) {
      event.preventDefault();
    }
  }
}

function Parallax() {

  this.prepare = function() {
    if (exists('myself')) {
      this.myself();
    }
  }

  this.myself = function() {
    const self = this;
    const translate = 300;
    const maximum = window.innerHeight;
    const selection = document.class('selection');
    const social = document.class('social');
    const final = contentOffset(document.class('social')) - window.innerHeight;

    window.removeEventListener('scroll', calculate);
    window.addEventListener('scroll', calculate);

    function calculate() {
      const offset = window.pageYOffset;

      animation(function() {
        if (offset > final) {
          const socialTranslate = (offset - final) / maximum * 475;
          //social.style.transform = 'rotate(90deg) translate3d(' + socialTranslate + 'px, 0, 0)'
        } else {
          const selectionTranslate = -(translate * offset) / maximum - 400;
          selection.style.transform = 'rotate(-90deg) translate3d(' + selectionTranslate + 'px, 0, 0)'
        }
      });
    }

    calculate();
  }
}

function Scroller() {

  this.run = function() {
    var first = document.class('overview-link');
    var second = document.class('problem-link');
    var third = document.class('solution-link');
    var top = 'overview';
    var middle = 'problem';
    var bottom = 'solution';

    if (exists('myself')) {
      first = document.class('work-link');
      second = document.class('about-link');
      third = document.class('social-link');
      top = 'projects';
      middle = 'personal';
      bottom = 'personal';
    }

    first.removeEventListener('click', move);
    first.addEventListener('click', move);
    second.removeEventListener('click', scroll);
    second.addEventListener('click', scroll);
    third.removeEventListener('click', below);
    third.addEventListener('click', below);

    function move() {
      const container = contentOffset(document.class(top));
      scrollTo(container - 150, 750);
    }

    function scroll() {
      const container = contentOffset(document.class(middle));
      scrollTo(container - 150, 1500);
    }

    function below() {
      const container = contentOffset(document.class(bottom));
      scrollTo(container - 150, 1500);
    }

    const threshold = 400;
    const navigation = document.tag('nav');

    var last = 0;

    window.removeEventListener('scroll', casing);
    window.addEventListener('scroll', casing);

    function casing() {
      const position = window.pageYOffset;
      const up = position < last;

      if (up || last == 0) {
        navigation.style.transform = 'translateY(0)';
      } else if (position > threshold) {
        navigation.style.transform = 'translateY(-100%)';
      }

      last = position;
    }
  }
}

function Hover() {

  this.watch = function() {
    document.class('small-owl').onmouseover = function() { over() };
    document.class("small-owl").onmouseout = function() { out() };

    const darks = document.classes('dark');
    const lights = document.classes('light');
    const lighters = document.classes('lighter');
    const lightens = document.classes('lighten');

    function over() {
      for (var i = 0; i < darks.length; i++) {
        const dark = darks[i];
        dark.classList.add('lighten-color');
      }

      for (var i = 0; i < lights.length; i++) {
        const light = lights[i];
        light.classList.add('darken-background');
      }

      for (var i = 0; i < lighters.length; i++) {
        const light = lighters[i];
        light.classList.add('darker-background');
      }

      for (var i = 0; i < lightens.length; i++) {
        const light = lightens[i];
        light.classList.add('svg-background');
      }
    }

    function out() {
      for (var i = 0; i < darks.length; i++) {
        const dark = darks[i];
        dark.classList.remove('lighten-color');
      }

      for (var i = 0; i < lights.length; i++) {
        const light = lights[i];
        light.classList.remove('darken-background');
      }

      for (var i = 0; i < lighters.length; i++) {
        const light = lighters[i];
        light.classList.remove('darker-background');
      }

      for (var i = 0; i < lightens.length; i++) {
        const light = lightens[i];
        light.classList.remove('svg-background');
      }
    }
  }
}

function Transition() {

  this.prepare = function() {
    var cache = {};

    window.removeEventListener('popstate', page);
    window.addEventListener('popstate', page);

    document.removeEventListener('click', click);
    document.addEventListener('click', click);

    preload();

    function preload() {
      const base = location.href.substring(0, location.href.lastIndexOf("/") + 1);
      const linjer = base + 'linjer';
      const aparcat = base + 'aparcat';
      const manjaras = base + 'manjaras';
      const index = base;
      const urls = [linjer, aparcat, manjaras, index];

      for (var i in urls) {
        var url = urls[i];
        if (!document.location.host) {
          url = url + '.html';
        }

        fetch(url).then(function(response) { });
      }
    }

    function click(event) {
      var element = event.target;

      while (element && !element.href) {
        element = element.parentNode;
      }

      if (element === null) { return }
      if (element.classList.contains('external') === true) { return }

      if (element.classList.contains('direction')) {
        event.preventDefault();

        var url = element.href;
        var direction = url.split("/").pop();
        if (!document.location.host) {
          if (direction.length === 0) {
            url = url + 'index.html';
          } else {
            url = url + '.html';
          }
        }

        history.pushState(null, null, url);
        page();
      }
    }

    function page() {
      var url = window.location.href;
      fetch(url).then(function(response) {
        const old = document.body;
        const white = document.class('transition');

        var wrapper = document.createElement('html');
        wrapper.innerHTML = response;

        const title = wrapper.querySelector('title').innerHTML;
        const content = wrapper.getElementsByTagName('body')[0];
        const black = wrapper.getElementsByClassName('transition')[0];

        black.style.transition = displaying;

        setTimeout(function() {
          white.style.display = 'inline';
          white.style.transition = 'none';

          setTimeout(function() {
            white.style.transform = 'translateX(-100%)';

            setTimeout(function() {
              white.style.transition = leaving;

              setTimeout(function() {
                white.style.transform = 'translateX(0%)';
              }, 20);
            }, 15);
          }, 10);
        }, 5);

        setTimeout(function() {
          document.title = title;
          document.body = content;

          setTimeout(function() {
            load.prepare();
            window.scrollTo(0, 0);
            black.style.transform = 'translateX(300%)';

            setTimeout(function() {
              black.style.display = 'none';
            }, 2000);
          }, 10);
        }, 700);
      });
    }

    function fetch(url) {
      return new Promise(function(resolve) {
        if (cache[url]) {
          resolve(cache[url]);
        } else {
          const request = new XMLHttpRequest();

          request.open("GET", url, true);
          request.onreadystatechange = function() {
            if (request.readyState == 4) {
              cache[url] = request.responseText;
              resolve(cache[url]);
            }
          }

          request.send();
        }
      });
    }
  }
}
