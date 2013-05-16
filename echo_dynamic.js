var readNote = require('./read_note');

module.exports = function(values){
  var stream = new require('stream').Transform()
    , playEcho = function(echo, count){
        if (! count) { count = 1; }
        count++;
        if (count < 10) {
          if (echo[2] > 0) {
            newVel = parseInt(values.echogain) / 100.0;
            echo[2] = Math.floor(echo[2] * newVel);
          }
          stream.push(new Buffer(echo));
          setTimeout(playEcho, parseInt(values.echotime), echo, count);
        }
      }
    ;

  stream._transform = function(chunk, enc, done){
    var note = readNote(chunk);
    this.push(chunk);
    setTimeout(playEcho, parseInt(values.echotime), note);
    done();
  }

  return stream;
}
