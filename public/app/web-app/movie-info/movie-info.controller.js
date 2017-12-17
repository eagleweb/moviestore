angular
    .module('movie-store')
    .controller('MovieInfoCtrl', ['movieData', function (movieData){
        var vm = this;
            vm.data = movieData;

    }]);
        