$(document).ready(function () {
  var testing = false;

  var canvas = document.getElementById('temp-canvas');

  var testButton = $('#test-btn');

  testButton.click(function(e){
    e.preventDefault();
    testing = !testing;
  });

  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 300, 200);

    ctx.beginPath();

    ctx.lineWidth = 5;

    var temperatures = [];
    var heartRates = [];
    var gsrs = [];

    var nextTemp = 0;

    for (var i = 0; i < 50; i++) {
      temperatures[i] = 0;
      heartRates[i] = 0;
      gsrs[i] = 0;
    }

    var draw = function(){
      ctx.clearRect(0, 0, 400, 200);

      ctx.beginPath();

      ctx.moveTo(0, 200 - temperatures[0]);

      for (var m = 1; m < 50; m++) {
        var tempValue = temperatures[m];

        ctx.strokeStyle = '#f79420';
        ctx.globalAlpha = 1.0 - (m/50.0);
        ctx.lineTo(m*8, 200 - tempValue);
        ctx.stroke();
      }

      ctx.closePath();
      ctx.beginPath();
      ctx.moveTo(0, 200 - heartRates[0]);

      for (var j = 1; j < 50; j++) {
        var rateValue = heartRates[j];

        ctx.strokeStyle = '#e55036';
        ctx.globalAlpha = 1.0 - (j/50.0);
        ctx.lineTo(j*8, 200 - rateValue);
        ctx.stroke();
      }

      ctx.closePath();
      ctx.beginPath();
      ctx.moveTo(0, 200 - gsrs[0]);

      for (var x = 1; x < 50; x++) {
        var gsrValue = gsrs[x];

        ctx.strokeStyle = '#9ce0a6';
        ctx.globalAlpha = 1.0 - (x/50.0);
        ctx.lineTo(x*8, 200 - gsrValue);
        ctx.stroke();

      }
      ctx.closePath();
      window.requestAnimationFrame(draw);
    };

  var getData = function(){
    if (testing) {
      var testTemp = parseInt(Math.random()*20) + 80;
      temperatures.unshift(testTemp);
      $("#temp-readout").html(testTemp);
      temperatures.pop();

      var testRate = parseInt(Math.random()*30) + 50;
      heartRates.unshift(testRate);
      $(".heart-rate-container").html(testRate);
      heartRates.pop();

      var testGsr = parseInt(Math.random()*20);
      gsrs.unshift(testGsr);
      $(".skin-response-container").html(testGsr);
      gsrs.pop();
      window.requestAnimationFrame(getData);
    } else {
      $.ajax({
        url: 'api/biometrics',
        success: function(data){
          nextTemp = parseFloat(data.data.temp);
          temperatures.unshift(nextTemp);
          $("#temp-readout").html(nextTemp);
          temperatures.pop();

          var nextRate =  parseFloat(data.data.heart_rate);
          $(".heart-rate-container").html(nextRate);
          heartRates.unshift(nextRate);
          heartRates.pop();

          var nextGsr = parseFloat(data.data.gsr);
          $(".skin-response-container").html(nextGsr);
          gsrs.unshift(nextGsr);
          gsrs.pop();
          window.requestAnimationFrame(getData);
        }
      });
    }
  };

  window.requestAnimationFrame(draw);
  window.requestAnimationFrame(getData);
  }
});
