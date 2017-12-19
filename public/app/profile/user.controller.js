angular
    .module('movie-store')
    .controller('UserController', ['UserService', 'userData', 'orderByFilter', function (UserService, userData, orderByFilter){
        
        var vm = this;
            // vm.profile = userData;
            // vm.reverse = true;

        // UserService.getUser()
        //     .then(function (response) {
        //         vm.profile = response;
        //     })
        //     .then(function () {
        //         UserService.getWatchList(vm.profile._id)
        //             .then(function (response) {
        //                 vm.watchlist = response;
        //             })
        //             .catch(function (err) {
        //                 console.log(err);
        //             })
        //     })
        //     .catch(function (err) {
        //         console.log(err);
        //     });

        // vm.removeMovieFromWatchList = function(_id){
        //     UserService.removeMovieFromWatchList(vm.profile.identities[0].user_id, _id)
        //         .then(function () {
        //             WatchListService.getWatchList(vm.profile.identities[0].user_id)
        //                 .then(function (response) {
        //                     vm.watchlist = response;
        //                 })
        //                 .catch(function (err) {
        //                     console.log(err);
        //                 })
        //         })
        //         .catch(function (err) {
        //             console.log(err);
        //         })
        // };
        //
        // vm.orderByMe = function (propertyName) {
        //     vm.reverse = (propertyName !== null && vm.propertyName === propertyName)
        //         ? !vm.reverse : false;
        //     vm.propertyName = propertyName;
        //     vm.watchlist = orderByFilter(vm.watchlist, vm.propertyName, vm.reverse);
        // };

    }]);
