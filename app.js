var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var { Mongoose } = require('./untils/config.js')
var cors = require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// 解决跨域
app.use(cors())

// 设置跨域
// app.all('*', (req, res, next) => {
// 	res.header("Access-Control-Allow-Origin", "*");
// 	res.writeHead(200, {
// 		'Content-Type': 'text/html;charset=utf-8'
// 	});
// 	//设置response编码为utf-8
// 	next();
// })

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 路由 接口
app.use('/', indexRouter);
app.use('/api2/user', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// 数据库连接
// Mongoose.connect();


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
