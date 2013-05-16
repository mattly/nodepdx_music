module.exports = function(opts){
  var stream = new require('stream').Readable()
    , channel = opts.channel + 175
    , control = opts.control
    , going = true;
    ;
  stream._read = function(n) { going = true; }
  stream.on('error', function(err){ console.error(err); })
  if (! opts.rate) { opts.rate = 1000; }
  if (! opts.min) { opts.min = 0; }
  if (! opts.max) { opts.max = 127; }

  var putVal = function(){
    if (! going) { return }
    var cycle = Date.now() % opts.rate / opts.rate
      , phase = Math.sin(cycle * 2 * Math.PI) / 2 + 0.5
      , range = opts.max - opts.min
      , val = Math.floor(phase * range) + opts.min
      , msg = new Buffer([channel, control, val]);
      if (! stream.push(msg)) { going = false }
  }
  setInterval(putVal, 20);
  return stream;
};
