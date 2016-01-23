var gpio = require('rpi-gpio');
var https = require('https');

https.get('https://api.forecast.io/forecast/APIKEY/38.8992651,-77.1546516', function(resp){
    var body = '';

    resp.on('data', function(data) {
        body += data;
    });


    resp.on('end', function(){
        var response = JSON.parse(body);
        var isGoingToRain = response.daily.data[0].precipProbability > 0.5 ? true : false;
        gpio.setup(7, gpio.DIR_OUT, handleDisplay);

	function handleDisplay() {
           gpio.write(7, isGoingToRain, function(err) {
               if (err) throw err;
           });
        }
    });

})

