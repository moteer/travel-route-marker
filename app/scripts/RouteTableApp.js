var mapApp = angular.module('RouteApp',
    ['ngRoute',
        'leaflet-directive',
        'mm.foundation',
        'mm.foundation.tpls'
    ]);


mapApp.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'partials/map/leaflet.html'
        }).otherwise({redirectTo: 'partials/map/leaflet.html'});
});
