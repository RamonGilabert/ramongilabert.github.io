// JavaScript of the main content of gilabert.design.

// MARK: - General values

const displaying = '0.5s transform cubic-bezier(0.5, 0.15, 0.15, 1)';

const grid = new Grid();
const resizer = new Resizer();
const prevent = new Prevent();

document.addEventListener('DOMContentLoaded', function() {
  prepareDocument();
  encryptCorreu('email');

  grid.listen();
  resizer.run();
  prevent.images();
});

window.addEventListener('load', function() {
  // loader.run();
  // transition.prepare();

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

    window.removeEventListener('resize', calculate);
    window.addEventListener('resize', calculate);

    function calculate() {
      for (var i = 0; i < boxes.length; i++) {
        const box = boxes[i];
        
        if (window.innerWidth > 1920) {
          box.style.marginLeft = '-' + ((window.innerWidth - 1920) / 2 + (19.2 * 12.4)) + 'px';
          box.style.maxWidth = ((window.innerWidth - 1920) / 2 + (19.2 * 93.8)) + 'px';
        } else {
          box.style.marginLeft = '-12.4vw';
          box.style.maxWidth = (93.8 * 19.2) + 'px';
        }
      }

      for (var i = 0; i < cards.length; i++) {
        const card = cards[i];
        card.style.height = window.innerWidth * 0.355 * 4 / 3 - 148 + 'px';
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
