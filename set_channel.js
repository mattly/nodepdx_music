module.exports = function(chan){
  var stream = new require('stream').Transform();

  stream._transform = function(chunk, enc, done){
    chunk[0] = chan + 143;
    this.push(chunk);
    done();
  }

  return stream;

}
