var peMod = angular.module('peasy', ['ngRoute']);
peMod.config(function($routeProvider) {
    $routeProvider
        .when('/', { templateUrl: '/partials/main.html' })
        .when('/login', { templateUrl: '/partials/login.html' })
        .when('/register', { templateUrl: '/partials/register.html' })
        .when('/company', { templateUrl: '/partials/company.html' })
        .when('/dashboard', { templateUrl: '/partials/dashboard.html' })
        .when('/notfound', { templateUrl: '/partials/404.html' })
        .otherwise({ redirectTo: '/notfound' })
});
peMod.controller('peasyCtrl', ['$scope', function($scope) {
    $scope.message = 'Test Message';
}]);