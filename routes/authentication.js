/**
 * Created by lequan on 11/1/2016.
 */

var express = require('express');
var router = express.Router();
var config = require('../config');
var jwt = require('jsonwebtoken');

router.use(function (req, res, next) {

    var token = req.headers.authorization || req.body.token || req.query.token;

    // decode token
    if (token)
    {
        // verifies secret and checks exp
        jwt.verify(token, config.secret, function (err, decoded) {
                if (err)
                {
                    if (err.name == 'TokenExpiredError')
                    {
                        return res.status(401).send({
                            message: 'Your session has expired.\nPlease sign in to continue.'
                        });
                    }
                    return res.status(401).send({
                        message: 'Authentication failed'
                    });
                }
                else
                {
                    /*if (decoded)
                    {
                        var payload = {
                            username: decoded.username,
                            password: decoded.password,
                            time: (new Date()).getTime()
                        };
                        var now = Math.floor((new Date()).getTime() / 1000);
                        console.log('time = ' + now + ' ' + decoded.exp);
                        if (decoded.exp < now + 10)
                        {
                            var token = jwt.sign(payload, config.secret, config.expire_time);
                            res.setHeader('token', token);
                            console.log('token = ' + token);
                        }
                        // save to request for use in other routes
                        //req.decoded = decoded;
                    }*/
                    next();
                }
            }
        );
    }
    else
    {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }
})
;


module.exports = router;
