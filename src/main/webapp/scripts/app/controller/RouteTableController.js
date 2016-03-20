mapApp.controller('RouteTableController', function ($scope, RouteDataService) {

    $scope.route = RouteDataService.getRoute();
    $scope.newDescription, $scope.newImage;

    $scope.routeDataService = RouteDataService;

    $scope.selectedRow = null;

    $scope.titel = function () {
        return $scope.route.titel;
    };

    $scope.getNumberOfRouteParts = function () {
        return $scope.route.getRouteParts().length;
    };

    $scope.getRouteParts = function() {
        return $scope.route.getRouteParts();
    };


    $scope.saveRoutePartByName = function (cities) {
        if (arguments.length == 1) {
            RouteDataService.saveRoutePartByName(cities);
        } else {
            RouteDataService.saveRoutePartByName(arguments[0], arguments[1]);
        }

        //$scope.route.addRoutePart(new RoutePart(
        //    new Content($scope.newDescription, $scope.newImage), new GeoCoordinates(arguments)));
    };

    $scope.selectRoutePoint = function () {

    };

    $scope.onSelectRoutePart = function(index) {
        $scope.selectedRow = index;
        $scope.routeDataService.selectRoutePart(index);
    };

    $scope.deleteRow = function (content) {
        // var index = $scope.rows.indexOf(content);
        // if (index > -1) {
        //     $scope.rows.splice(index, 1);
        // }
    };

});

