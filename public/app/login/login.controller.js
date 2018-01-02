angular
    .module('movie-store')
    .controller('LoginController', ['$state', 'authService', function ($state, authService){

        var vm = this;
            vm.success = true;

            vm.doLogin = function (loginForm) {
                authService.login(JSON.stringify(loginForm))
                    .then(function (response){
                        vm.success = response.success;
                        if (response.success) {
                            $state.go('profile');
                        } else {
                            vm.message = response.message;
                        }
                    })
            };

            vm.tryAgain = function () {
                vm.success = true;
            }

    }]);