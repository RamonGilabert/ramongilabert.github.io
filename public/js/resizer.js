// Resizer handler

// By Ramon Gilabert

function Resizer() {

  this.method = empty;
  this.reference = '';
  this.movable = '';
  this.minimumWidth = 900;

  this.prepare = function() {
    if (exists('myself')) {
      this.method = this.myself;
      this.sections = document.tags('sections');
      this.movable = document.tag('nav');
    } else if (exists('manifesto')) {
      this.method = this.manifesto;
      this.reference = document.id('hero-image');
      this.movable = document.id('hero-description');
    }

    this.method();
  }

  this.myself = function() {
    var ownWidth = this.movable.offsetWidth / 2;
    var margin = 44;

    this.movable.style.right = margin - ownWidth + 'px';
  }

  this.manifesto = function() {
    if (window.innerWidth < 800) {
      this.movable.style.left = '0';
      return;
    }

    var halfWindow = window.innerWidth / 2;
    var referenceWidth = this.reference.offsetWidth / 2;
    var margin = 30;

    this.movable.style.left = halfWindow + referenceWidth + margin + 'px';
  }
}
