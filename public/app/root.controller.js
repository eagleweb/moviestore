angular
    .module('movie-store')
    .controller('RootCtrl', ['$state', '$window', 'authService', function ($state, $window, authService){

        var vm = this;

        vm.page = function (){
            return ($state.is('store'));
        };

        vm.doLogout = function () {
            authService.logout();
            $state.go('home');
        };

        vm.loginName = function () {
            return $window.localStorage.getItem('login');
        }

    }]);
