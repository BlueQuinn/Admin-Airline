/**
 * Created by lequan on 10/31/2016.
 */

app.controller('LoginController', function ($scope, $http, $window, $location) {

    $scope.admin = {};
    $scope.message = "";

    $scope.login = function () {

        if ($scope.admin.username && $scope.admin.password)
        {
            $http.post('/airlines/login', $scope.admin)
                .success(function (data, status, headers, config) {
                    $window.sessionStorage.token = data.token;
                    $scope.message = 'Welcome';
                    $location.path('/airport');
                })
                .error(function (data, status, headers, config) {
                    //$window.sessionStorage.removeItem('token');
                    if (data)
                    $scope.message = data.message;
                });
        }
    };
});