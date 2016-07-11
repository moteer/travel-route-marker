var mapApp = angular.module('RouteApp',
    ['ngRoute',
        'leaflet-directive',
        'mm.foundation'
    ]);


mapApp.config(function ($routeProvider, $compileProvider) {
    $compileProvider.debugInfoEnabled(false);
    $routeProvider
        .when('/', {
            templateUrl: 'partials/map/leaflet.html'
        }).otherwise({redirectTo: 'partials/map/leaflet.html'});
});
