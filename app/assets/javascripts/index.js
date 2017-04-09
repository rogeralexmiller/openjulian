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
    var temperatures = [0];

    setInterval(function(){
      $.ajax({
        url: 'api/temperatures',
        success: function(data){
          var lastTemp = temperatures[temperatures.length - 1];
          var nextTemp = parseInt(data["data"]);
          var transTemp = nextTemp;

          while(true){
            if(transTemp > lastTemp){
              transTemp = transTemp - 1;
              temperatures.push(transTemp);
            }
            if(transTemp < lastTemp){
              transTemp = transTemp + 1;
              temperatures.push(transTemp);
            }
            if(transTemp === lastTemp){
              break;
            }
          }
        }
      });


    }, 200);
  }
});
