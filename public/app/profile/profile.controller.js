angular
    .module('movie-store')
    .controller('ProfileController', ['$window', 'UserService', 'orderByFilter', function ($window, UserService, orderByFilter){
        
        var vm = this;
            vm.user_id = $window.localStorage.getItem('id');
            vm.reverse = true;

        UserService.getUser(vm.user_id)
            .then(function (response) {
                vm.profile = response;
                $window.localStorage.setItem('watchlist', response.watchlist);
            })
            .then(function () {
                UserService.getWatchList(vm.user_id)
                    .then(function (response) {
                        vm.watchlist = response;
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            })
            .catch(function (err) {
                console.log(err);
            });


        vm.removeMovieFromWatchList = function(_id){
            UserService.removeMovieFromWatchList(vm.user_id, _id)
                .then(function () {
                    UserService.getWatchList(vm.user_id)
                        .then(function (response) {
                            vm.watchlist = response;
                        })
                        .catch(function (err) {
                            console.log(err);
                        })
                })
                .catch(function (err) {
                    console.log(err);
                })
        };

        vm.orderByMe = function (propertyName) {
            vm.reverse = (propertyName !== null && vm.propertyName === propertyName)
                ? !vm.reverse : false;
            vm.propertyName = propertyName;
            vm.watchlist = orderByFilter(vm.watchlist, vm.propertyName, vm.reverse);
        };

    }]);
