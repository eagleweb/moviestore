angular
    .module('movie-store')
    .controller('MovieInfoCtrl', ['$window', 'movieData', 'UserService', function ($window, movieData, UserService){
        var vm = this;
            vm.data = movieData;
            vm.user_id = localStorage.getItem('id');
            vm.items = $window.localStorage.getItem('watchlist');

        vm.addMovieToWatchList = function(){
            UserService.addMovieToWatchList(vm.user_id, vm.data._id);
        };

        vm.removeMovieFromWatchList = function(){
            UserService.removeMovieFromWatchList(vm.user_id, vm.data._id);
        };

        vm.isMovieInWatchlist = function () {
            var store = {};
            for (var i = 0; i < vm.items.length; i++) {
                var key = vm.items[i];
                store[key] = true;
            }

            return(store[vm.data._id]);
        }

    }]);
        