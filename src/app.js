/**
   * Welcome to Pebble.js!
   *
   * This is where you write your app.
   */

  var UI = require('ui');
  var Vector2 = require('vector2');
  var Vibe = require('ui/vibe');
 
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
      text: 'Test 1: Coordination: hit START',
      textAlign: 'center'
    });
    wind.add(textfield);
    wind.show();
    wind.on('click', 'select', function(e) {
      Vibe.vibrate('short');
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
        if (!done && dt > 2*1000 && dt < (2+5)*1000) {
          textfield.text("Testing your walk...." + Math.round(7 - (dt/1000)) );
          sum1 += Math.abs(e.accel.x);
          sum2 += Math.abs(e.accel.y);
          sum3 += Math.abs((e.accel.z + 1000));
          n++;
          } else if (!done && dt > (2+5)*1000) {
          // done processing!
          done = true;
          var average, result;
          average = (Math.round((sum1/n)) + Math.round((sum2/n)) + Math.round((sum3/n)))/3;
          if (average > 250)
            result = 'Whoa dude how much have you had';
          else if (average > 175)
            result = 'You cant drive yo, call a cab';
          else result = 'Youre good to go';
          Vibe.vibrate('double');
          textfield.text(result); // '(' + x + ", " + y + ", " + ", " + z + ")"
        }
      });
    });
  });