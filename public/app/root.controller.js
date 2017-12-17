angular
    .module('movie-store')
    .controller('RootCtrl', ['$location', function ($location){

        var vm = this;

        vm.page = function (){
            return ('/' === $location.path())
        }

    }]);
