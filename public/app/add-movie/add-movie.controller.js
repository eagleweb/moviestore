angular
    .module('movie-store')
    .controller('AddMovieController', ['$state', 'MovieService', function ($state, MovieService){

        var vm = this;
            vm.success = true;
            vm.hidden = false;

        vm.SendToStore = function (addForm) {
            MovieService.SendMovieToStore(JSON.stringify(addForm))
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
