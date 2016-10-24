/**
 * Created by lequan on 10/20/2016.
 */

var Flight = require('../models/flight');
var express = require('express');
var router = express.Router();

router.post('/', function (req, res) {

    var flight = Object.assign(new Flight(), req.body);
    flight.date = longToDate(req.body.date);
    flight.time = longToTime(req.body.time);
    //flight.info.available_seat = flight.info.total_seat;

    Flight.find({flightId: flight.flightId, date: flight.date}, function (err, data) {
        if (err) {
            res.send(err);
            return;
        }

        if (data.length < 1) {

            flight.save(function (err, docs) {
                if (err) {
                    res.send(err);
                    return;
                }
                res.json(
                    {
                        message: "Thêm chuyến bay thành công."
                    }
                );
            })
        }
        else {
            /*if (flight.info !== undefined) {
                data[0].info.push(flight.info);
                data[0].save(function (err, docs) {
                    if (err)
                        res.send(err);
                    res.json(
                        {
                            message: "Thêm chuyến bay thành công."
                        }
                    );
                });
            }*/
        }
    });
});

router.get('/', function (req, res) {

    switch (filterQuery(req.query))
    {
        case SEARCH_FLIGHTS: {
            var flights = [];

            var query = {
                departure: req.query.departure,
                arrival: req.query.arrival,
                date: longToDate(req.query.date),
                'info.available_seat': req.query.seat_count
            };

            Flight.find(query, function (err, docs) {
                if (err) {
                    res.send(err);
                    return;
                }

                flights = docs;

                if (req.query.return_date !== undefined) {
                    query.departure = req.query.arrival;
                    query.arrival = req.query.departure;
                    query.date = longToDate(req.query.return_date);

                    Flight.find(query, function (err, docs) {
                        if (err) {
                            res.send(err);
                            return;
                        }
                        flights = flights.concat(docs);
                        res.json(flights);
                    });
                }

            });
            break;
        }

        case GET_ARRIVAL: {
            var projection = {arrival: 1};
            Flight.find({departure: req.query.departure}, projection, function (err, docs) {
                if (err)
                    res.send(err);
                res.json(docs);
            });
            break;
        }

        case GET_ALL_FLIGHTS: {
            Flight.find({}, function (err, docs) {
                if (err)
                    res.send(err);
                res.json(docs);
            });
            break;
        }
    }
});


function filterQuery(query) {
    if (query.departure !== undefined && query.arrival !== undefined &&
        query.seat_count !== undefined && query.date !== undefined)
        return SEARCH_FLIGHTS;

    if (query.departure !== undefined)
        return GET_ARRIVAL;

    return GET_ALL_FLIGHTS;
}


function longToDate(millisecond) {
    var date = new Date(millisecond);
    return date.getDate().toString() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
}

function longToTime(millisecond) {
    var date = new Date(millisecond);
    return date.getHours().toString() + ':' + date.getMinutes();
}

var SEARCH_FLIGHTS = 1;
var GET_ALL_FLIGHTS = 2;
var GET_ARRIVAL = 3;


module.exports = router;

