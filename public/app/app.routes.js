angular
    .module('movie-store')
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
            $stateProvider
                .state('home', {
                    url: '/',
                    views: {
                        'content': {
                            templateUrl: 'main/home.html'
                        }
                    }
                })

                .state('category', {
                    url: '/{type}/{genre}',
                    views: {
                        'content': {
                            templateUrl: 'web-app/web-app.html'
                            // controller: 'MovieCategoryCtrl',
                            // controllerAs: 'category',
                            // resolve: {
                            //     categoryPrepService:  function(MovieService, $stateParams){
                            //         return MovieService.getMoviesByType({type: $stateParams.type, genre: $stateParams.genre, page: 1});
                            //     }
                            // }
                        }
                    }
                });

                // .state('movie', {
                //    url: '/{movie_id}',
                //    views: {
                //        'content': {
                //            templateUrl: 'movie/movie-info/movie-info.html',
                //            controller: 'MovieInfoCtrl',
                //            controllerAs: 'movie',
                //            resolve: {
                //                moviePrepService:  function($stateParams, MovieService){
                //                    return MovieService.getMovieByID({_id: $stateParams.movie_id});
                //                }
                //            }
                //        }
                //    }
                // });

            $locationProvider.html5Mode(true);
            console.log("rout");
            $urlRouterProvider.otherwise('/');
        });
