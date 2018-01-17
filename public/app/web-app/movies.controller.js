angular
    .module('movie-store')
    .controller('MovieController', ['$rootScope', '$state', '$stateParams', 'moviesListData', 'MovieService', function ($rootScope, $state, $stateParams, moviesListData, MovieService){

        var vm = this;
            vm.data = moviesListData.docs;
            vm.totalpages = moviesListData.pages;
            vm.curentpage = moviesListData.page;
            vm.type = $stateParams.type;
            vm.genre = $stateParams.genre;
            vm.typeofreq = undefined;

        vm.paginate = function (page) {
            console.log(page);
            switch (vm.typeofreq){
                case undefined:
                    MovieService.getMoviesByType({type: vm.type, genre: vm.genre, page: page})
                        .then(function (response) {
                            vm.data = response.docs;
                            vm.totalpages = response.pages;
                            vm.curentpage = response.page;
                        });
                    break;
                case 'filter':
                    vm.filter.page = page;
                    console.log(vm.filter.page);
                    MovieService.filterMovieByParam(vm.filter)
                        .then(function (response) {
                            vm.data = response.docs;
                            vm.totalpages = response.pages;
                            vm.curentpage = response.page;
                        });
                    break;
                case 'sort':
                    MovieService.sortMovieByParam({type: vm.type, genre: vm.genre, page: page, sort: param})
                        .then(function (response) {
                            vm.data = response.docs;
                            vm.totalpages = response.pages;
                            vm.curentpage = response.page;
                        });
                    break;

            }
        };

        vm.sortMovieByParam = function (param) {
            vm.typeofreq = 'sort';
            MovieService.sortMovieByParam({type: vm.type, genre: vm.genre, page: 1, sort: param})
                .then(function (response) {
                    vm.data = response.docs;
                    vm.totalpages = response.pages;
                    vm.curentpage = response.page;
                })
        };

        vm.filterMovieByParam = function (filterForm) {
            vm.typeofreq = 'filter';
            filterForm.genre = vm.genre;
            filterForm.type = vm.type;
            filterForm.page = 1;
            vm.filter = filterForm;
            MovieService.filterMovieByParam(filterForm)
                .then(function (response) {
                    vm.data = response.docs;
                    vm.totalpages = response.pages;
                    vm.curentpage = response.page;
                })
        };

        vm.getTopWatchlist = function () {
            vm.typeofreq = undefined;
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
        };

    }]);
