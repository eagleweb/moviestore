angular.
    module('movie-store').
    service('authService', ['$rootScope', 'jwtHelper', 'authManager', '$window', '$http', 'config', function ($rootScope, jwtHelper, authManager, $window, $http, config) {

        function login (loginForm){
            return $http.post(config.apiUrl.authenticate, loginForm)
                .then(function (response) {
                    if (response.data.success) {
                        $window.localStorage.setItem('token', response.data.token);
                        var tokenPayload = jwtHelper.decodeToken(response.data.token);
                        $window.localStorage.setItem('login', tokenPayload.login);
                        $window.localStorage.setItem('id', tokenPayload.id);
                        authManager.authenticate();
                    }
                    return response.data;
                })
                .catch(function (err) {
                    console.log('$http get error:' + err);
                })
        }

        function logout() {
            localStorage.removeItem('token');
            localStorage.removeItem('login');
            localStorage.removeItem('id');
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
            register: register
        };

    }]);