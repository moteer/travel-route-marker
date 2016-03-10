var editableRoutePartTableApp = angular.module('editableRoutePartTableApp', ['ngRoute']);

//Routes
editableRoutePartTableApp.config(function ($routeProvider) {
    $routeProvider
        .when('/',
        {
            controller: 'EditableRoutePartTableController',
            templateUrl: '/routeparts'
        }).otherwise({ redirectTo: '/'});
});
