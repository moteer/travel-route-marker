'use strict';

angular.module('travel-route-marker-app', [
    'ngRoute',
    'route-map'
])

    .config(function ($routeProvider, $compileProvider) {
        $compileProvider.debugInfoEnabled(false);
        $routeProvider
            .when('/', {
                template: '<h2>load the route list here </h2><routelist></routelist>'
            }).otherwise({redirectTo: 'js/components/map/route/routelist.html'});
    })

angular.module('route-map', []);
