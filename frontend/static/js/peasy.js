var peMod = angular.module('peasy', ['ngRoute']);
peMod.config(function($routeProvider) {
    $routeProvider
        .when('/', { templateUrl: '/partials/main.html' })
        .when('/login', { templateUrl: '/partials/login.html' })
        .when('/register', { templateUrl: '/partials/register.html' })
        .when('/company', { templateUrl: '/partials/company.html', controller: 'compayWiseCtrl' })
        .when('/topicwise', { templateUrl: '/partials/topicwise.html' })
        .when('/dashboard', { templateUrl: '/partials/dashboard.html' })
        .when('/notfound', { templateUrl: '/partials/404.html' })
        .otherwise({ redirectTo: '/notfound' })
});
peMod.controller('peasyCtrl', ['$scope', function($scope) {
    $scope.message = 'Test Message';
}]);

peMod.controller('compayWiseCtrl', ['$scope', '$http', function($scope, $http) {
    $http.get('/data/company-wise-test-data.json')
        .then(function(response) {
            $scope.info = response.data;
        }, function(error) {
            $scope.error = error;
        });
}]);