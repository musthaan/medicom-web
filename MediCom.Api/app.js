var createError = require('http-errors');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cors = require('cors');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mediComDb', { promiseLibrary: require('bluebird'), useNewUrlParser: true })
    .then(() => console.log('connection successful'))
    .catch((err) => console.error(err));

var apilabTestGroupRouter = require('./routes/labTestGroupRoute');
var apilabTestRouter = require('./routes/labTestRoute');

var app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'client')));
app.get('/', (req, res) => { res.send('Welcome to MediCom Api') });
app.use('/api/labTestGroup', apilabTestGroupRouter);
app.use('/api/labTest', apilabTestRouter);
console.log(path.join(__dirname, 'client'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    console.log(err);
    // render the error page
    res.status(err.status || 500);
    res.send(err.status);
});

app.listen('5001', () => {
    console.log('MediCom Api Started in port 5001');
})


