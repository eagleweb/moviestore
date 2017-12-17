angular
    .module('movie-store')
    .factory('MovieService', ['$http', function ($http) {

        var vm = this;
            vm.movieconfig = {
                type: 'movie',
                genre: 'all',
                page: 1,
                totalpages: 1,
                totaldocs: 1
            };

        var movieFactory ={
            getMoviesByType: getMoviesByType,
            getMovieByID: getMovieByID,
            movieconfig: vm.movieconfig
        };

        return movieFactory;

        function getMoviesByType (arg){
            return $http.get('http://localhost:8080/api/data', {params:{"type": arg.type, "genre": arg.genre, "page": arg.page}})
                .then(function (response) {
                    vm.movieconfig.type = response.config.params.type;
                    vm.movieconfig.genre = response.config.params.genre;
                    vm.movieconfig.page = response.config.params.page;
                    vm.movieconfig.totalpages = response.data.pages;
                    vm.movieconfig.totaldocs = response.data.total;
                    return response.data.docs;
                })
                .catch(function (err) {
                    console.log('$http get error:' + err);
                })
        }
        
        function getMovieByID(arg) {
            return $http.get('http://localhost:8080/api/data/' + arg._id)
                .then(function (response) {
                    vm.movieconfig.type = response.data.Type;
                    vm.movieconfig.genre = 'all';
                    return response.data;
                })
                .catch(function (err) {
                    console.log('$http get error:' + err);
                })
        }

    }]);
