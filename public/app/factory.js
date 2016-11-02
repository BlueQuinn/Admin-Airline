/**
 * Created by lequan on 10/20/2016.
 */

app.factory('Login', function ($resource) {
    return $resource('/airlines/login/');
});

app.factory('authInterceptor', function ($rootScope, $q, $window, $location) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.token)
            {
                if (config.url == 'login.html')
                {
                    $location.path('/airport');
                    return;
                }
                config.headers.Authorization = $window.sessionStorage.token;
                //console.log('req = ' + $window.sessionStorage.token);
            }
            else
            {
                if (!config.url.includes('login'))
                {
                    $location.path('/login');
                }
            }
            return config;
        },
        response: function (response) {
            if (response.status === 401)
            {
                $window.sessionStorage.removeItem('token');     // this will asign token to undefined, bcuz for storage, can't directly set to null or undefined
                $location.path('/login');
            }/*
            else
            {
                var header = response.headers();
                if (header.token)
                    $window.sessionStorage.token = header.token;
                header.token = undefined;
            }*/
            return response || $q.when(response);
        },
        requestError: function (rejection) {
            return $q.reject(rejection);
        },
        responseError: function (rejection) {
            if (rejection.status === 401)
            {
                $window.sessionStorage.removeItem('token');
                $location.path('/login');
            }
            return $q.reject(rejection);
        }
    };
});

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
});


/*------------------------------------------------------------------------*/


app.factory('Airport', function ($resource) {
    //return $resource('/airlines/airports/');
    return $resource('/airlines/airports/:id',
        {
            id: '@id'
        },
        {
            delete: {
                method: 'DELETE'
            }
        });
});

app.factory('Flight', function ($resource) {
    //return $resource('/airlines/flights/');
    return $resource('/airlines/flights/:id',
        {
            id: '@id'
        },
        {
            delete: {
                method: 'DELETE'
            }
        });
});

app.factory('Booking', function ($resource) {
    return $resource('/airlines/bookings/');
});

app.factory('Passenger', function ($resource) {
    return $resource('/airlines/passengers/');
});

