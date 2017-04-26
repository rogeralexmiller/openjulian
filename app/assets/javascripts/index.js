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
    var lastTemp = 20;

    var heartRates = [];
    var nextRates = [];
    var lastRate = 30;

    var gsrs = [];
    var nextGsrs = [];
    var lastGsr = 10;

    for (var i = 0; i < 150; i++) {
      gsrs.push(10);
      temperatures.push(20);
      heartRates.push(30);
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
      ctx.clearRect(0, 0, 200, 150);

      var nextTemp;
      var nextRate;
      var nextGsr;

      if (nextTemperatures.length > 0) {
        nextTemp = nextTemperatures[0];
        nextTemperatures = nextTemperatures.slice(1, nextTemperatures.length);
      } else {
        nextTemp = temperatures[0];
      }

      temperatures.unshift(nextTemp);
      temperatures.pop();

      if (nextRates.length > 0) {
        nextRate = nextRates[0];
        nextRates = nextRates.slice(1, nextRates.length);
      } else {
        nextRate = heartRates[0];
      }

      heartRates.unshift(nextRate);
      heartRates.pop();

      if (nextGsrs.length > 0) {
        nextGsr = nextGsrs[0];
        nextGsrs = nextGsrs.slice(1, nextGsrs.length);
      } else {
        nextGsr = gsrs[0];
      }

      gsrs.unshift(nextGsr);
      gsrs.pop();

      for (var i = 0; i < 150; i++) {
        var tempValue = temperatures[i];
        var rateValue = heartRates[i];
        var gsrValue = gsrs[i];

        ctx.fillStyle = '#f46666';
        ctx.globalAlpha = 1.0 - (i/150.0);
        ctx.fillRect(i+10, 150 - tempValue - 5, 3, 3);

        ctx.fillStyle = 'blue';
        ctx.fillRect(i+10, 150 - rateValue - 5, 3, 3);

        ctx.fillStyle = 'green';
        ctx.fillRect(i+10, 150 - gsrValue - 5, 3, 3);

      }
    }, 200);
  }

  setInterval(function(){
    $.ajax({
      url: 'api/heart_rates',
      success: function(data){
        var nextRate =  parseFloat(data.data);

        if (nextRate != lastRate) {
          var heartContainer = $(".heart-rate-container");
          heartContainer.html(nextRate);

          var transRate = lastRate;

          while(transRate != nextRate) {
            if(transRate > nextRate) {
              transRate = transRate - 0.5;
            }
            if(transRate < nextRate) {
              transRate = transRate + 0.5;
            }
            nextRates.push(transRate);
          }
        }
        lastRate = nextRate;
      }
    });
  }, 1000);

  setInterval(function(){
    $.ajax({
      url: 'api/skin_responses',
      success: function(data){
        var nextGsr = parseFloat(data.data);

        if (nextGsr != lastGsr) {
          var skinContainer = $(".skin-response-container");
          skinContainer.html(nextGsr);

          var transGsr = lastGsr;

          while(transGsr != nextGsr) {
            if(transGsr > nextGsr) {
              transGsr = transGsr - 0.5;
            }
            if(transGsr < nextGsr) {
              transGsr = transGsr + 0.5;
            }
            nextGsrs.push(transGsr);
          }
        }
        lastGsr = nextGsr;
      }
    });
  }, 1000);
});
