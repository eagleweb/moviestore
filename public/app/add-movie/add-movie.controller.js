angular
    .module('movie-store')
    .controller('AddMovieController', ['MovieService', function (MovieService){

        var vm = this;

        vm.SendToStore = function (addForm) {
            console.log(addForm);
            // MovieService.AddMovie(JSON.stringify(addForm))
            //     .then(function (response){
            //
            //     })
        };

    }]);
