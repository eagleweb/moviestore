angular
    .module('movie-store')
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
            $stateProvider
                .state('home', {
                    url: '/',
                    views: {
                        '': {
                            templateUrl: 'app/main/home.html',
                            controller: 'MainController as main'
                        }
                    }
                })

                .state('login', {
                    url: '/login',
                    views: {
                        '': {
                            templateUrl: 'app/login/login.html',
                            controller: 'LoginController as login'
                        }
                    }
                })

                .state('register', {
                    url: '/register',
                    views: {
                        '': {
                            templateUrl: 'app/register/register.html',
                            controller: 'RegisterController as register'
                        }
                    }
                })

                .state('search', {
                    url: '/search',
                    onExit: function($rootScope){
                        $rootScope.searchPhrase = null;
                    },
                    views: {
                        '': {
                            templateUrl: 'app/search/search.html',
                            controller: 'SearchController as search'
                        }
                    }
                })

                .state('contact', {
                    url: '/contact',
                    views: {
                        '': {
                            templateUrl: 'app/contact/contact.html',
                            controller: 'ContactController as contact'
                        }
                    }
                })

                .state('profile', {
                    url: '/profile',
                    views: {
                        '': {
                            templateUrl: 'app/profile/profile.html',
                            controller: 'ProfileController as user'
                        }
                    }
                })

                .state('add-movie', {
                    url: '/add-movie',
                    views: {
                        '': {
                            templateUrl: 'app/add-movie/add-movie.html',
                            controller: 'AddMovieController as addmovie'
                        }
                    }
                })

                .state('store', {
                    url: '/{type}/{genre}',
                    views: {
                        '': {
                            templateUrl: 'app/web-app/web-app.html',
                            controller: 'MovieController as movie',
                            resolve: {
                                moviesListData:  function(MovieService, $stateParams){
                                    return MovieService.getMoviesByType({type: $stateParams.type, genre: $stateParams.genre, page: 1});
                                }
                            }
                        }
                    }
                })

                .state('movie', {
                   url: '/{movie_id}',
                   views: {
                       '': {
                           templateUrl: 'app/web-app/movie-info/movie-info.html',
                           controller: 'MovieInfoController as movie'
                       }
                   },
                    resolve: {
                        movieData:  function($stateParams, MovieService){
                            return MovieService.getMovieByID($stateParams.movie_id);
                        }
                    }
                });

            $locationProvider.html5Mode(true);

            $urlRouterProvider.otherwise('/');
        });
