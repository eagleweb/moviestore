angular
    .module('movie-store')
    .controller('MovieInfoController', ['$rootScope', '$state', 'movieData', 'UserService', function ($rootScope, $state, movieData, UserService){
        var vm = this;
            vm.data = movieData;
            vm.user_id = localStorage.getItem('id');

        if ($rootScope.isAuthenticated){
            UserService.getUser(vm.user_id)
                .then(function (response) {
                    var store = {};
                    for (var i = 0; i < response.watchlist.length; i++) {
                        var key = response.watchlist[i];
                        store[key] = true;
                    }
                    return vm.ismovieinwatchlist = store[vm.data._id];
                });
        }

        vm.addMovieToWatchList = function(){
            UserService.addMovieToWatchList(vm.user_id, vm.data._id)
                .then(function (response) {
                    if (response.success === true) {
                        vm.ismovieinwatchlist = true;
                    } else console.log(response.message);
                })
        };

        vm.removeMovieFromWatchList = function(){
            UserService.removeMovieFromWatchList(vm.user_id, vm.data._id)
                .then(function (response) {
                    if (response.success === true) {
                        vm.ismovieinwatchlist = false;
                    } else console.log(response.message);
                })
        };

        //search

        vm.Search = function (searchPhrase) {
            $rootScope.searchPhrase = searchPhrase;
            $state.go('search');
        };

        //gallery function

        vm.openModal = function (number) {
            slideIndex = number;
            document.getElementById('gallery-modal').style.display = "block";
        };

        vm.closeModal = function () {
            document.getElementById('gallery-modal').style.display = "none";
        };

        vm.plusSlides = function (n) {
            vm.showSlides(slideIndex += n);
        };

        var slideIndex = 1;

        vm.currentSlide = function (n) {
            vm.showSlides(slideIndex = n);
        };

        vm.showSlides = function (n) {
            var i;
            var slides = document.getElementsByClassName("gallery-slide");
            if (n > slides.length) {slideIndex = 1}
            if (n < 1) {slideIndex = slides.length}
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
            slides[slideIndex-1].style.display = "block";
        };

        vm.showSlides(slideIndex);

    }]);
        