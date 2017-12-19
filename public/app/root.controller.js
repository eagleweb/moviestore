angular
    .module('movie-store')
    .controller('RootCtrl', ['$state', function ($state){

        var vm = this;

        vm.page = function (){
            return ($state.is('store') || $state.is('movie'));
        }

    }]);
