// Appearance

// By Ramon Gilabert

function Appearance() {

  this.method = empty;

  this.run = function() {
    if (exists('myself')) {
      this.method = this.myself;
      this.method(true);
    } else if (exists('manifesto')) {
      this.method = this.manifesto;
      this.method(true);
    }
  }

  this.myself = function(enter, callback) {
    callback = callback || empty;

    var myself = document.id('sections');
    var details = document.id('details');
    var navigation = document.tag('nav');
    var header = document.tag('header');
    var titles = document.classes('title');
    var buttons = document.classes('more');

    var texts = myself.tags('p');
    var figures = myself.tags('figure');
    var index = abs(getTransform(myself)) / window.innerHeight;

    var opacity = enter ? 1 : 0;
    var even = parseInt(index) % 2 === 0;
    var left = enter ? 'auto' : even ? '-75px' : '75px';
    var detailsTiming = enter ? 700 : 0;

    var figure = figures[index];
    var title = titles[index];
    var paragraph = texts[index];
    var button = buttons[index];

    figures.splice(figures.indexOf(figure), 1);
    titles.splice(titles.indexOf(title), 1);
    texts.splice(texts.indexOf(paragraph), 1);
    buttons.splice(buttons.indexOf(button), 1);

    for (var i = 0; i < titles.length; i++) {
      var components = [titles[i], texts[i], buttons[i], figures[i]];

      for (var j = 0; j < components.length; j++) {
        var component = components[j];
        component.style.transition = '';
        component.style.opacity = opacity;

        if (!figures.includes(component)) {
          component.style.left = left;
        }
      }
    }

    iterate([title, paragraph, button], 0, function(node) {
      node.style.transition = 'left 0.6s ease, opacity 0.6s ease';
      node.style.left = left;
      node.style.opacity = opacity;
    }, !enter);

    setTimeout(function() {
      var curve = 'opacity 0.8s ease';
      var array = [header, navigation, details, figure];

      for (var position = 0; position < array.length; position++) {
        var element = array[position];
        element.style.transition = curve;
        element.style.opacity = opacity;
      }
    }, detailsTiming);

    setTimeout(function() {
      callback();
    }, 1300);
  }

  this.manifesto = function(enter, callback) {
    callback = callback || empty

    var image = document.id('hero-image').tag('img');
    var header = document.id('header');
    var glitches = document.id('header-glitches');

    var explanations = document.classes('explanation');
    var descriptionNodes = document.classes('description-line');

    var footer = document.tag('footer');

    var imageTiming = enter ? 0 : 400;
    var beautyTiming = enter ? 700 : 0;
    var descriptionTiming = enter ? 200 : 0;

    setTimeout(function() {
      toggle(image, 'loading-hero-image', enter);
    }, imageTiming);

    setTimeout(function() {
      toggle(header, 'loading-header', enter);
      toggle(glitches, 'loading-header', enter);
    }, beautyTiming);

    iterate(explanations.concat(footer), 0, function(component) {
      component.style.transition = enter ? '' : 'opacity 0.8s ease, transform 0.8s ease';
      component.style.opacity = enter ? 1 : 0;
      component.style.transform = enter ? 'translateY(0%)' : 'translateY(-20%)';
    });

    iterate(descriptionNodes, descriptionTiming, function(component) {
      toggle(component, 'loading-hero-line', enter);
    }, !enter);

    setTimeout(function() {
      callback();
    }, 750);
  }
}
