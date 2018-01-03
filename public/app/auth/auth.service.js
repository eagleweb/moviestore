angular.
    module('movie-store').
    service('authService', ['$rootScope', 'jwtHelper', 'authManager', '$window', '$http', 'config', function ($rootScope, jwtHelper, authManager, $window, $http, config) {

        function login (loginForm){
            return $http.post(config.apiUrl.authenticate, loginForm)
                .then(function (response) {
                    if (response.data.success) {
                        $window.localStorage.setItem('token', response.data.token);
                        var tokenPayload = jwtHelper.decodeToken(response.data.token);
                        // console.log(tokenPayload);
                        // $window.localStorage.setItem('login', tokenPayload.login);
                        $rootScope.id = tokenPayload.id;
                        $rootScope.login = tokenPayload.login;
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
            authManager.unauthenticate();
            $rootScope.login = undefined;
            $rootScope.id = undefined;
            // localStorage.removeItem('login');
        }

        function register(registerForm) {
            return $http.post(config.apiUrl.register, registerForm)
                .then(function (response) {
                    if (response.data.success) {
                        $window.localStorage.setItem('token', response.data.token);
                        authManager.authenticate();
                    }
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