const fs = require('fs'),
 https = require('https'),
 app = require('express')(),
 options = {
   key  : fs.readFileSync('./devKeys/server.key'),
   cert : fs.readFileSync('./devKeys/server.crt')
};

app.get('/', function (req, res) {
   res.send('Hello World!');
});

https.createServer(options, app).listen(3000, function () {
   console.log('Started!');
});