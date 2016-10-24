var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
});

app.get('/index', function(request, response) {
  response.sendFile(__dirname + '/index.html');
});

app.get('/manifesto', function(request, response) {
  response.sendFile(__dirname + '/manifesto.html');
});

app.get('/lights', function(request, response) {
  response.sendFile(__dirname + '/lights.html');
});

app.get('/branding', function(request, response) {
  response.sendFile(__dirname + '/branding.html');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
