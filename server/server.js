// create param middleware
// create a middleware function to catch and handle errors, register it
// as the last middleware on app

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var _ = require('lodash');
var morgan = require('morgan');

var lions = [];
var id = 0;

var updateId = function(req, res, next) {
  req.body.id = id.toString();
  id++;
  next();
};

app.use(morgan('dev'));
app.use(express.static('client'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.param('id', function(req, res, next, id) {
  const lion = _.find(lions, { id });
  if (lion) {
    req.lion = lion;
    next(new Error('test'))
  } else {
    res.send('Not a valid ID'); // in a real API send a status code for resource not available
  }
});

app.get('/lions', function(req, res){
  res.json(lions);
});

app.get('/lions/:id', function(req, res){
  res.json(req.lion || {});
});

app.post('/lions', updateId, function(req, res) {
  var lion = req.body;

  lions.push(lion);

  res.json(lion);
});


app.put('/lions/:id', function(req, res) {
  var update = req.body;
  if (update.id) {
    delete update.id
  }

  var lion = _.findIndex(lions, {id: req.params.id});
  if (!lions[lion]) {
    res.send();
  } else {
    var updatedLion = _.assign(lions[lion], update);
    res.json(updatedLion);
  }
});

app.use((err, req, res, next) => {
  if (err) {
    res.status(500).send(err);
  }
});

app.listen(3000);
console.log('on port 3000');
