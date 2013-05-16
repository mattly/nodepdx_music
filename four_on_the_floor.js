module.exports = function(period, note, velocity){

  var stream = new require('stream').PassThrough();

  setInterval(function(){
    stream.push(new Buffer([144, note, velocity]))
  }, period);

  return stream;
}
