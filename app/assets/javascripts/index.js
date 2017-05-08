$(document).ready(function () {
  var testing = true;

  var canvas = document.getElementById('temp-canvas');

  // var testButton = $('#test-btn');

  // testButton.click(function(e){
  //   e.preventDefault();
  //   testData = !testData;
  // });

  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');

    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.fillRect(0,0, 300,200);
    ctx.beginPath();
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

    for (var i = 0; i < 300; i++) {
      gsrs.push(10);
      temperatures.push(20);
      heartRates.push(30);
    }

    setInterval(function(){
      ctx.clearRect(0, 0, 300, 200);

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

      for (var i = 0; i < 300; i++) {
        var tempValue = temperatures[i];
        var rateValue = heartRates[i];
        var gsrValue = gsrs[i];

        ctx.fillStyle = '#f79420';
        ctx.globalAlpha = 1.0 - (i/300.0);
        ctx.fillRect(i+10, 200 - tempValue - 5, 2, 2);

        ctx.fillStyle = '#e55036';
        ctx.fillRect(i+10, 200 - rateValue - 5, 2, 2);

        ctx.fillStyle = '#9ce0a6';
        ctx.fillRect(i+10, 200 - gsrValue - 5, 2, 2);

      }
    }, 50);
  }

  setInterval(function(){
    if (testing) {
      testtTemp = parseInt(Math.random()*100);
      temperatures.push(testTemp);
    } else {
      $.ajax({
        url: 'api/temperatures',
        success: function(data){
          nextTemp = parseFloat(data.data);

          processTransition(nextTemp, lastTemp, nextTemperatures, "#temp-readout");
          lastTemp = nextTemp;
        }
      });
    }
  }, 1000);

  setInterval(function(){
    $.ajax({
      url: 'api/heart_rates',
      success: function(data){
        var nextRate =  parseFloat(data.data);

        processTransition(nextRate, lastRate, nextRates, ".heart-rate-container");
        lastRate = nextRate;
      }
    });
  }, 1000);

  setInterval(function(){
    $.ajax({
      url: 'api/skin_responses',
      success: function(data){
        var nextGsr = parseFloat(data.data);

        processTransition(nextGsr, lastGsr, nextGsrs, ".skin-response-container");
        lastGsr = nextGsr;
      }
    });
  }, 1000);

  function processTransition(nextValue, lastValue, nextValueArray, readoutElement) {
    if (nextValue != lastValue) {
      $(readoutElement).html(nextValue).width(20);
      var transValue = lastValue;

      while (transValue != nextValue) {
        if(transValue > nextValue) {
          transValue = transValue - 0.5;
        }
        if(transValue < nextValue) {
          transValue = transValue + 0.5;
        }
        nextValueArray.push(transValue);
      }
    }
  }
});
