angular.module('peasy', ['ngAnimate', 'ngSanitize', 'ui.bootstrap']);
angular.module('peasy').controller('TimepickerDemoCtrl', function ($scope, $log) {
  $scope.mytime = new Date();

  $scope.hstep = 1;
  $scope.mstep = 5;

  $scope.ismeridian = true;
  $scope.toggleMode = function() {
    $scope.ismeridian = ! $scope.ismeridian;
  };

  

  $scope.clear = function() {
    $scope.mytime = null;
  };
});



angular.module('peasy').controller('TimepickerDemo', function ($scope, $log) {
  $scope.mytime = new Date();

  $scope.hstep = 1;
  $scope.mstep = 5;

  $scope.ismeridian = true;
  $scope.toggleMode = function() {
    $scope.ismeridian = ! $scope.ismeridian;
  };

  

  $scope.clear = function() {
    $scope.mytime = null;
  };
});