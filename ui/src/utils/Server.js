// Not necessary for project but how I am hosting on Digital Ocean:
// This allows multipage routing if I create a node application with 'express' and 'path' and run with 'node Server.js'
// Run using pm2 with:  pm2 start react_server.js 
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(9000);



