angular
    .module('movie-store')
    .controller('MainController', [ function (){
        var vm = this;
        var slideIndex = 1;

        vm.plusSlides = function (n) {
            vm.showSlides(slideIndex += n);
        };

        vm.showSlides = function (n) {
            var i;
            var slides = document.getElementsByClassName("slide");
            if (n > slides.length) {slideIndex = 1}
            if (n < 1) {slideIndex = slides.length}
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
            slides[slideIndex-1].style.display = "block";
        };

        vm.showSlides(slideIndex);

    }]);
