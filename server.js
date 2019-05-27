const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const proxy = require('http-proxy-middleware')

const port = process.env.PORT || 8080;
const app = express();
app.use(favicon(__dirname + '/build/favicon.ico'));
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
 return res.send('pong');
});

let apiUrl = 'http://localhost:8000';

switch (process.env.NODE_ENV) {
  case 'dev':
  case 'production':
    apiUrl = 'http://soundchat-server'
    break;
  default:
    break;
}

app.use('/api', proxy({
  target: apiUrl,
}))

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, (req, res) => {
  console.log(`server listening on port: ${port}`)
});
