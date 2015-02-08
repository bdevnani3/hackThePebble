var http = require('http');
var fs = require('fs');

//require the Twilio module and create a REST client
var client = require('twilio')('ACaffbf3a1ea05b459f418f0f03b291660', '397bc3ee3482999b6c4d4f18eed1d57f');

http.createServer(function (req, res) {
    client.makeCall({
        to:'+14086018729', // Any number Twilio can call
        from: '+18703764730', // A number you bought from Twilio and can use for outbound communication
        url: 'https://raw.githubusercontent.com/parasj/vthacksapi/master/drunktest.xml' // A URL that produces an XML document (TwiML) which contains instructions for the call
    }, function(err, responseData) {
        console.log(responseData.from); // outputs "+14506667788"
    });

    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end("done");
}).listen(process.env.PORT || 5000);