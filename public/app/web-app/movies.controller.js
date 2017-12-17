angular
    .module('movie-store')
    .controller('MovieCtrl', ['moviesListData', function (moviesListData){

        var vm = this;
            vm.data = moviesListData;

    }]);
