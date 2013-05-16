module.exports = function(displayFn){
  var stream = new require('stream').Transform();

  stream._transform = function(chunk, enc, done){
    if (displayFn) { console.log("received: ", displayFn(chunk)); }
    else { console.log("received: ", chunk[0], chunk[1], chunk[2]); }
    this.push(chunk);
    done();
  }

  return stream;
}
