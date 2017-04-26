$(document).ready(function () {
  var canvas = document.getElementById('temp-canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');

    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.fillRect(0,0, 200,150);
    ctx.beginPath();
    ctx.moveTo(5,150);
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
          var nextTemp = parseFloat(data.data);

          if (nextTemp != lastTemp) {
            $('#temp-readout').html(nextTemp);
            var transTemp = lastTemp;

            while(transTemp != nextTemp) {
              if(transTemp > nextTemp) {
                transTemp = transTemp - 0.5;
              }
              if(transTemp < nextTemp) {
                transTemp = transTemp + 0.5;
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
      ctx.clearRect(0, 0, 200, 150);

      var nextTemp;

      if (nextTemperatures.length > 0) {
        nextTemp = nextTemperatures[0];
        nextTemperatures = nextTemperatures.slice(1, nextTemperatures.length);
      } else {
        nextTemp = temperatures[0];
      }

      temperatures.unshift(nextTemp);
      temperatures.pop();

      for (var i = 0; i < temperatures.length; i++) {
        var tempValue = temperatures[i];
        ctx.fillStyle = '#f46666';
        ctx.globalAlpha = 1.0 - (i/150.0);
        ctx.fillRect(i+10, 150 - tempValue - 5, 3, 3);
      }
    }, 200);
  }

  setInterval(function(){
    $.ajax({
      url: 'api/heart_rates',
      success: function(data){
        var heartRate =  data.data;
        var heartContainer = $(".heart-rate-container");
        heartContainer.html(heartRate);
      }
    });
  }, 1000);

  setInterval(function(){
    $.ajax({
      url: 'api/skin_responses',
      success: function(data){
        var skinResponse =  data.data;
        var skinContainer = $(".skin-response-container");
        skinContainer.html(skinResponse);
      }
    });
  }, 1000);
});
