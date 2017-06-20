var plmod = angular.module("pleyapp", ['ngRoute']);

plmod.config(function($routeProvider){
   $routeProvider
             .when('/', {templateUrl: 'patials/home.html', contoller: 'homectrl'})
             .when('/topicwise', {templateUrl: 'patials/topicwise.html', controller: 'tpwctrl'})
             .when('/companywise', {templateUrl: 'patials/companywise.html', controller: 'cmpwctrl'});
});
    
plmod.controller("pleyctrl", function(){
    
});
        
plmod.controller("homectrl", function(){
    
});
    
plmod.controller("tpwctrl", function(){
    
});
        
plmod.controller("cmpwctrl", ['$scope', '$http', function($scope,$http){
  $http.get('data/info.json').success(function(data){
     $scope.info=data; 
  });  
}]);