// JavaScript of the main content of gilabert.design.

// MARK: - General values

const displaying = '0.5s transform cubic-bezier(0.5, 0.15, 0.15, 1)';

const load = new Load();
const transition = new Transition();
const parallax = new Parallax();
const scroller = new Scroller();
const resizer = new Resizer();
const prevent = new Prevent();
const click = new Click();
const loader = new Loader();

document.addEventListener('DOMContentLoaded', function() {
  prepareDocument();

  const white = document.class('transition');
  setTimeout(function() {
    white.style.transition = displaying;

    setTimeout(function() {
      white.style.transform = 'translateY(-100%)';

      setTimeout(function() {
        white.style.display = 'none';
      }, 500);
    }, 800);
  }, 0);
});

window.addEventListener('load', function() {
  loader.run();
  transition.prepare();
  load.prepare();
});

function Loader() {

  this.images = [
    './images/projects/gluten/myself.png',
    './images/projects/lights/myself.png',
    './images/projects/revolution/myself.png',
    './images/projects/gluten/summarize.jpg',
    './images/projects/lights/summarize.jpg',
    './images/projects/revolution/summarize.jpg'
  ]

  this.loaded = [];

  this.run = function() {
    const self = this;

    var i = 0;

    setTimeout(function() { loop(); }, 0);

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
  }
}

function Load() {

  this.prepare = function() {
    parallax.prepare();
    scroller.run();
    resizer.run();
    prevent.images();
    click.indicator();

    encryptCorreu('email');
    setupAnalytics();
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
      const gluten = base + 'gluten';
      const lights = base + 'lights';
      const revolution = base + 'revolution';
      const index = base + 'index';
      const urls = [gluten, lights, revolution, index];

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

      if (element.classList.contains('navigation')) {
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
        var wrapper = document.createElement('html');
        wrapper.innerHTML = response;

        const old = document.body;
        const white = document.class('transition');
        const title = wrapper.querySelector('title').innerHTML;
        const content = wrapper.getElementsByTagName('body')[0];
        const black = wrapper.getElementsByClassName('transition')[0];

        black.style.transition = displaying;

        setTimeout(function() {
          white.style.display = 'inline';
          white.style.transition = 'none';

          setTimeout(function() {
            white.style.transform = 'translateY(100%)';

            setTimeout(function() {
              white.style.transition = displaying;

              setTimeout(function() {
                white.style.transform = 'translateY(0%)';
              }, 20);
            }, 15);
          }, 10);
        }, 5);

        setTimeout(function() {
          document.title = title;
          document.body = content;

          setTimeout(function() {
            window.scrollTo(0, 0);
            load.prepare();

            black.style.transform = 'translateY(-100%)';

            setTimeout(function() {
              black.style.display = 'none';
            }, 500);
          }, 5);
        }, 500);
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

function Parallax() {

  this.margin = 1.5;

  this.prepare = function() {
    if (exists('myself')) {
      this.myself();
    }
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

    window.removeEventListener('scroll', calculate);
    window.addEventListener('scroll', calculate);

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

      window.removeEventListener('scroll', scrolling);
      window.addEventListener('scroll', scrolling);

      function scrolling() {
        offset = contentOffset(content);
        position = window.pageYOffset;
        calculate();
      }

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
    } else if (document.tag('body').classList.contains('case')) {
      const threshold = 400;
      const home = document.class('home');

      var last = 0;

      window.removeEventListener('scroll', casing);
      window.addEventListener('scroll', casing);

      function casing() {
        const position = window.pageYOffset;
        const up = position < last;

        if (up || last == 0) {
          home.style.transform = 'rotateZ(90deg)';
        } else if (position > threshold) {
          home.style.transform = 'rotateZ(90deg) translateX(-100%)';
        }

        last = position;
      }
    }
  }
}

function Resizer() {

  this.run = function() {
    if (exists('myself')) {
      const projects = document.class('projects').getElementsByClassName('inner')[0];

      window.removeEventListener('resize', calculate);
      window.addEventListener('resize', calculate);

      function calculate() {
        if (window.innerWidth < 700) {
          projects.style.height = 'auto';
          return
        }

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

      indicator.removeEventListener('click', move);
      indicator.addEventListener('click', move);

      function move() {
        scrollTo(offset + 50, 750);
      }
    }
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
