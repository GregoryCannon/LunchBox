var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var path = require('path')
var apiRoutes = require('./api_routes/index');
var clientRoutes = require('./client_routes/index');

var webpackConfig = require('../webpack.config.js');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/pollDb', { useMongoClient: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log("database connected");
});

app.use(webpackDevMiddleware(webpack(webpackConfig)));

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../dist')))
app.use(express.static(path.join(__dirname, '../client/assets')))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "../client"))

app.use('/api', apiRoutes);
app.use('/', clientRoutes);

// Handle 404 (last non-error handling .use block)
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

port = process.env.PORT || 3000;
app.listen(port);
console.log('app running on port ' + port);

/*** Error handling ***/

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
