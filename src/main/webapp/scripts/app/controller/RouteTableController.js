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

    $scope.getNumberOfRouteParts = function () {
        return $scope.routeDataService.getNumberOfRouteParts();
    };

    $scope.getRouteParts = function() {
        return $scope.routeDataService.getRouteParts();
    };

    $scope.addRoutePart = function () {
        if ($scope.routeDataService.getRoute() !== null && $scope.newCity !== null) {
            $scope.saveRoutePartByName($scope.newCity);
        }
    };

    $scope.saveRoutePartByName = function (cities) {
        if (arguments.length == 1) {
            RouteDataService.saveRoutePartByName(cities);
        } else {
            RouteDataService.saveRoutePartByName(arguments[0], arguments[1]);
        }
    };

    $scope.onSelectRoutePart = function(index) {
        $scope.selectedRow = index;
        $scope.routeDataService.selectRoutePart(index);
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

