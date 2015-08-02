'use strict';

// Loading dependencies
var express = require('express');
var path = require('path');

// Initializing express application
var app = express();

// Body Parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Logger
var logger = require('morgan');
app.use(logger('dev'));

// Cookies / Session
var cookieParser = require('cookie-parser');
app.use(cookieParser());

// Layout setup
var exphbs = require('express-handlebars');

// Stylus setup
var stylus = require('stylus');
var nib = require('nib');

// Handlebars setup
app.engine('.hbs', exphbs({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
}));

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');
app.use(express.static(path.join(__dirname, 'public')));

// Routes
var home = require('./routes/home');
var users = require('./routes/users');

app.use('/', home);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// Export application or start the server
if (!!module.parent) {
  module.exports = app;
} else {
  app.listen(3000);
}
