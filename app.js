var http = require('http')
  , socketio = require('socket.io')
  , fs = require('fs')
  , url = require('url')
  , path = require('path')
  , events = require('events')
;

app = http.createServer(function(req, res){
  var filename = req.url.replace(/^\//, '');
  if (filename == '') { filename = 'index.html' }
  pathName = path.join('public', filename)
  var f = fs.createReadStream(pathName);
  f.on('open', function(){ res.writeHead(200); });
  f.on('error', function(e){ 
    res.writeHead(404);
    res.end(e.message);
  });
  f.pipe(res)
})

var values = {}
  , io = socketio.listen(app);

io.sockets.on('connection', function(socket){
  socket.on('value', function(data){
    Object.keys(data).forEach(function(key){
      values[key] = data[key];
    });
  });
});

module.exports = function(options){
  app.listen(options.port);
  return values;
}
