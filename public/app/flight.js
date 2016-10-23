/**
 * Created by lequan on 10/20/2016.
 */

app.controller('FlightController', function ($scope, Flight, Airport) {

    var departureDate;
    $scope.info = ['Thương gia linh hoạt', 'Thương gia tiêu chuẩn', 'Phổ thông linh hoạt', 'Phổ thông tiêu chuẩn', 'Phổ thông tiết kiệm'];
    $scope.class = ['C', 'C', 'Y', 'Y', 'Y'];
    $scope.price = ['F', 'S', 'F', 'S', 'C'];


    var reload = function () {

        Flight.query(function (data) {
            $scope.flights = [];
            data.forEach(function (flight) {
                flight.info.forEach(function (info) {
                    var item = {};
                    item.flightId = flight.flightId;
                    item.departure = flight.departure;
                    item.arrival = flight.arrival;
                    item.date = flight.date;
                    item.time = flight.time;
                    item.total_seat = info.total_seat;
                    item.cost = info.cost;

                    switch (info.class) {
                        case 'C':
                            item.class = 'Thương gia';
                            break;
                        case 'Y':
                            item.class = 'Phổ thông';
                            break;
                    }

                    switch (info.price) {
                        case 'F':
                            item.price = 'Linh hoạt';
                            break;
                        case 'S':
                            item.price = 'Tiêu chuẩn';
                            break;
                        case 'C':
                            item.price = 'Tiết kiệm';
                            break;
                    }

                    $scope.flights.push(item);
                });

                var g =1 ;
            });
        });

        $scope.flight = {};
        $scope.flight.info = [];
    };

    reload();

    $scope.getAirports = function () {
        Airport.query(function (data) {
            $scope.airports = data;
        });
    };

    $scope.getAirports();

    $scope.add = function (flight) {
        flight.date = departureDate;
        flight.time = departureDate;
        for (var i = 0; i < $scope.info.length; ++i) {
            flight.info[i].class = $scope.class[i];
            flight.info[i].price = $scope.price[i];
            flight.info[i].available_seat = flight.info[i].total_seat;
        }
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

    /*$(document).ready(function() {
     $('select').material_select();
     });*/

    $('input[id="datetimepicker"]').daterangepicker({
            timePicker: true,
            singleDatePicker: true,
            showDropdowns: true,
            locale: {
                format: 'hh:mm DD/MM/YYYY'
            }
        },
        function (start, end, label) {
            departureDate = (new Date(start)).getTime();

            var a = 1;

            // $scope.returnDate = 0;
        });

});
