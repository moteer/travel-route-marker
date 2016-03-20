mapApp.controller('MapController', function ($scope, RouteDataService) {
    angular.extend($scope, {
        defaults: {
            scrollWheelZoom: false
        }
    });
    $scope.from;
    $scope.to;
    $scope.routeDataService = RouteDataService;

    $scope.onMapClick = function (latLng) {

        if ($scope.from !== undefined) {
            if ($scope.to !== undefined) {
                $scope.from = $scope.to;
            }
            $scope.to = latLng;

            $scope.routeDataService.saveRoutePartByLatLngs(
                {from: {lng: $scope.from.lng, lat: $scope.from.lat},
                    to: {lng: $scope.to.lng, lat: $scope.to.lat}});
        } else {
            $scope.from = latLng;
        }
    };

    $scope.onMapSelectRoutePartByLatLngs = function (routePartArray) {
        $scope.routeDataService.selectRoutePartByLatLngs(routePartArray);
    };
});
