angular
    .module('movie-store')
    .controller('RegisterController', ['$state', 'authService', function ($state, authService){

        var vm = this;
            vm.success = true;
            vm.hidden = false;

        vm.doRegister = function (registerForm) {
            authService.register(JSON.stringify(registerForm))
                .then(function (response){
                    vm.success = response.success;
                    if (response.success) {
                        vm.message = response.message;
                        vm.hidden = true;
                        setTimeout(function(){$state.go('profile')}, 2000);
                    } else {
                        vm.message = response.message;
                    }
                })
        };

        vm.tryAgain = function () {
            vm.success = true;
        }

    }]);