// JavaScript gilabert.design

document.addEventListener('DOMContentLoaded', function() {

  function loadJSON(response) {

    var object = new XMLHttpRequest
    object.overrideMimeType("application/json");
    object.open('GET', './data/manifesto/manifesto.json', true);
    object.onreadystatechange = function () {
      if (object.readyState == 4) {
        response(object.responseText);
      }
    };

    object.send(null);
  }

  function mustache() {
    loadJSON(function(response) {
      var template = document.getElementById('first-template').innerHTML;
      var section = document.getElementById('manifesto-explanation');
      var data = [];

      try {
        data = JSON.parse(response);
      } catch(error) {
        console.log(error)
      }

      section.innerHTML = Mustache.render(template, data);
    });
  }

  mustache()
});
