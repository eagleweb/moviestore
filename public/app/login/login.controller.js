angular
    .module('movie-store')
    .controller('LoginController', ['authService', function (authService){

        var vm = this;

            vm.doLogin = function (login, password) {
                authService.login(login, password);
            };

    }]);