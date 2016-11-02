/**
 * Created by lequan on 10/31/2016.
 */

var Admin = require('../models/admin');
var jwt = require('jsonwebtoken');
var express = require('express');
var router = express.Router();
var config = require('../config');

router.post('/', function (req, res) {

    Admin.findOne({username: req.body.username}, function (err, user) {
        if (err)
        {
            res.status(401).send({
                message: 'Username not correct'
            });
            return;
        }

        if (!user)
        {
            res.status(401).send({
                message: 'Username not correct'
            });
        }
        else
        {
            if (user.password != req.body.password)
            {
                res.status(401).send({
                    message: 'Password not match'
                });
            }
            else
            {
                var payload = {
                    username: user.username,
                    time: (new Date()).getTime()
                };
                var token = jwt.sign(payload, config.secret, {expiresIn: config.expire_time});
                res.status(200).json({
                    message: 'Login successful',
                    token: token
                });
            }
        }
    });

});

module.exports = router;