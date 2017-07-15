/* global angular */
'use strict';
(function () {

    angular
        .module('routemap')
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
