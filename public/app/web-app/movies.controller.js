angular
    .module('movie-store')
    .controller('MovieCtrl', ['$stateParams', 'moviesListData', 'MovieService', function ($stateParams, moviesListData, MovieService){

        var vm = this;
            vm.data = moviesListData.docs;
            vm.totalpages = moviesListData.pages;
            vm.curentpage = moviesListData.page;

        vm.getNextPage = function () {
            MovieService.getMoviesByType({type: $stateParams.type, genre: $stateParams.genre, page: ++vm.curentpage})
        };

        vm.getPreviousPage = function () {
            MovieService.getMoviesByType({type: $stateParams.type, genre: $stateParams.genre, page: --vm.curentpage})
        }
    }]);
