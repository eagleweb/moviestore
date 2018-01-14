angular
    .module('movie-store')
    .factory('MovieService', ['$http', 'config', function ($http, config) {

        function getMoviesByType (arg){
            return $http.get(config.apiUrl.data, {params:arg})
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

        function sortMovieByParam(arg) {
            return $http.get(config.apiUrl.data + 'sort', {params:arg})
                .then(function (response) {
                    return response.data;
                })
                .catch(function (err) {
                    console.log('$http get error:' + err);
                })
        }

        function filterMovieByParam(arg) {
            return $http.get(config.apiUrl.data + 'filter', {params:arg})
                .then(function (response) {
                    return response.data;
                })
                .catch(function (err) {
                    console.log('$http get error:' + err);
                })
        }

        function getTopWatchlist() {
            return $http.get(config.apiUrl.watchlist + 'popular')
                .then(function (response) {
                    return response.data;
                })
                .catch(function (err) {
                    console.log('$http get error:' + err);
                })
        }

        function getMovieBySearchPhrase(arg) {
            return $http.get(config.apiUrl.search, {params:{"search": arg.search}})
                .then(function (response) {
                    return response.data;
                })
                .catch(function (err) {
                    console.log('$http get error:' + err);
                })
        }

        function SendMovieToStore(addForm) {
            return $http.post(config.apiUrl.data, addForm)
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
            sortMovieByParam: sortMovieByParam,
            filterMovieByParam: filterMovieByParam,
            getTopWatchlist: getTopWatchlist,
            getMovieBySearchPhrase: getMovieBySearchPhrase,
            SendMovieToStore: SendMovieToStore
        };

    }]);
