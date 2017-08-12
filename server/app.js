var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var path = require('path');
var apiRoutes = require('./api_routes/index');
var clientRoutes = require('./client_routes/index');
var webpackConfig = require('../webpack.config');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var socketConfig = require('./socket/index');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/pollDb', { useMongoClient: true });
const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', function (callback) {
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

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        status: err.status,
        error: (app.get('env') === 'development') ? err : {}
    });
});

const port = process.env.PORT || 3000;
const server = app.listen(port);
socketConfig(server);
console.log('app running on port ' + port);
