/**
 * Created by lequan on 10/20/2016.
 */

var router = require('express').Router();
var Airport = require('../models/airport');
var jwt = require("jsonwebtoken");

router.get('/', function (req, res) {

    /*var token = req.body.token || req.query.token || req.header['x-access-token'];
    if (token)
    {
        jwt.verify(token, config.secret, function (err, decoded) {
            if (err)
            {
                res.send({
                    status: 401,
                    message: 'Failed to authenticate token'
                });
                return;
            }

            req.decoded = decoded;
            next();
        });
    }
    else
    {
        res.send({
            status: 403,
            message: 'No token found'
        });
    }*/


   Airport.find({}, function (err, docs) {
       if (err)
           res.send(err);
       res.json(docs);
   });
});

router.post('/', function (req, res) {

    var airport = Object.assign(new Airport(), req.body);

    airport.save(function (err, docs) {
        if (err)
            res.send(err);
        res.json(
            {
                message: "Thêm sân bay thành công"
            }
        );
    });
});

router.delete('/:id', function(req, res){
    Airport.remove({airportId: req.params.id}, function(err){
        if (err) {
            res.send({
                status: 400,
                message: 'Delete failed'
            });
            return;
        }
        res.json({
            status: 200,
            message: 'Airport deleted',
            airportId: req.params.id
        });
    });
});


router.all('/', function (req, res, next) {

    var token = req.body.token || req.query.token || req.header['x-access-token'];
    if (token)
    {
        jwt.verify(token, config.secret, function (err, decoded) {
            if (err)
            {
                res.send({
                    status: 401,
                    message: 'Failed to authenticate token'
                });
                return;
            }

            req.decoded = decoded;
            next();
        });
    }
    else
    {
        res.send({
            status: 403,
            message: 'No token found'
        });
    }
});

module.exports = router;