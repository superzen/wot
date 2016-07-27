var onoff = require('onoff');

var Gpio = onoff.Gpio,
    led = new Gpio(4, 'out');

function cambiarLuz () {
    var nextValue = (led.readSync() + 1) % 2;
    led.write(nextValue, function () {
        console.log('Changed LED state to: ' + nextValue);
    })
}

process.stdin.on('data', function () {
   cambiarLuz();
});


process.on('SIGINT', function () {
    led.writeSync(0);
    led.unexport();
    console.log('Bye bye!');
    process.exit();
});
