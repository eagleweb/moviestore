var express = require('express');
var movieRouter = express.Router();
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Movie = require('../models/movie');

movieRouter.route('/')
    // get movies by type ang genre
    .get(function (req, res) {
        var obj = {};
        obj.Type = req.query.type;
        if (req.query.genre !== 'all') {obj.Genre = req.query.genre;}
        Movie.paginate(obj, {page: +req.query.page, limit: 12}, function (err, result) {
            if (err) res.send(err);
            res.json(result);
        });
    })

    // add movie to store
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

movieRouter.route('/sort')

    // sort movie by date or popular
    .get(function (req, res) {
        var obj = {};
        obj.Type = req.query.type;
        if (req.query.genre !== 'all') {obj.Genre = req.query.genre;}
        switch (req.query.sort){
            case 'popular':
                Movie.paginate(obj, {sort: {imdbRating: -1}, page: +req.query.page, limit: 12}, function (err, result) {
                    if (err) res.send(err);
                    res.json(result);
                });
                break;
            case 'date':
                Movie.paginate(obj, {sort: { Released: -1 }, page: +req.query.page, limit: 12}, function (err, result) {
                    if (err) res.send(err);
                        res.json(result);
                    });
                break;
        }
    });

movieRouter.route('/filter')

    // filter movie by Type, Genre, Year, Country, Language
    .post(function (req, res) {
        var obj = {};
        obj.Type = req.body.type;
        if (req.body.genre !== 'all'){obj.Genre = req.body.genre;}
        if (req.body.country){obj.Country = req.body.country;}
        if (req.body.language){obj.Language = req.body.language;}
        if (req.body.year) {
            switch (req.body.year){
                case '2018':
                case '2017':
                case '2016':
                case '2015':
                case '2014':
                    obj.Year = req.body.year;
                    break;
                case '2010-2013':
                    obj.Year = { $gt: 2010, $lt: 2013 };
                    break;
                case '2000-2010':
                    obj.Year = { $gt: 2000, $lt: 2010 };
                    break;
                case '1990-2000':
                    obj.Year = { $gt: 1990, $lt: 2000 };
                    break;
                case 'old':
                    obj.Year = { $lt: 1990 };
                    break;
            }
        }
        Movie.paginate(obj, {page: +req.body.page, limit: 12}, function (err, result) {
            console.log(obj);
            if (err) res.send(err);
            res.json(result);
        });
    });

movieRouter.route('/search')

    // find movie in store by searchphrase
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

    // get info about movie by id
    .get(function (req, res) {
        Movie.findById(req.params.movie_id, function (err, result) {
            if (err) res.send(err);
            res.json(result);
        })

    });

module.exports = movieRouter;