mapApp.controller('MapController', function ($scope, RouteDataService) {

    angular.extend($scope, {
        //bounds: $scope.regions.sydney,
        center: {},
        defaults: {
            scrollWheelZoom: false
        },
        events: {
            map: {
                enable: ['click'],
                logic: 'emit'
            }
        }
    });

    $scope.from;
    $scope.to;
    $scope.routeDataService = RouteDataService;

    $scope.onMapClick = function (latLng) {
        if ($scope.routeDataService.getRoute() !== null) {
        var newRoutePoint = new RoutePoint(new LatLng(latLng, null), null, null);
            $scope.routeDataService.saveRoutePointByLatLng(newRoutePoint);

            if ($scope.from !== undefined) {
                if ($scope.to !== undefined) {
                    $scope.from = $scope.to;
                }
                $scope.to = newRoutePoint;

                $scope.routeDataService.saveRoutePointByLatLng($scope.to, newRoutePoint)

            } else {
                $scope.from = newRoutePoint;
            }
        }
    };

    $scope.onMapSelectRouteElementByLatLng = function (routePoint) {
        $scope.routeDataService.selectRoutePointByLatLngs(routePoint);
    };

    $scope.onMapSelectRouteElementsByLatLng = function (routePoint) {
        $scope.routeDataService.selectRouteSectionByLatLngs(routePoint);
    };


    $scope.markers = new Array();
    $scope.$on("leafletDirectiveMap.click", function (event, args) {
        var leafEvent = args.leafletEvent;
        $scope.markers.push({
            lat: leafEvent.latlng.lat,
            lng: leafEvent.latlng.lng,
            draggable: true
        });
        $scope.onMapClick({lat: leafEvent.latlng.lat, lng: leafEvent.latlng.lng});
    });


});
