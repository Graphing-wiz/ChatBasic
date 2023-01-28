const http = require('http')
const fs = require('fs')
const qs = require('querystring');
const post = require('./postserver.js');
const messages = require('./messages.json');
const os = require('os');
var array = []
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'content-type': 'text/html' })
  fs.createReadStream('front.html').pipe(res)
      if (req.method == 'POST') {
        var body = '';

        req.on('data', function (data) {
            body += data;

            // Too much POST data, kill the connection!
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6)
                req.connection.destroy();
        });

        req.on('end', function () {
            array = body.split(',')
            array[2] = JSON.parse(array[2].toLowerCase());
            console.log(array[3])
            //use post['blah'], etc.
            console.log('http://'+os.hostname()+':3000/')
            if(array[3] != 'http://'+os.hostname()+':3000/'){
              res.writeHead(200, { 'content-type': 'text/html' })
              res.end("ERROR, AUTH TOKEN FALSE")
            }else if(array[2] == true){
              res.writeHead(200, { 'content-type': 'text/html' });
              post.newMessage(array[1], array[0])
              console.log(messages)
              res.end('SENT, Message: '+array[1])
            }else if(array[2] == false){
              console.log(messages)
              res.writeHead(200, { 'content-type': 'application/json' });
              res.end(JSON.stringify(messages))
            }

        });
    }
})

server.listen(process.env.PORT || 3000)