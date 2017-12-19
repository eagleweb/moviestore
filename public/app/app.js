angular
    .module('movie-store', ['ui.router', 'angularUtils.directives.uiBreadcrumbs'])
    .config(config)
    .constant('config', {
        appName: 'MovieStoreApplication',
        appVersion: 1.0,
        apiUrl: {
            data: 'http://localhost:8080/api/data/',
            users: 'http://localhost:8080/api/users/',
            watchlist: 'http://localhost:8080/api/watchlist/'
        }
    });

function config() {

}
