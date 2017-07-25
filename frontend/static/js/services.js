var peMod = angular.module('peasy');

peMod.factory('AuthenticationService', ['$http', '$localStorage',
    function($http, $localStorage) {
        var service = {};
        service.login = loginFn;
        service.logout = logoutFn;
        return service;

        function loginFn(username, password, callback) {
            var config = {};
            var payload = { username: username, password: password };
            $http.post('/login/api', payload, config)
                .then(function(response_success) {
                        // login successful if there's a token in the response
                        if ((response_success.data && response_success.data.success) || response_success.token) {
                            if (!response_success.token)
                                response_success = 'dummy_token';
                            // store username and token in local storage to keep user logged in between page refreshes
                            $localStorage.currentUser = { username: username, token: response_success.token };

                            // add jwt token to auth header for all requests made by the $http service
                            $http.defaults.headers.common.Authorization = 'Bearer ' + response_success.token;

                            // execute callback with true to indicate successful login
                            callback(true);
                        } else {
                            callback(false);
                        }
                    },
                    function(response_error) {
                        callback(false);
                    });
        }

        function logoutFn(callback) {
            // remove user from local storage and clear http auth header
            delete $localStorage.currentUser;
            $http.defaults.headers.common.Authorization = '';
            callback();
        }
    }
]);

peMod.factory('myService', function() {
 var savedData = {}
 function set(data) {
   savedData = data;
 }
 function get() {
  return savedData;
 }

 return {
  set: set,
  get: get
 }

});
