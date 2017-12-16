var express = require('express');
var movieRouter = express.Router();
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Movie = require('../models/movie');

movieRouter.route('/')
    .get(function (req, res) {

        if (req.query.genre === 'all') {
            Movie.paginate({Type: req.query.type}, {page: +req.query.page, limit: 10}, function (err, result) {
                if (err) res.send(err);
                res.json(result);
            });
        } else {
            Movie.paginate({Type: req.query.type, Genre: req.query.genre}, {page: +req.query.page, limit: 10}, function (err, result) {
                if (err) res.send(err);
                res.json(result);
            });
        }

    });

movieRouter.route('/:movie_id')
    .get(function (req, res) {

        Movie.findById(req.params.movie_id, function (err, result) {
            if (err) res.send(err);
            res.json(result);
        })

    });

module.exports = movieRouter;