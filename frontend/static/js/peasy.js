var peMod = angular.module('peasy', ['ngRoute', 'ngAnimate', 'ngSanitize', 'ui.bootstrap']);
peMod.config(function($routeProvider) {
    $routeProvider
        .when('/', { templateUrl: '/partials/main.html' })
        .when('/login', { templateUrl: '/partials/login.html' })
        .when('/register', { templateUrl: '/partials/register.html' })
        .when('/company', { templateUrl: '/partials/company.html', controller: 'compayWiseCtrl' })
        .when('/topicwise', { templateUrl: '/partials/topicwise.html' })
        .when('/authortest', { templateUrl: '/partials/authorTest.html' })
        .when('/dashboard', { templateUrl: '/partials/dashboard.html' })
        .when('/addInterviewExperience', { templateUrl: '/partials/addInterviewExperience.html' })
        .when('/viewInterviewExperience', { templateUrl: '/partials/viewInterviewExperience.html' })
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

/* SATYA START*/
$(document).ready(function() { $("#input").cleditor(); });
/* SATYA END*/


peMod.controller('TimepickerDemoCtrl', function($scope, $log) {
    $scope.mytime = new Date();

    $scope.hstep = 1;
    $scope.mstep = 5;

    $scope.ismeridian = true;
    $scope.toggleMode = function() {
        $scope.ismeridian = !$scope.ismeridian;
    };

    $scope.clear = function() {
        $scope.mytime = null;
    };
});

peMod.controller('TimepickerDemo', function($scope, $log) {
    $scope.mytime = new Date();
    $scope.hstep = 1;
    $scope.mstep = 5;

    $scope.ismeridian = true;
    $scope.toggleMode = function() {
        $scope.ismeridian = !$scope.ismeridian;
    };

    $scope.clear = function() {
        $scope.mytime = null;
    };
});