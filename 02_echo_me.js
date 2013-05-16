var midi = require('midi')
  , input = new midi.input()
  , output = new midi.output()
  , inStream = midi.createReadStream(input)
  , outStream = midi.createWriteStream(output)

  , readNote = require('./read_note')
  , echo = require('./echo_ms')
  , print = require('./print_midi')
  ;

console.log("connecting to Input Port: ", input.getPortName(0));
input.openPort(0);
inStream.on('error', function(err){ console.log(err); });

console.log("creating virtual Output Port: NodeJS");
output.openVirtualPort("NodeJS");

inStream
  .pipe(echo(125, 0.8))
  .pipe(print(readNote))
  .pipe(outStream);
