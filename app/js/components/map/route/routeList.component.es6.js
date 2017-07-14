/* global angular */
(function () {
    'use strict';
    console.log("Controller called hier 1235678!");

    angular
        .module('route-map')
        .component('routelist', {
            controller: RouteListController,
            controllerAs: 'vm',
            templateUrl: 'js/components/map/route/routelist.html',
            bindings: {}
        });

    function RouteListController() {
        let vm = this;
        console.log("Controller called!");

        vm.routes = [
            {name: "EINS"},
            {name: "ZWEI"}
        ];

    }
})();
