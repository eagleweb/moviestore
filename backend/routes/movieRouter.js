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

    })

    .post(function (req, res) {
        if (!req.body.title) {
            res.json({success: false, message: 'Please enter title for movie.'});
        } else {
            var newMovie = new Movie({
                Title: req.body.title,
                Year: req.body.year,
                Type: req.body.type,
                Plot: req.body.plot
            });

            newMovie.save(function (err) {
                if (err) {
                    console.log(err);
                    if (err.code === 11000) {
                        return res.json({success: false, message: 'Adding failed. Movie exist.'});
                    } else res.send(err);
                }
                res.json({success: true, message: 'Movie added successfully'});
            })
        }
    });

movieRouter.route('/search')
    .get(function (req, res) {
        if (req.query.search === undefined || req.query.search === '') {
            res.json({success: false, message: 'Enter your search request!'});
        } else
        Movie.find({ $text : { $search : req.query.search } }, { score : { $meta: "textScore" } })
           .sort({ score : { $meta : 'textScore' } })
           .limit(10)
           .exec(function(err, result) {
               if (err) res.send(err);
               if (result.length === 0) {
                   res.json({success: false, message: 'Nothing was found. Sorry! Try another request.'})
               } else res.json({success: true, result: result})
           });
    });

movieRouter.route('/:movie_id')
    .get(function (req, res) {

        Movie.findById(req.params.movie_id, function (err, result) {
            if (err) res.send(err);
            res.json(result);
        })

    });

module.exports = movieRouter;