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

    for (var i = 0; i < 50; i++) {
      temperatures[i] = 0;
      heartRates[i] = 0;
      gsrs[i] = 0;
    }

    setInterval(function(){
      ctx.clearRect(0, 0, 400, 200);

      var copyTemps = temperatures.slice();
      var copyRates = heartRates.slice();
      var copyGsrs = gsrs.slice();

      ctx.beginPath();

      ctx.moveTo(0, 200 - copyTemps[0]);

      for (var m = 1; m < 50; m++) {
        var tempValue = copyTemps[m];

        ctx.strokeStyle = '#f79420';
        ctx.globalAlpha = 1.0 - (m/50.0);
        ctx.lineTo(m*8, 200 - tempValue);
        ctx.stroke();
      }

      ctx.closePath();
      ctx.beginPath();
      ctx.moveTo(0, 200 - copyRates[0]);

      for (var j = 1; j < 50; j++) {
        var rateValue = copyRates[j];

        ctx.strokeStyle = '#e55036';
        ctx.globalAlpha = 1.0 - (j/50.0);
        ctx.lineTo(j*8, 200 - rateValue);
        ctx.stroke();
      }

      ctx.closePath();
      ctx.beginPath();
      ctx.moveTo(0, 200 - copyGsrs[0]);

      for (var x = 1; x < 50; x++) {
        var gsrValue = copyGsrs[x];

        ctx.strokeStyle = '#9ce0a6';
        ctx.globalAlpha = 1.0 - (x/50.0);
        ctx.lineTo(x*8, 200 - gsrValue);
        ctx.stroke();

      }
      ctx.closePath();
    }, 200);
  }

  setInterval(function(){
    if (testing) {
      testTemp = parseInt(Math.random()*20) + 80;
      temperatures.unshift(testTemp);
      $("#temp-readout").html(testTemp);
      if (temperatures.length > 50) {
        temperatures.pop();
      }
    } else {
      $.ajax({
        url: 'api/temperatures',
        success: function(data){
          nextTemp = parseFloat(data.data);
          temperatures.unshift(nextTemp);
          $("#temp-readout").html(nextTemp);
          if (temperatures.length > 50) {
            temperatures.pop();
          }
        }
      });
    }
  }, 60);

  setInterval(function(){
    if (testing) {
      var testRate = parseInt(Math.random()*30) + 50;
      heartRates.unshift(testRate);
      $(".heart-rate-container").html(testRate);
      if (heartRates.length > 50) {
        heartRates.pop();
      }
    } else {
      $.ajax({
        url: 'api/heart_rates',
        success: function(data){
          var nextRate =  parseFloat(data.data);
          $(".heart-rate-container").html(nextRate);
          heartRates.unshift(nextRate);
          if (heartRates.length > 50) {
            heartRates.pop();
          }
        }
      });
    }
  }, 60);

  setInterval(function(){
    if (testing) {
      var testGsr = parseInt(Math.random()*20);
      gsrs.unshift(testGsr);
      $(".skin-response-container").html(testGsr);
      if (gsrs.length > 50) {
        gsrs.pop();
      }
    } else {
      $.ajax({
        url: 'api/skin_responses',
        success: function(data){
          var nextGsr = parseFloat(data.data);
          $(".skin-response-container").html(nextGsr);
          gsrs.unshift(nextGsr);
          if (gsrs.length > 50) {
            gsrs.pop();
          }
        }
      });
    }
  }, 60);
});
