var mapApp = angular.module('RouteApp', ['ngRoute']);


//Routes
mapApp.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            controller: 'RouteTableController',
            templateUrl: '/route'
        }).when('/map', {
            controller: 'MapController',
            templateUrl: '/map/leaflet'
        }).otherwise({redirectTo: '/'});
});
