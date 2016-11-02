/**
 * Created by lequan on 10/20/2016.
 */

app.controller('AirportController', function ($scope, Airport, AirportService) {

    var reload = function () {
        $scope.airports = Airport.query(function (data) {
            AirportService.setAirports(data);
        });

        $scope.airport = {};
    };

    reload();

    $scope.add = function (airport) {
        Airport.save(airport, function () {
            console.log(airport);
            reload();
        });
    };

    $scope.delete = function (airport) {
        Airport.delete({id: airport.airportId}, function(){
            reload();
        });
    };
});