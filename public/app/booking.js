/**
 * Created by lequan on 10/20/2016.
 */

app.controller('BookingController', function ($scope, Booking) {

    // $scope.reserve = function (booking) {
    //       Booking.save(booking, function () {
    //
    //       });
    // };
    $scope.passengers = [];

    var reload = function () {

        Booking.query(function (data) {
            console.log(data);
            data.forEach(function (booking) {
                booking.flights.forEach(function (flight) {
                    var item = {};
                    item.bookingId = booking.bookingId;
                    item.date_book = booking.date;
                    item.cost = booking.cost;
                    item.status = booking.status;

                    item.flightId = flight.flightId;
                    item.date_flight = flight.date;
                    item.price = flight.cost;

                    item.adult = booking.passengers[0].adult;
                    item.children = booking.passengers[0].children;
                    item.baby = booking.passengers[0].baby;


                    switch (flight.class) {
                        case 'C':
                            item.class = 'Thương gia';
                            break;
                        case 'Y':
                            item.class = 'Phổ thông';
                            break;
                    }

                    // switch (info.price) {
                    //     case 'F':
                    //         item.price = 'Linh hoạt';
                    //         break;
                    //     case 'S':
                    //         item.price = 'Tiêu chuẩn';
                    //         break;
                    //     case 'C':
                    //         item.price = 'Tiết kiệm';
                    //         break;
                    // }

                    $scope.passengers.push(item);
                });
            });
        });
        console.log($scope.passengers);
    };

    reload();
});