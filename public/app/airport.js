/**
 * Created by lequan on 10/20/2016.
 */

app.controller('AirportController', function ($scope, Airport) {

    var reload = function () {
        $scope.airports = Airport.query(function (data) {
            var a = data;
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

});