$(document).ready(function () {
  var canvas = document.getElementById('temp-canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');

    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.fillRect(0,0, 200,150);
    ctx.beginPath();
    ctx.moveTo(0,150);
    ctx.save();
    var temperatures = [];
    var nextTemperatures = [];
    var lastTemp = 0;

    for (var i = 0; i < 150; i++) {
      temperatures.push(0);
    }

    setInterval(function(){
      $.ajax({
        url: 'openjulian.com/api/temperatures',
        success: function(data){
          var nextTemp = parseInt(data.data);
          $('#temp-readout').html(nextTemp);

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
      ctx.clearRect(0,0,200,150);

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
        ctx.strokeRect(i, 150 - tempValue, 3, 3);
      }
    }, 200);
  }
});
