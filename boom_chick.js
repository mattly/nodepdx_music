var readNote = require('./read_note')

module.exports = function(chan, boom, chick, delay){
  var stream = new require('stream').Transform();

  stream._transform = function(chunk, enc, done){
    var note = readNote(chunk);
    this.push(chunk);
    if (note[0]-143 == chan && note[1] == boom) {
      setTimeout(function(){
        var channel = note[0]
          , velocity = note[2]
        stream.push(new Buffer([channel, chick, velocity]));
      }, delay);
    }
    done();
  }

  return stream;
}
