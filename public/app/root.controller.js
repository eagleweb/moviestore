angular
    .module('movie-store')
    .controller('RootCtrl', ['$rootScope', '$state', '$window', 'authService', function ($rootScope, $state, $window, authService){

        var vm = this;

        vm.page = function (){
            return ($state.is('store') || $state.is('movie'));
        };

        vm.doLogout = function () {
            authService.logout();
            $state.go('home');
        };

        vm.loginName = function () {
            return $rootScope.login;
        }

    }]);
