angular
    .module('movie-store')
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
            $stateProvider
                .state('home', {
                    url: '/',
                    views: {
                        '': {
                            templateUrl: 'app/main/home.html'
                        }
                    }
                })

                .state('profile', {
                    url: '/profile',
                    views: {
                        '': {
                            templateUrl: 'app/profile/profile.html',
                            controller: 'UserController as user'
                        }
                    },
                    resolve: {
                        // userData:  function(UserService){
                        //     return UserService.getUser();
                        // }
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
                            controller: 'MovieCtrl as movie',
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
                           controller: 'MovieInfoCtrl as movie'
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
