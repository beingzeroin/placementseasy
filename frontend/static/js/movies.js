var peMod = angular.module('peasy');

peMod.controller('moviesCtrl', function($scope, $window, popupService, Movie) {
    $scope.movies = Movie.query();

    $scope.deleteMovie = function(movie) {
        if (popupService.showPopup('Really delete this?')) {
            movie.$delete(function() {
                $window.location.href = '';
            });
        }
    }
});

peMod.controller('moviesCreateController', function($scope, $location, Movie) {
    $scope.movie = new Movie();

    $scope.addMovie = function() {
        $scope.movie.$save(function() {
            $location.path('/movies');
        });
    }
});

peMod.controller('moviesViewController', function($scope, $routeParams, Movie) {
    $scope.movie = Movie.get({ id: $routeParams.id });
});

peMod.controller('moviesEditController', function($scope, $routeParams, $location, Movie) {
    $scope.updateMovie = function() {
        $scope.movie.$update(function() {
            $location.path('/movies');
        });
    };

    $scope.loadMovie = function() {
        $scope.movie = Movie.get({ id: $routeParams.id });
    };

    $scope.loadMovie();
});

peMod.factory('Movie', function($resource) {
    return $resource('/api/movies/:id', { id: '@_id' }, {
        update: {
            method: 'PUT'
        }
    });
});

peMod.service('popupService', function($window) {
    this.showPopup = function(message) {
        return $window.confirm(message);
    }
});