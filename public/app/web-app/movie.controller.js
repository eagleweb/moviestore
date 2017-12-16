angular
    .module('movie-store')
    .controller('MovieCtrl', ['$scope', 'MovieService', 'moviePrep', function ($scope, MovieService, moviePrep){

        var vm = this;
            vm.data = moviePrep;

    }]);
