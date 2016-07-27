var onoff = require('onoff');

var Gpio = onoff.Gpio,
    led = new Gpio(4, 'out'),
    interval;

interval = setInterval(function () {
    var nextValue = (led.readSync() + 1) % 2;
    led.write(nextValue, function () {
        console.log('Changed LED state to: ' + nextValue);
    })
}, 2000);

process.on('SIGINT', function () {
    clearInterval(interval);
    led.writeSync(0);
    led.unexport();
    console.log('Bye bye!');
    process.exit();
});
