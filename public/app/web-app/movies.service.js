angular
    .module('movie-store')
    .factory('MovieService', ['$http', 'config', function ($http, config) {

        function getMoviesByType (arg){
            return $http.get(config.apiUrl.data, {params:{"type": arg.type, "genre": arg.genre, "page": arg.page}})
                .then(function (response) {
                    return response.data;
                })
                .catch(function (err) {
                    console.log('$http get error:' + err);
                })
        }
        
        function getMovieByID(arg) {
            return $http.get(config.apiUrl.data + arg)
                .then(function (response) {
                    return response.data;
                })
                .catch(function (err) {
                    console.log('$http get error:' + err);
                })
        }

        function getMovieBySearchPhrase(arg) {
            console.log(typeof arg);
            return $http.get(config.apiUrl.search, {params:{"search": arg.search}})
                .then(function (response) {
                    return response.data;
                })
                .catch(function (err) {
                    console.log('$http get error:' + err);
                })
        }

        return {
            getMoviesByType: getMoviesByType,
            getMovieByID: getMovieByID,
            getMovieBySearchPhrase: getMovieBySearchPhrase
        };

    }]);
