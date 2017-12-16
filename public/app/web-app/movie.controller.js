angular
    .module('movie-store')
    .controller('MovieCtrl', ['MovieService', 'moviePrepService', function (MovieService, moviePrepService){

        var vm = this;
            vm.data = moviePrepService;

    }]);
