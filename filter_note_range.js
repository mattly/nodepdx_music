module.exports = function(min, max){
  var stream = new require('stream').Transform();

  stream._transform = function(chunk, enc, done){
    var note = chunk[1];
    if (note >= min && note <= max){ this.push(chunk); }
    done();
  }

  return stream;
}
