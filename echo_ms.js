var readNote = require('./read_note');

module.exports = function(echoTime, gain){
  var stream = new require('stream').Transform()
    , playEcho = function(echo, count){
        if (! count) { count = 1; }
        count++;
        if (count < 10) {
          if (echo[2] > 0) { echo[2] = Math.floor(echo[2] * gain); }
          stream.push(new Buffer(echo));
          setTimeout(playEcho, echoTime, echo, count);
        }
      }
    ;

  stream._transform = function(chunk, enc, done){
    var note = readNote(chunk);
    this.push(chunk);
    setTimeout(playEcho, echoTime, note);
    done();
  }

  return stream;
}
