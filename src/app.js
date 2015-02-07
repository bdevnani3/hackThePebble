/**
   * Welcome to Pebble.js!
   *
   * This is where you write your app.
   */

  var UI = require('ui');
  var Vector2 = require('vector2');
  var Accel = require('ui/accel');
  var ajax = require('ajax');




  var main = new UI.Card({
    title: 'ARE YOU DRUNK?',
    icon: 'images/menu_icon.png',
    subtitle: 'FIND OUT!',
    body: 'Press Select.'
  });

  main.show();

  main.on('click', 'select', function(e) {
    var wind = new UI.Window();
    var textfield = new UI.Text({
      position: new Vector2(0, 50),
      size: new Vector2(144, 30),
      font: 'gothic-24-bold',
      text: 'Test 1: Coordination',
      textAlign: 'center'
    });
    wind.add(textfield);
    wind.show();
    wind.on('click', 'select', function(e) {
      textfield.size(new Vector2(130,30));
      textfield.text("Testing you walk....");
      var sum, sum1, sum2, sum3, n;
      sum = 0;
      sum1 = 0;
      sum2 = 0;
      sum3 = 0;
      n = 0;

      var timestart = Date.now();
      var done = false;

      wind.on('accelData', function(e) {
        // var x = e.accel.x;
        // var y = e.accel.y;
        // var z = JSON.stringify(e.accel.z);

        var dt = Date.now() - timestart;
        if (!done && dt > 1*1000 && dt < (1+10)*1000) {
          sum1 += e.accel.x*e.accel.x;
          sum2 += e.accel.y*e.accel.y;
          sum3 += (e.accel.z + 1000)*(e.accel.z + 1000);
          n++;
          
          } else if (!done && dt > (1+10)*1000) {
          // done processing!
          done = true;
          textfield.text("Done. Average: " + Math.sqrt(sum1/n) + ' ' + Math.sqrt(sum2/n) + ' ' + Math.sqrt(sum3/n)); // '(' + x + ", " + y + ", " + ", " + z + ")"
        }
      });
    });
  });