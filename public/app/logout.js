/**
 * Created by lequan on 11/2/2016.
 */

app.controller('LogoutController', function ($scope,$window,$location) {

    $scope.logout = function () {
        if( $window.sessionStorage.token)
            $window.sessionStorage.removeItem('token');
        $location.path('/login');
    };

});
