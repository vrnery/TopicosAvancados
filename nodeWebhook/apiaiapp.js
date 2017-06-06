'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const path = require('path');

// The rest of the code implements the routes for our Express server.
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


// Message processing
app.post('/webhook', function (req, res) {
  console.log(req.body);
  var data = req.body.result;

  let color = data.parameters.color;
  let action = 1;
  let pin = 10;

  if (data.action == 'lights_off') {
    action = 0;
  }

  if (color == 'green') {
    pin = 12;
  } else if (color == 'red') {
    pin = 11;
  }

  const params = {
    url: 'http://192.168.0.155',
    qs: {
      action: action,
      pin: pin
    }
  }
  request.get(params, (err,httpResponse,body) => {
    console.log('err', err);
    console.log('response', httpResponse);
    console.log('body', body);

    res.sendStatus(200);
  });


});

// Set Express to listen out for HTTP requests
var server = app.listen(process.env.PORT || 5000, function () {
  console.log("Listening on port %s", server.address().port);
});
