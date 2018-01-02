angular
    .module('movie-store')
    .controller('RootCtrl', ['$state', 'authManager', function ($state, authManager){

        var vm = this;

        vm.page = function (){
            return ($state.is('store') || $state.is('movie'));
        };

    }]);
