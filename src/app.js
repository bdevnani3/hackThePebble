/**
   * Welcome to Pebble.js!
   *
   * This is where you write your app.
   */

var UI = require('ui');
var Vector2 = require('vector2');
//var Accel = require('ui/accel');
var ajax = require('ajax');
var URL = 'http://api.reimaginebanking.com:80/customers/54b604dfa520e02948a0f4be?key=CUST41adb6b534bf524359137f94b2803b55';
var twiURL = "http://drunktestcaller.herokuapp.com/drunk";
var firstName = 'bob';
var Vibe = require('ui/vibe');

var SM = require('strap-metrics');
var strapMetricsParms = {
    app_id: "GYau3AEmmfBcWxdhh",
    resolution: "144x168",
    useragent: "PEBBLE/2.0"
};

SM.Init(strapMetricsParms);

var main = new UI.Card({
  title: 'ARE YOU DRUNK?',
  image: 'images/menu_icon.png',
  subtitle: 'FIND OUT!',
  body: 'Press Select, '
});

ajax(
  {
    url: URL,
    type: 'json'
  }, function(data) {
    console.log(JSON.stringify(data));
    console.log(data["first name"]);
    //console.log(data[0].first_name);
    firstName = JSON.stringify(data["first name"]);
    main.body('Press Select, ' + firstName);
  }, function(error) {
    console.log(error);
  }
);

  main.show();
  SM.Log('/main/show');

  main.on('click', 'select', function(e) {
    var wind = new UI.Window();
    var textfield = new UI.Text({
      position: new Vector2(0, 50),
      size: new Vector2(144, 30),
      font: 'gothic-24-bold',
      text: 'Hit START',
      textAlign: 'center'
    });
    wind.add(textfield);
    wind.scrollable = true;
    wind.show();
    SM.Log('/wind/show');
    wind.on('click', 'select', function(e) {
      Vibe.vibrate('short');
      textfield.size(new Vector2(130,30));
      textfield.text("Walk in a line...");
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
          textfield.text("Walk in a line..." + Math.round(7 - (dt/1000)) );
          sum1 += Math.abs(e.accel.x);
          sum2 += Math.abs(e.accel.y);
          sum3 += Math.abs((e.accel.z + 1000));
          n++;
          } else if (!done && dt > (2+5)*1000) {
          // done processing!
          done = true;
          var average, result;
          average = (Math.round((sum1/n)) + Math.round((sum2/n)) + Math.round((sum3/n)))/3;
          if (average > 300) {
            result = 'You are Drunk. Emergency Call Activated.';
            ajax(
              {
                url: twiURL,
                type: 'json'
              }, function(data) {
                
              }
              
            );
          }
          else if (average > 250) {
            result = 'You are buzzed. Emergency Call Activated.';
            ajax(
              {
                url: twiURL,
                type: 'json'
              }, function(data) {
                
              }
              
            );
          }
          
          else result = 'Youre good to go';
          Vibe.vibrate('double');
          textfield.size(new Vector2(100,30));
          textfield.text(result); // '(' + x + ", " + y + ", " + ", " + z + ")"
        }
      });
    });
  });