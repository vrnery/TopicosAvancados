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

const pins = {
  'red': 2,
  'green': 3,
  'lamp': 4
}


// Message processing
app.post('/webhook', function (req, res) {
   console.log(req.body);
  var data = req.body.result;
  let pin = 1;
  let color = data.parameters.color;
  let action = data.action;
  console.log("Cor:");
  console.log(color);
  console.log("Action:");
  console.log(action);
  if (!color) {
    pin = pins['lamp'];
    // reverse logic of rele
    if (action == 'off') {
      action = 'on';
    } else {
      action = 'off';
    }
  } else {
    pin = pins[color];
  }

  const params = {
    url: 'http://192.168.0.155/${action}`,
    qs: {
      pin
    }
  }
  console.log(params);
  request.get(params, (err,httpResponse,body) => {
    console.log('err', err);
    console.log('response', httpResponse);
    //console.log('body', body);

    res.sendStatus(200);
  });


});

// Set Express to listen out for HTTP requests
var server = app.listen(process.env.PORT || 5000, function () {
  console.log("Listening on port %s", server.address().port);
});
