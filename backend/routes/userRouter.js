var express = require('express');
var userRouter = express.Router();
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var User = require('../models/user');

userRouter.route('/:user_id')

    //get single user with id
    .get(function (req, res) {
        User.findOne({user_id: req.params.user_id}, function(err, user) {
            if (err) res.send(err);
            res.json(user);
        });
    })

    // add movie to watchlist for user with user_id
    .put(function(req, res) {
        User.update({user_id: req.params.user_id}, {$addToSet: {watchlist: req.body.movie_id}}, function(err){
            if (err) res.send(err);
            res.json({success: true, message: 'Movie added!'})
        });
    })

    // remove movie from watchlist for user with user_id
    .delete(function(req, res) {
        User.update({user_id: req.params.user_id}, {$pull: {watchlist: req.query.movie_id}}, {'new': true}, function(err){
            if (err) res.send(err);
            res.json({success: true, message: 'Movie removed!'})
        });
    });

module.exports = userRouter;
