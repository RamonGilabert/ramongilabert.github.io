var compress = require('compression');
var express = require('express');
var app = express();

app.use(compress());
app.set('port', (process.env.PORT || 5000));

__directory = __dirname + '/public';
app.use(express.static(__directory));

app.get('/', function(request, response) {
  response.sendFile(__directory + '/index.html');
});

app.get('/index', function(request, response) {
  response.sendFile(__directory + '/index.html');
});

app.get('/manifesto', function(request, response) {
  response.sendFile(__directory + '/manifesto.html');
});

app.get('/lights', function(request, response) {
  response.sendFile(__directory + '/lights.html');
});

app.get('/branding', function(request, response) {
  response.sendFile(__directory + '/branding.html');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
