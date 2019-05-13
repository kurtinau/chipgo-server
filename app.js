var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var rfs = require('rotating-file-stream')

var apiRouter = require('./routes/api');
var rootRouter = require('./routes/index');

var app = express();

// create a rotating write stream
var accessLogStream = rfs('access.log', {
    interval: '1d', // rotate daily
    path: path.join(__dirname, 'log')
})

if (app.get('env') == 'production') {
    app.use(logger('combined', {
        skip: function (req, res) {
            return res.statusCode < 400
        },
        stream: accessLogStream
    }));
} else {
    app.use(logger('dev'));
}

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


app.use('/', rootRouter);
app.use('/api', apiRouter);

module.exports = app;
