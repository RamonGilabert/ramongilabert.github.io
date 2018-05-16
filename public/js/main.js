// JavaScript of the main content of gilabert.design.

// MARK: - General values

const grid = new Grid();
const resizer = new Resizer();
const prevent = new Prevent();
const hover = new Hover();
const parallax = new Parallax();
const scroller = new Scroller();

document.addEventListener('DOMContentLoaded', function() {
  prepareDocument();
  encryptCorreu('email');

  grid.listen();
  resizer.run();
  prevent.images();
  parallax.prepare();
  scroller.run();
  // hover.watch();
});

window.addEventListener('load', function() {
  setupAnalytics();
});

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
    const cards = document.classes('imagery');
    const container = document.class('cards');
    const navigation = document.class('navigation-wrapper');
    const social = document.class('social');
    const texts = [];

    window.removeEventListener('resize', calculate);
    window.addEventListener('resize', calculate);

    function calculate() {
      for (var i = 0; i < boxes.length; i++) {
        const box = boxes[i];
        
        if (window.innerWidth > 1920) {
          box.style.marginLeft = '-' + ((window.innerWidth - 1920) / 2 + (19.2 * 12.4)) + 'px';
          box.style.width = ((window.innerWidth - 1920) / 2 + (19.2 * 93.8)) + 'px';
        } else if (window.innerWidth < 1300) {
          box.style.marginLeft = '-6.2vw';
          box.style.width = '100vw';
        } else if (window.innerWidth < 1920) {
          box.style.marginLeft = '-12.4vw';
          box.style.width = 93.9 + 'vw';
        }
      }

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
      } else if (variable < 850 && variable > 650) {
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

      container.style.height = containerHeight + 'px';
      social.style.marginLeft = variable * 0.846 + 'px';
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
    if (exists('myself')) {
      const work = document.class('work-link');
      const about = document.class('about-link');
      const social = document.class('social-link');

      work.removeEventListener('click', move);
      work.addEventListener('click', move);
      about.removeEventListener('click', scroll);
      about.addEventListener('click', scroll);
      social.removeEventListener('click', scroll);
      social.addEventListener('click', scroll);

      function move() {
        const projects = contentOffset(document.class('projects'));
        scrollTo(projects - 150, 750);
      }

      function scroll() {
        const personal = contentOffset(document.class('personal'));
        scrollTo(personal - 150, 1500);
      }
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
