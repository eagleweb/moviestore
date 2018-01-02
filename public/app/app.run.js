angular
    .module('movie-store')
    .run(function(authManager) {

        authManager.checkAuthOnRefresh();

        authManager.redirectWhenUnauthenticated();

    });