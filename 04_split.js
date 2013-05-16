var midi = require('midi')
  , input = new midi.input()
  , output = new midi.output()
  , inStream = midi.createReadStream(input)
  , outStream = midi.createWriteStream(output)

  , readNote = require('./read_note')
  , echo = require('./echo_dynamic')
  , print = require('./print_midi')
  , selectNote = require('./filter_note_range')
  , values = require('./app')({port:8000})
  , tr = require('./transform')
  ;

beat = 400
values.echotime = beat / 2;
values.echogain = "50";

console.log("connecting to Input Port: ", input.getPortName(0));
input.openPort(0);
inStream.on('error', function(err){ console.log(err); });

console.log("creating virtual Output Port: NodeJS");
output.openVirtualPort("NodeJS");

inStream
  .pipe(selectNote(60, 74))
  .pipe(echo(values))
  .pipe(outStream);

inStream
  .pipe(selectNote(0, 59))
  .pipe(require('./set_channel')(2))
  .pipe(echo({echotime: beat * 2, echogain: 0.7}))
  .pipe(outStream);

