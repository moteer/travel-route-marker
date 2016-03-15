mapModule.controller('MapController', function ($scope, routeTableController) {
    $scope.from;
    $scope.to;

    $scope.onMapClick = function (latLng) {

        if ($scope.from !== undefined) {
            if ($scope.to !== undefined) {
                $scope.from = $scope.to;
            }
            $scope.to = latLng;

            routeTableController.saveRoutePart(
                {from: {lng: $scope.from.lng, lat: $scope.from.lat},
                    to: {lng: $scope.to.lng, lat: $scope.to.lat}});
        } else {
            $scope.from = latLng;
        }
    };

    $scope.onMapSelectPoint = function (latLng) {
        routeTableController.selectRoutePoint(latLng);
    };

    $scope.onMapSelectRoutePart= function (routePartArray) {
        routeTableController.selectRoutePart(routePartArray);
    };
});

