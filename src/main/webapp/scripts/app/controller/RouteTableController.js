mapApp.controller('RouteTableController', function ($scope, RouteFactory) {

    $scope.route = RouteFactory.getRoute();
    $scope.newDescription, $scope.newImage;

    $scope.routeFactory = RouteFactory;

    $scope.titel = function () {
        return $scope.route.titel;
    };

    $scope.getNumberOfRouteParts = function () {
        return $scope.route.getRouteParts().length;
    };

    $scope.getRouteParts = function() {
        return $scope.route.getRouteParts();
    };


    $scope.saveRoutePart = function (cities) {
        if (arguments.length == 1) {
            RouteFactory.saveRoutePartByName(cities);
        } else {
            RouteFactory.saveRoutePartByName(arguments[0], arguments[1]);
        }

        //$scope.route.addRoutePart(new RoutePart(
        //    new Content($scope.newDescription, $scope.newImage), new GeoCoordinates(arguments)));
    };

    $scope.selectRoutePoint = function () {

    };

    $scope.selectRoutePart = function () {

    };

    $scope.deleteRow = function (content) {
        // var index = $scope.rows.indexOf(content);
        // if (index > -1) {
        //     $scope.rows.splice(index, 1);
        // }
    };

});

