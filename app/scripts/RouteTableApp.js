var mapApp = angular.module('RouteApp', ['ngRoute', 'leaflet-directive']);


//Routes
mapApp.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            controller: 'MapController',
            templateUrl: 'partials/map/leaflet.html'
        }).otherwise({redirectTo: 'partials/map/leaflet.html'});
});
