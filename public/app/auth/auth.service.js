angular.
    module('movie-store').
    service('authService', authService);

    function authService(authManager, $window) {

        function login (login, password){
            return $http.post(config.apiUrl.authenticate, {login: login, password: password})
                .then(function (response) {
                    if (response.success) {
                        $window.localStorage.setItem('token', response.token);
                    } else {
                        return response.message;
                    }
                })
                .catch(function (err) {
                    console.log('$http get error:' + err);
                })
        }

        function logout() {
            localStorage.removeItem('token');
            authManager.unauthenticate();
        }

        function register(login, password, email) {
            return $http.post(config.apiUrl.register, {login: login, email: email, password: password})
                .then(function (response) {
                    if (response.success) {
                        return response.message;
                    } else {
                        return response.message;
                    }
                })
                .catch(function (err) {
                    console.log('$http get error:' + err);
                })
        }

        function isAuthenticated() {
            return authManager.isAuthenticated();
        }

        return {
            login: login,
            logout: logout,
            register: register,
            isAuthenticated: isAuthenticated
        };

    }