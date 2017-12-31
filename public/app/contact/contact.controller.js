angular
    .module('movie-store')
    .controller('ContactController', [ function (){
        var vm = this;

        vm.initMap = function () {
            var vinnitsa = {lat: 49.2336106, lng: 28.4704685};
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 16,
                scrollwheel: false,
                center: vinnitsa
            });
            var marker = new google.maps.Marker({
                position: vinnitsa,
                map: map
            });
        };

        vm.initMap();
    }]);