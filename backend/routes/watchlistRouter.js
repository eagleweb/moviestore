var express = require('express');
var watchlistRouter = express.Router();
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Movie = require('../models/movie');
var User = require('../models/user');

watchlistRouter.route('/popular')
    .get(function (req, res) {

        User.aggregate([{$unwind: "$watchlist"}, {$group: {_id: "$watchlist", number: {$sum: 1}}}, {$sort: {number: -1}}, {$limit: 10}, {$project: {_id: 1}}])
            .then(function (result) {
                var items = result.map(function(item) {
                    return item._id;
                });
                return items;
            })
            .then(function(result) {
                Movie.paginate({_id: {$in: result}}, {limit: 10}, function (err, respond) {
                    if (err) res.send(err);
                    res.json(respond);
                })
            })
            .catch(function (err) {
                console.log('MongoDB error:' + err);
            });

    });

watchlistRouter.route('/:user_id')
    .get(function (req, res) {

        User.findOne({_id: req.params.user_id})
            .then(function (user) {
            Movie.paginate({_id: {$in: user.watchlist}}, {select: {Title: 1, Year: 1, imdbRating: 1, Type: 1}, limit: 20}, function (err, result) {
                if (err) res.send(err);
                res.json(result);
            });
        })
            .catch(function (err) {
                console.log('MongoDB error:' + err);
            });

    });

module.exports = watchlistRouter;