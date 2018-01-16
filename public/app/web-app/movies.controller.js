angular
    .module('movie-store')
    .controller('MovieController', ['$rootScope', '$state', '$stateParams', 'moviesListData', 'MovieService', function ($rootScope, $state, $stateParams, moviesListData, MovieService){

        var vm = this;
            vm.data = moviesListData.docs;
            vm.totalpages = moviesListData.pages;
            vm.curentpage = moviesListData.page;

        vm.getNextPage = function () {
            MovieService.getMoviesByType({type: $stateParams.type, genre: $stateParams.genre, page: ++vm.curentpage, sort: vm.sort})
                .then(function (response) {
                    vm.data = response.docs;
                    vm.totalpages = response.pages;
                    vm.curentpage = response.page;
                })
        };

        vm.getPreviousPage = function () {
            MovieService.getMoviesByType({type: $stateParams.type, genre: $stateParams.genre, page: --vm.curentpage, sort: vm.sort})
                .then(function (response) {
                    vm.data = response.docs;
                    vm.totalpages = response.pages;
                    vm.curentpage = response.page;
                })
        };

        vm.sortMovieByParam = function (param) {
            vm.sort = param;
            MovieService.sortMovieByParam({type: $stateParams.type, genre: $stateParams.genre, page: 1, sort: param})
                .then(function (response) {
                    vm.data = response.docs;
                    vm.totalpages = response.pages;
                    vm.curentpage = response.page;
                })
        };

        vm.filterMovieByParam = function (filterForm) {
            filterForm.genre = $stateParams.genre;
            filterForm.type = $stateParams.type;
            filterForm.page = 1;
            MovieService.filterMovieByParam(JSON.stringify(filterForm))
                .then(function (response) {
                    vm.data = response.docs;
                    vm.totalpages = response.pages;
                    vm.curentpage = response.page;
                })
        };

        vm.getTopWatchlist = function () {
            MovieService.getTopWatchlist()
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
