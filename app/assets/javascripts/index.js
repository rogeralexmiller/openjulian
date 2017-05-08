$(document).ready(function () {
  var testing = false;

  var canvas = document.getElementById('temp-canvas');

  // var testButton = $('#test-btn');

  // testButton.click(function(e){
  //   e.preventDefault();
  //   testData = !testData;
  // });

  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 300, 200);

    ctx.beginPath();

    var temperatures = [];

    for (var i = 0; i < 50; i++) {
      temperatures[i]= i*2;
    }

    // var heartRates = [];
    // var nextRates = [];
    // var lastRate = 30;
    //
    // var gsrs = [];
    // var nextGsrs = [];
    // var lastGsr = 10;

    setInterval(function(){
      var copyTemps = temperatures.slice();

      ctx.clearRect(0, 0, 300, 200);

      ctx.beginPath();
      ctx.moveTo(0, 200 - copyTemps[0]);

      for (var i = 1; i < 50; i++) {
        var tempValue = copyTemps[i];
        // var rateValue = heartRates[i];
        // var gsrValue = gsrs[i];

        ctx.strokeStyle = '#f79420';
        ctx.globalAlpha = 1.0 - (i/50.0);
        ctx.lineTo(i*6, 200 - tempValue);
        ctx.stroke();

        // ctx.fillStyle = '#e55036';
        // ctx.fillRect(i+10, 200 - rateValue - 5, 2, 2);
        //
        // ctx.fillStyle = '#9ce0a6';
        // ctx.fillRect(i+10, 200 - gsrValue - 5, 2, 2);

      }
      ctx.closePath();
    }, 100);
  }

  setInterval(function(){
    if (testing) {
      testTemp = parseInt(Math.random()*20) + 80;
      temperatures.unshift(testTemp);
      if (temperatures.length > 100) {
        temperatures.pop();
      }
      $("#temp-readout").html(testTemp);
    } else {
      $.ajax({
        url: 'api/temperatures',
        success: function(data){
          nextTemp = parseFloat(data.data);

          temperatures.unshift(nextTemp);

          if (temperatures.length > 100) {
            temperatures.pop();
          }

          $("#temp-readout").html(nextTemp);
        }
      });
    }
  }, 500);

  // setInterval(function(){
  //   $.ajax({
  //     url: 'api/heart_rates',
  //     success: function(data){
  //       var nextRate =  parseFloat(data.data);
  //
  //       processTransition(nextRate, lastRate, nextRates, ".heart-rate-container");
  //       lastRate = nextRate;
  //     }
  //   });
  // }, 1000);
  //
  // setInterval(function(){
  //   $.ajax({
  //     url: 'api/skin_responses',
  //     success: function(data){
  //       var nextGsr = parseFloat(data.data);
  //
  //       processTransition(nextGsr, lastGsr, nextGsrs, ".skin-response-container");
  //       lastGsr = nextGsr;
  //     }
  //   });
  // }, 1000);
});
