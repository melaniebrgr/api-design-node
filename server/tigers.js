// Define a new router
var tigerRouter = require('express').Router();

var lions = 'oh my';

// Define route level middleware
// A middleware is any function that takes req, res and next
var logger = function(req, res, next) {
  console.log('tiger');
  next();
}

tigerRouter.get('/', logger, function(req, res){
  res.json(lions);
});

// Export router
module.exports = tigerRouter;