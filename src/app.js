'use strict';

// Loading dependencies
var express = require('express');
var path = require('path');

// Initializing express application
var app = express();

// Loading Config
var config = require('./lib/config');

// Body Parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// Logger
var logger = require('morgan');
app.use(logger('dev'));

// Cookies / Session
var cookieParser = require('cookie-parser');
var session = require('./lib/helpers/session');

app.use(cookieParser());
app.use(session);

// Layout setup
var exphbs = require('express-handlebars');
var hbsHelpers = require('./lib/helpers/handlebars');

// Stylus setup
var stylus = require('stylus');

// Compile Stylus on the fly
if (!config().html.css.stylusPrecompile) {
  app.use(
    stylus.middleware({
      src: __dirname + '/stylus',
      dest: __dirname + '/public/css',
      compile: function(str, path) {
        return stylus(str)
                .set('filename', path)
                .set('compress', config().html.css.compress);
      }
    })
  );
}

// Handlebars setup
app.engine(config().views.engine, exphbs({
  extname: config().views.extension,
  defaultLayout: config().views.layout,
  layoutsDir: __dirname + '/views/layouts',
  partialsDir: __dirname + '/views/partials',
  helpers: hbsHelpers
}));

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', config().views.engine);
app.use(express.static(path.join(__dirname, 'public')));

// Sending config to templates
app.use(function(req, res, next) {
  res.locals.config = config();
  next();
});

// Disabling x-powered-by
app.disable('x-powered-by');

require('./router')(app);

// Export application or start the server
if (!!module.parent) {
  module.exports = app;
} else {
  app.listen(config().serverPort);
}
