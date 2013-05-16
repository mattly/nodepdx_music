module.exports = function(buffer){
  var chanType = buffer[0];
  if (chanType >= 144 && chanType <= 160) {
    return [chanType, buffer[1], buffer[2]];
  }
}
