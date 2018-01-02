angular.
    module('movie-store').
    service('authService', ['authManager', '$window', '$http', 'config', function (authManager, $window, $http, config) {

        function login (loginForm){
            return $http.post(config.apiUrl.authenticate, loginForm)
                .then(function (response) {
                    if (response.data.success) {$window.localStorage.setItem('token', response.data.token)}
                    return response.data;
                })
                .catch(function (err) {
                    console.log('$http get error:' + err);
                })
        }

        function logout() {
            localStorage.removeItem('token');
            authManager.unauthenticate();
        }

        function register(registerForm) {
            return $http.post(config.apiUrl.register, registerForm)
                .then(function (response) {
                    return response.data;
                })
                .catch(function (err) {
                    console.log('$http get error:' + err);
                })
        }

        return {
            login: login,
            logout: logout,
            register: register,
        };

    }]);