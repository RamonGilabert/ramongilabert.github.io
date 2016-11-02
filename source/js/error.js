// JavaScript of the error page

window.addEventListener('load', function() {

  prepareDocument();
  setupAnalytics();
  encryptCorreu('email');

  var gifPath = '/images/errors/404.gif';
  var imagePath = '/images/errors/404-frame.jpg';
  var glitch = document.body.tag('img');
  var pastTime = new Date().getTime();
  var image = new Image();
  image.src = gifPath;

  image.addEventListener('load', function() {
    changePath(true);
  });

  function changePath(timing) {
    window.setTimeout(function() {
      glitch.src = gifPath;

      window.setTimeout(function() {
        glitch.src = imagePath;
        changePath(false);
      }, 9000);
    }, timing ? new Date().getTime() - pastTime > 2000 ? 0 : 2000 : 1000);
  }
});
