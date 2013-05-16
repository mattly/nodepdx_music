module.exports = function(fn){
  var stream = new require('stream').Transform();

  stream._transform = function(chunk, enc, done){
    this.push(fn(chunk));
    done();
  }

  return stream;
}

