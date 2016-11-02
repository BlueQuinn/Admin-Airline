/**
 * Created by lequan on 10/20/2016.
 */

app.controller('PassengerController', function ($scope, Passenger) {

    // $scope.buyTicket = function (ticket) {
    //
    //     Passenger.save(ticket, function () {
    //
    //     });
    //
    // };

    $scope.passengers = [];

    var reload = function () {

        Passenger.query(function (data) {
            console.log(data);
            data.forEach(function (passenger) {
                var item = {};
                item.bookingId = passenger.bookingId;
                item.phone = passenger.phone;
                item.email = passenger.email;
                item.info = [];
                passenger.adult.forEach(function (adult,index) {

                    item.info[index].type = "Người lớn";
                    item.info[index].title = adult.title;
                    item.info[index].firstname = adult.firstname;
                    item.info[index].lastname = adult.lastname;
                    item.info[index].gender = adult.gender;
                    item.info[index].birthday = adult.birthday;
                    item.info[index].id = adult.id;

                });

                passenger.children.forEach(function (adult,index) {

                    item.info[index + passenger.adult.getLength()].type = "Trẻ em";
                    item.info[index + passenger.adult.getLength()].title = adult.title;
                    item.info[index + passenger.adult.getLength()].firstname = adult.firstname;
                    item.info[index + passenger.adult.getLength()].lastname = adult.lastname;
                    item.info[index + passenger.adult.getLength()].gender = adult.gender;
                    item.info[index + passenger.adult.getLength()].birthday = adult.birthday;
                    item.info[index + passenger.adult.getLength()].id = adult.id;

                });

                passenger.baby.forEach(function (adult,index) {

                    item.info[index + passenger.adult.getLength() + passenger.children.getLength()].type = "Trẻ sơ sinh";
                    item.info[index + passenger.adult.getLength() + passenger.children.getLength()].title = adult.title;
                    item.info[index + passenger.adult.getLength() + passenger.children.getLength()].firstname = adult.firstname;
                    item.info[index + passenger.adult.getLength() + passenger.children.getLength()].lastname = adult.lastname;
                    item.info[index + passenger.adult.getLength() + passenger.children.getLength()].gender = adult.gender;
                    item.info[index + passenger.adult.getLength() + passenger.children.getLength()].birthday = adult.birthday;
                    item.info[index + passenger.adult.getLength() + passenger.children.getLength()].id = adult.id;

                });

                $scope.passengers.push(item);
            });
        });
        console.log($scope.passengers);
    };

    reload();

});