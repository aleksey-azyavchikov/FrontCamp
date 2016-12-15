var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();
var database = require('./config/database');
var gradesRequests = require('./requests/grades');

var Schema = mongoose.Schema;

var article = new Schema({
  "author": "string",
  "title": "string",
  "description": "string",
  "url": "string",
  "urlToImage": "string",
  "publishedAt" :"string"
}, {collection: "news"});
var Article = mongoose.model('Article', article, 'news');

var grade = new Schema({
  "student_id": "number",
  "class_id": "number",
  "scores": "array"
}, {colletion: "grades" })
var Grade = mongoose.model('Grade', grade, 'grades')

mongoose.connect(database.path,  function(err) {
  if(err) {
    console.log('connection error with db tamonsys', err);
  } else {
    console.log('connection successful with db');
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// 
//app.set('view engine', 'html');
//app.engine('html', ejs.renderFile)


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
})

app.use('/', index);
app.use('/users', users);

app.get('/news', (request, response, next) => {
  Article.find({}, function(error, data) {
    error ? response.send(error) : response.send(data);
  })
});

app.get('/bestclass', (request, response, next) => {
  Grade.aggregate(gradesRequests.bestclass, function(error, data) {
    error ? response.send(error) : response.send(data);
  })
});

app.get('/grades', (request, response, next) => {
  Grade.find({}, function(error, data) {
    error ? response.send(error) : response.send(data);
  })
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  console.log("rere");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
