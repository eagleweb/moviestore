var express = require('express');
var authRouter = express.Router();
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var config = require('../../config');
mongoose.Promise = global.Promise;
var User = require('../models/user');

authRouter.route('/register')

    .post(function (req, res) {
        if (!req.body.login || !req.body.password) {
            res.json({success: false, message: 'Please enter an email and password to register.'});
        } else {
            var newUser = new User({
                login: req.body.login,
                email: req.body.email,
                password: req.body.password
            });

            newUser.save(function (err) {
                if (err) {
                    return res.send(err);
                }
                res.json({success: true, message: 'User created successfully'});
            })
        }
    });

authRouter.route('/authenticate')

    .post(function (req, res) {
        User.findOne({login: req.body.login}, function (err, user) {
            if (err) throw err;
            if (!user) {
                res.send({success: false, message: 'Authentication failed. User not found.'});
            } else {
                //check password
                user.comparePassword(req.body.password, function (err, isMatch) {
                    if (isMatch && !err) {
                        // create token
                        var payload = {
                            id: user._id
                        };
                        var token = jwt.sign(payload, config.secret, {
                            expiresIn: 86400
                        });
                        res.json({success: true, token: 'JWT ' + token});
                    } else {
                        res.send({success: false, message: 'Authentication failed. Password did not match.'});
                    }
                });
            }
        });
    });



module.exports = authRouter;
