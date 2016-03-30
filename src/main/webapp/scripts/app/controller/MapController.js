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
    $scope.routeDataService = RouteDataService;

    $scope.onMapClick = function (latLng) {
        if ($scope.routeDataService.getRoute() !== null) {
            var newRoutePoint = new RoutePoint(new LatLng(latLng, null), new Content(null, null), new TimePeriod(null));
            $scope.routeDataService.saveRoutePointByLatLng(newRoutePoint);

            var lastRouteTableEntry = $scope.routeDataService.getLastRouteTableEntry();
            if (lastRouteTableEntry !== null) {
                $scope.routeDataService.saveRouteSectionByLatLngs(lastRouteTableEntry, newRoutePoint, new Content(null, null)) ;
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
