angular
    .module('movie-store')
    .controller('SearchController', ['$rootScope', 'MovieService', function ($rootScope, MovieService){

        var vm = this;

        MovieService.getMovieBySearchPhrase({search: $rootScope.searchPhrase})
            .then(function (response) {
                vm.data = response;
            });

        vm.Find  = function (arg) {
            MovieService.getMovieBySearchPhrase({search: arg})
                .then(function (response) {
                    vm.data = response;
                });
        }

    }]);

