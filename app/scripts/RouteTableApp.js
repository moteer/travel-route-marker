var mapApp = angular.module('RouteApp',
    ['ngRoute',
        'leaflet-directive',
        'mm.foundation',
        'mm.foundation.tpls'
        //,
        //"template/modal/backdrop.html",
        //"template/popover/popover.html",
        //"template/modal/window.html"
    ]);


//Routes
mapApp.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            //controller: 'MapController',
            templateUrl: 'partials/map/leaflet.html'
        }).otherwise({redirectTo: 'partials/map/leaflet.html'});
});
