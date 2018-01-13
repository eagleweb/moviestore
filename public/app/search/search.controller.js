angular
    .module('movie-store')
    .controller('SearchController', ['$rootScope', 'MovieService', function ($rootScope, MovieService){

        var vm = this;
            vm.searchPhrase = $rootScope.searchPhrase;

        MovieService.getMovieBySearchPhrase({search: vm.searchPhrase})
            .then(function (response) {
                vm.success = response.success;
                if (response.success){
                    vm.data = response.result;
                } else vm.message = response.message;
            });

        vm.Find  = function (arg) {
            MovieService.getMovieBySearchPhrase({search: arg})
                .then(function (response) {
                    vm.success = response.success;
                    if (response.success){
                        vm.data = response.result;
                    } else vm.message = response.message;
                });
        }

    }]);

