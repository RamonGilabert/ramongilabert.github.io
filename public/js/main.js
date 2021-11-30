// JavaScript of the main content of gilabert.design.

// MARK: - General values

// import { anime } from './anime.js';

const displaying = '1.6s transform cubic-bezier(0.5, 0.15, 0.15, 1)';
const leaving = '0.7s transform cubic-bezier(0.5, 0.15, 0.15, 1)';

const load = new Load();
const transition = new Transition();
const loader = new Loader();
const grid = new Grid();
const colors = new Colors();

var loaded = [];

window.addEventListener('load', function() {
  prepareDocument();
  encryptCorreu('email');
  setupAnalytics();
  
  colors.prepareColors();
});

function Load() {

  this.prepare = function() {
    encryptCorreu('email');
  }
}

function Colors() {
  
  this.prepareColors = function() {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    if (prefersDarkScheme.matches) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }
}

function Loader() {

  this.images = [
  ]

  this.run = function() {
    const self = this;

    var i = 0;

    function loop() {
      setTimeout(function() {
        var image = new Image();
        image.src = self.images[i];

        image.addEventListener('load', function() { });
        image.addEventListener('error', function() { });

        loaded[i] = image;

        i = i + 1;

        if (i < self.images.length) { loop(); }
      }, 0);
    }

    setTimeout(function() {
      if (loaded.length != self.images.length) {
        loop();
      }
    }, 0);
  }
}

function Grid() {
  this.listen = function() {
    window.onkeyup = function(event) {
      const key = event.keyCode ? event.keyCode : event.which;
      const row = document.class('row');

      if (key == 71) {
        row.style.opacity = row.style.opacity == 0 ? 1 : 0;
      }g
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
