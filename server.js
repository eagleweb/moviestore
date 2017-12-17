// BASE SETUP

// CALL THE PACKAGES
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var jwt = require('express-jwt');
var cors = require('cors');
var movieRouter = require('./backend/routes/movieRouter');
// var userRouter = require('./app/routes/userRouter');
// var watchlistRouter = require('./app/routes/watchlistRouter');

var config = require('./config');
var path = require('path');
var helmet = require('helmet');

// connect to DB on Mongolab
mongoose.connect(config.database, {useMongoClient: true});

// APP CONFIGURATION =================================================
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(helmet());

app.use(cors(config.corsOptions));

app.use(morgan('dev'));

//set static files location
app.use(express.static(__dirname + '/public'));

// ROUTES FOR API =====================================================

app.use('/api/data', movieRouter);
// app.use('/api/users', jwtCheck);

//SEND USERS TO FRONTEND
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/app/index.html'));
});

//START SERVER ========================================================
app.listen(config.port);
console.log('Server start on port ' + config.port);