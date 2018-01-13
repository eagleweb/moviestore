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

                .state('search', {
                    url: '/search',
                    onExit: function($rootScope){
                        $rootScope.searchPhrase = ' ';
                    },
                    views: {
                        '': {
                            templateUrl: 'app/search/search.html',
                            controller: 'SearchController as search'
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

                .state('store', {
                    url: '/{type}/{genre}',
                    data: {
                        displayName: '{{$stateParams.type | uppercase}} / {{$stateParams.genre | uppercase}}'
                    },
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
                    },
                    data: {
                        displayName: '{{ movieData.Type | uppercase}} / {{ movieData.Title}}'
                    }
                });

            $locationProvider.html5Mode(true);

            $urlRouterProvider.otherwise('/');
        });
