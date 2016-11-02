var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config');

mongoose.connect('mongodb://localhost/airlines');

var app = express();

// view engine setup
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/*app.use('/airlines', expressJwt(
    {
        secret: config.secret
    }).unless(
    {
        path: ['/airlines/login']
    }));*/

app.use('/airlines/login', require('./routes/login'));

app.use('/airlines/*', require('./routes/authentication'));

app.use('/airlines/airports', require('./routes/airport'));
app.use('/airlines/flights', require('./routes/flight'));


/*var apiRoute = express.Router();

 apiRoute.use(function (req, res, next) {

 var token = req.body.token || req.query.token || req.header['x-access-token'];
 if (token)
 {
 jwt.verify(token, config.secret, function (err, decoded) {
 if (err)
 {
 res.send({
 status: 401,
 message: 'Failed to authenticate token'
 });
 return;
 }

 req.decoded = decoded;
 next();
 });
 }
 else
 {
 res.send({
 status: 403,
 message: 'No token found'
 });
 }
 });

 app.use('/airlines', apiRoute);*/



// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


var port = process.env.PORT || 8088;
app.listen(port, function () {
    console.log("Admin Server listening on port " + port);
});


module.exports = app;
