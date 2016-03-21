mapApp.controller('RouteTableController', function ($scope, RouteDataService) {

    $scope.newDescription, $scope.newImage;

    $scope.routeDataService = RouteDataService;

    $scope.selectedRow = null;

    $scope.titel = function () {
        return $scope.routeDataService.getTitel();
    };

    $scope.getNumberOfRouteParts = function () {
        return $scope.routeDataService.getNumberOfRouteParts();
    };

    $scope.getRouteParts = function() {
        return $scope.routeDataService.getRouteParts();
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

