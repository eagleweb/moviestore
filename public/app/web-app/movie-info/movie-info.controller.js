angular
    .module('movie-store')
    .controller('MovieInfoCtrl', ['movieData', 'UserService', function (movieData, UserService){
        var vm = this;
            vm.data = movieData;
            vm.user_id = localStorage.getItem('id');

        vm.addMovieToWatchList = function(){
            UserService.addMovieToWatchList(vm.user_id, vm.data._id);
        };

        vm.removeMovieFromWatchList = function(){
            UserService.removeMovieFromWatchList(vm.user_id, vm.data._id);
        };

        // vm.isMovieInWatchlist = function () {
        //     var store = {};
        //     var items = UserService.getUser(vm.user_id).watchlist;
        //
        //     for (var i = 0; i < items.length; i++) {
        //         var key = items[i];
        //         store[key] = true;
        //     }
        //
        //     return(store[vm.data._id]);
        // }

    }]);
        