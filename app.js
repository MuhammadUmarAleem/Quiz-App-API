var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors=require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const database = require('./database/sql');


var viewBookRouter = require('./routes/viewBooks');
var SignUpRouter = require('./routes/SignUp');
var GetUsersRouter = require('./routes/GetUsers');
var GetQuizQRouter = require('./routes/GetQuizQ');
var GetQuizezRouter = require('./routes/GetQuizez');
var adduserquizRouter = require('./routes/adduserquiz');
var GetUserQuizRouter = require('./routes/GetUserQuiz');
var GetUserQuizezRouter = require('./routes/GetUserQuizez');




var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use((req,res,next)=>{
  res.setHeader ('Access-Control-Allow-Origin','http://localhost:3000' );
  res.setHeader ('Access-Control-Allow-Methods', ['GET', 'POST', 'PUT', 'DELETE']);
  res.setHeader ('Access-Control-Allow-Headers', 'Content-Types');
  next();
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/viewBooks', viewBookRouter);
app.use('/SignUp', SignUpRouter);
app.use('/GetUsers', GetUsersRouter);
app.use('/GetQuizQ', GetQuizQRouter);
app.use('/GetQuizez', GetQuizezRouter);
app.use('/adduserquiz', adduserquizRouter);
app.use('/GetUserQuiz', GetUserQuizRouter);
app.use('/GetUserQuizez', GetUserQuizezRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
