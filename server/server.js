var express = require('express');
var app = express();

// setup the app middlware
require('./middleware/appMiddleware')(app);

// setup the api
app.use('/api/', require('./api/api'));
// set up global error handling

// export the app for testing
module.exports = app;
