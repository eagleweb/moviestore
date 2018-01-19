angular
    .module('movie-store')
    .controller('MovieInfoController', ['$rootScope', '$state', '$window', 'movieData', 'UserService', function ($rootScope, $state, $window, movieData, UserService){
        var vm = this;
            vm.data = movieData;
            vm.user_id = localStorage.getItem('id');

        UserService.getUser(vm.user_id)
            .then(function (response) {
                var store = {};
                for (var i = 0; i < response.watchlist.length; i++) {
                    var key = response.watchlist[i];
                    store[key] = true;
                }
                return vm.ismovieinwatchlist = store[vm.data._id];
            });

        vm.addMovieToWatchList = function(){
            UserService.addMovieToWatchList(vm.user_id, vm.data._id)
                .then(function (response) {
                    if (response.success === true) {
                        vm.ismovieinwatchlist = true;
                    } else console.log(response.message);
                })
        };

        vm.removeMovieFromWatchList = function(){
            UserService.removeMovieFromWatchList(vm.user_id, vm.data._id)
                .then(function (response) {
                    if (response.success === true) {
                        vm.ismovieinwatchlist = false;
                    } else console.log(response.message);
                })
        };

        vm.Search = function (searchPhrase) {
            $rootScope.searchPhrase = searchPhrase;
            $state.go('search');
        }

    }]);
        