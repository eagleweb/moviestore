angular
    .module('movie-store')
    .controller('MainController', [ function (){
        var vm = this;
        var myIndex = 0;

        vm.carousel = function () {
            var i;
            var x = document.getElementsByClassName("slide");
            for (i = 0; i < x.length; i++) {
                x[i].style.display = "none";
            }
            myIndex++;
            if (myIndex > x.length) {myIndex = 1}
            x[myIndex-1].style.display = "block";
            setTimeout(vm.carousel, 7000);
        };

        vm.carousel();

    }]);
