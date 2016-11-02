/**
 * Created by lequan on 10/31/2016.
 */

app.service('AirportService', function () {

    var airports = {};

    var setAirports = function (data) {
        data.forEach(function (item) {
            airports[item.airportId] = item.name;
        });
    };

    var getAirports = function () {
        return airports;
    };

    var getCity = function (data) {
        for (var item in data) {
            if (data.hasOwnProperty(item)) {
                var flight = data[item];
                flight.departureCity = airports[flight.departure];
                flight.arrivalCity = airports[flight.arrival];
            }
        }
        return data;
    };

    return {
        setAirports: setAirports,
        getAirports: getAirports,
        getCity: getCity
    };
});
