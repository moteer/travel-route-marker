mapApp.controller('RouteTableController', function ($scope, RouteDataService) {

    $scope.routeDataService = RouteDataService;

    $scope.selectedRow = null;

    $scope.newTitel,
        $scope.newDescription,
        $scope.newImage,
        $scope.newCity;

    $scope.createNewRoute = function () {
        $scope.routeDataService.createNewRoute($scope.newTitel);
    };

    $scope.getTitel = function () {
        return $scope.routeDataService.getTitel();
    };

    $scope.addRoutePoint = function () {
            console.log($scope.newCity + " saved to route");
        if ($scope.routeDataService.getRoute() !== null && $scope.newCity !== null) {
            $scope.saveRoutePointByName($scope.newCity);
            console.log("route: " + $scope.routeDataService.route);

        }
    };

    $scope.saveRoutePointByName = function (cities) {
        if (arguments.length === 1) {
            RouteDataService.saveRoutePointByName(new LatLng(null, cities), new Content(null, null), new TimePeriod(null));
        } else {
            RouteDataService.saveRoutePointByName(arguments[0], arguments[1]);
        }
    };

    $scope.onSelectTableEntry = function (index) {
        $scope.selectedRow = index;
        $scope.routeDataService.selectRouteTableEntry(index);
    };

    $scope.onResetSelection = function () {
        $scope.selectedRow = null;
        $scope.routeDataService.resetCurrentSelection();
    };

    $scope.deleteRow = function (content) {
        // var index = $scope.rows.indexOf(content);
        // if (index > -1) {
        //     $scope.rows.splice(index, 1);
        // }
    };

});

