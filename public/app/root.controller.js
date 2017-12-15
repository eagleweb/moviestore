angular
    .module('movie-store')
    .controller('RootCtrl', ['$location', function ($location){

        var vm = this;

        vm.page = function (){
            console.log("root");
            return ('/' === $location.path())
        }

    }]);
