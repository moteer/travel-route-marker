mapApp.controller('MapController', function ($scope, RouteFactory) {
    $scope.from;
    $scope.to;
    $scope.routeFactory = RouteFactory;

    $scope.onMapClick = function (latLng) {

        if ($scope.from !== undefined) {
            if ($scope.to !== undefined) {
                $scope.from = $scope.to;
            }
            $scope.to = latLng;

            $scope.routeFactory.saveRoutePartByLatLngs(
                {from: {lng: $scope.from.lng, lat: $scope.from.lat},
                    to: {lng: $scope.to.lng, lat: $scope.to.lat}});
        } else {
            $scope.from = latLng;
        }
    };

    $scope.onMapSelectRoutePartByLatLngs = function (routePartArray) {
        $scope.routeFactory.selectRoutePartByLatLngs(routePartArray);
    };
});
