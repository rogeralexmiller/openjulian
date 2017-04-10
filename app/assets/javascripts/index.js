// 1. Start at bottom left corner of canvas.
// 2. Enter interval.
// 3. Get latest temperature. push into array of temperatures with initial
//    coordinate of its temp as y value and 150 as x.
// Keep adding temperatures to array.
// Loop through the array on each loop and draw each temperature as a
// circle. Use the index of the temperature to determine it's x position
// To create the illusion of a transition between temperature points,
// create transition temperatures in 1 degree intervals between lastTemperature
// and next temperature

// one array stores the past temperatures. one array stores the next temperatures
// Every other second, send ajax to get the latest data. If it needs a transition,
// use a loop to feed the transition points into the nextTemps array.

// Each animation frame, if there are new temperatures in the nextTemps array,
// pop one off and push it into the pastTemps array and remove the oldest temp.
// Now draw the temps in the pastTemps array.
$(document).ready(function () {
  var canvas = document.getElementById('temp-canvas');
  if (canvas.getContext) {
    console.log("got context!");
    var ctx = canvas.getContext('2d');

    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.fillRect(0,0, 200,200);
    ctx.beginPath();
    ctx.moveTo(0,200);
    ctx.save();
    var temperatures = [];
    var nextTemperatures = [];
    var lastTemp = 0;

    for (var i = 0; i < 150; i++) {
      temperatures.push(0);
    }

    setInterval(function(){
      $.ajax({
        url: 'api/temperatures',
        success: function(data){
          var nextTemp = parseInt(data.data);

          if (nextTemp != lastTemp) {
            var transTemp = lastTemp;

            while(transTemp != nextTemp) {
              if(transTemp > nextTemp) {
                transTemp = transTemp - 1;
              }
              if(transTemp < nextTemp) {
                transTemp = transTemp + 1;
              }
              nextTemperatures.push(transTemp);
            }
          }
          lastTemp = nextTemp;
        }
      });
    }, 1000);

    setInterval(function(){
      ctx.fillStyle = 'white';
      ctx.clearRect(0,0,200,200);

      var nextTemp;

      if (nextTemperatures.length > 0) {
        nextTemp = nextTemperatures[0];
        nextTemperatures = nextTemperatures.slice(1, nextTemperatures.length);
      } else {
        nextTemp = temperatures[temperatures.length -1];
      }

      temperatures.push(nextTemp);
      temperatures = temperatures.slice(1, temperatures.length);

      for (var i = 0; i < temperatures.length; i++) {
        var tempValue = temperatures[i];
        ctx.fillStyle = 'black';
        ctx.strokeRect(i, 200 - tempValue, 3, 3);
      }
    }, 100);
  }
});
