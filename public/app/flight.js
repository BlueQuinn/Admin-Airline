/**
 * Created by lequan on 10/20/2016.
 */

app.controller('FlightController', function ($scope, Flight, Airport) {

    var reload = function () {
        Flight.query(function (data) {
            $scope.flights = [];
            data.forEach(function (flight) {
                var item = {};
                item.flightId = flight.flightId;
                item.departure = flight.departure;
                item.arrival = flight.arrival;
                item.date = (new Date(parseInt(flight.date))).toDateString();
                item.time = flight.time;

                flight.info.forEach(function (info) {
                    item.class = info.class;
                    item.price = info.price;
                    item.total_seat = info.total_seat;
                    item.cost = info.cost;

                    $scope.flights.push(item);
                });
            });
        });

        $scope.flight = {};
        $scope.flight.info = {};
    };

    reload();

    $scope.getAirports = function () {
        $scope.airports = Airport.query(function (data) {
            var a =data;
        });
    };

    $scope.getAirports();

    $scope.add = function (flight) {
        flight.date = (new Date()).getTime();
        Flight.save(flight, function () {
            console.log(flight);
            reload();
        });
    };


    $scope.getArrival = function () {

        Flight.query({departure: $scope.flight.departure}, function (data) {
            $scope.arrivals = [];
            data.forEach(function (item) {
                $scope.arrivals.push(item);
            });
        });
    };


    $scope.searchFlights = function (flight) {

        Flight.query(
            {
                departure: flight.departure,
                arrival: flight.arrival,
                date: flight.date,      // long
                return_date: flight.return_date,        // long
                seat_count: flight.seat_count
            }, function (flights) {

            });
    };


    $scope.book = function (flight) {
        Flight.save(flight, function () {

        });
    };

    $(document).ready(function() {
        $('select').material_select();
    });



});
