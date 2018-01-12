angular
    .module('movie-store')
    .controller('MovieController', ['$rootScope', '$state', '$stateParams', 'moviesListData', 'MovieService', function ($rootScope, $state, $stateParams, moviesListData, MovieService){

        var vm = this;
            vm.data = moviesListData.docs;
            vm.totalpages = moviesListData.pages;
            vm.curentpage = moviesListData.page;

        vm.getNextPage = function () {
            MovieService.getMoviesByType({type: $stateParams.type, genre: $stateParams.genre, page: ++vm.curentpage})
                .then(function (response) {
                    vm.data = response.docs;
                    vm.totalpages = response.pages;
                    vm.curentpage = response.page;
                })
        };

        vm.getPreviousPage = function () {
            MovieService.getMoviesByType({type: $stateParams.type, genre: $stateParams.genre, page: --vm.curentpage})
                .then(function (response) {
                    vm.data = response.docs;
                    vm.totalpages = response.pages;
                    vm.curentpage = response.page;
                })
        };

        vm.Search = function (searchPhrase) {
            $rootScope.searchPhrase = searchPhrase;
            $state.go('search');
        }

    }]);
