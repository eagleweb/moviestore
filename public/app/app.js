angular
    .module('movie-store', ['ui.router', 'angularUtils.directives.uiBreadcrumbs', 'angular-jwt'])
    .config(config)
    .constant('config', {
        appName: 'MovieStoreApplication',
        appVersion: 1.0,
        apiUrl: {
            data: 'http://localhost:8080/api/data/',
            authenticate: 'http://localhost:8080/api/auth/authenticate',
            register: 'http://localhost:8080/api/auth/register',
            users: 'http://localhost:8080/api/users/',
            watchlist: 'http://localhost:8080/api/watchlist/'
        }
    });

function config(jwtOptionsProvider, $httpProvider) {

    // Configuration for angular-jwt
    jwtOptionsProvider.config({
        tokenGetter: ['options', function (options) {
            if (options && options.url.substr(options.url.length - 5) === '.html') {
                return null;
            }
            return localStorage.getItem('token');
        }],
        authPrefix: '',
        whiteListedDomains: ['localhost'],
        unauthenticatedRedirectPath: ['$state', function($state) {
            $state.go('login');
        }]
    });

    // Add the jwtInterceptor to the array of HTTP interceptors
    // so that JWTs are attached as Authorization headers
    $httpProvider.interceptors.push('jwtInterceptor');
}
