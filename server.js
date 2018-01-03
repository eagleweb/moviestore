// BASE SETUP

// CALL THE PACKAGES
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var passport = require('passport');
var mongoose = require('mongoose');
var cors = require('cors');
var config = require('./config');
var path = require('path');
var helmet = require('helmet');
var favicon = require('serve-favicon');
var movieRouter = require('./backend/routes/movieRouter');
var authRouter = require('./backend/routes/authRouter');
var userRouter = require('./backend/routes/userRouter');
var watchlistRouter = require('./backend/routes/watchlistRouter');

// connect to DB on Mongolab
mongoose.connect(config.database, {useMongoClient: true});

// APP CONFIGURATION =================================================
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(helmet());

app.use(cors(config.corsOptions));

app.use(morgan('dev'));

//initialize passport
app.use(passport.initialize());

//bring in passport strategy
require('./backend/auth/passport')(passport);

//set static files location
app.use(express.static(__dirname + '/public'));

app.use(favicon(path.join(__dirname, '/public/assets/img/', 'favicon.ico')))

// ROUTES FOR API =====================================================

app.use('/api/data', movieRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', passport.authenticate('jwt', { session: false }));
app.use('/api/users', userRouter);
app.use('/api/watchlist', watchlistRouter);

//SEND USERS TO FRONTEND
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/app/index.html'));
});

//START SERVER ========================================================
app.listen(config.port);
console.log('Server start on port ' + config.port);