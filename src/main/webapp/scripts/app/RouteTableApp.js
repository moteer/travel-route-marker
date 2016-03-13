var routeTableApp = angular.module('RouteTableApp', ['ngRoute']);

//Routes
routeTableApp.config(function ($routeProvider) {
    $routeProvider
        .when('/',
        {
            controller: 'RouteTableController',
            templateUrl: '/route'
        }).otherwise({ redirectTo: '/'});
});
