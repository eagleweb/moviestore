angular
    .module('movie-store')
    .factory('UserService', ['$rootScope', '$http', 'config', function ($rootScope, $http, config) {

        function getUser(user_id) {
            return $http.get(config.apiUrl.users + user_id)
                .then(function (response) {
                    return response.data;
                })
                .catch(function (err) {
                    console.log(err);
                })
        }

        function getWatchList(user_id) {
            return $http.get(config.apiUrl.watchlist + user_id)
                .then(function (response) {
                    return response.data.docs;
                })
                .catch(function (err) {
                    console.log(err);
                })
        }

        function addMovieToWatchList(user_id, movie_id){
            $rootScope.watchlist.push(movie_id);
            return $http.put(config.apiUrl.users + user_id, {movie_id: movie_id})
                .then(function (response) {
                    return response.data;
                })
                .catch(function (err) {
                    console.log(err);
                })
        }

        function removeMovieFromWatchList(user_id, movie_id){
            var index = $rootScope.watchlist.indexOf(movie_id);
            $rootScope.watchlist.splice(index, 1);
            return $http.delete(config.apiUrl.users + user_id, {params: {'movie_id': movie_id}})
                .then(function (response) {
                    return response.data;
                })
                .catch(function (err) {
                    console.log(err);
                })
        }

        return {
            getUser: getUser,
            getWatchList: getWatchList,
            addMovieToWatchList: addMovieToWatchList,
            removeMovieFromWatchList: removeMovieFromWatchList
        };

    }]);