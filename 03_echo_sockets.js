var midi = require('midi')
  , input = new midi.input()
  , output = new midi.output()
  , inStream = midi.createReadStream(input)
  , outStream = midi.createWriteStream(output)

  , readNote = require('./read_note')
  , echo = require('./echo_dynamic')
  , print = require('./print_midi')
  , values = require('./app')({port:8000})
  ;

beat = 400
values.echotime = beat / 2;
values.echogain = 0.5;

console.log("connecting to Input Port: ", input.getPortName(0));
input.openPort(0);
inStream.on('error', function(err){ console.log(err); });

console.log("creating virtual Output Port: NodeJS");
output.openVirtualPort("NodeJS");

inStream
  .pipe(echo(values))
  // .pipe(require('./four_on_the_floor')(beat, 60, 120))
  // .pipe(require('./boom_chick')(1, 60, 71, beat/2))
  .pipe(print(readNote))
  .pipe(outStream);
