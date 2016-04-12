mapApp.controller('MapController', function ($scope, RouteDataService) {
    $scope.numberOfmarkers = 0;

    angular.extend($scope, {
        //bounds: $scope.regions.sydney,
        center: {},
        defaults: {
            scrollWheelZoom: false
        },
        events: {
            map: {
                //enable: ['click'],
                logic: 'emit'
            }
        }
    });
    $scope.routeDataService = RouteDataService;

    $scope.onMapClick = function (latLng) {
        if ($scope.routeDataService.getRoute() !== null) {
            $scope.routeDataService.saveRoutePointByLatLng(latLng);
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
            draggable: false
        });
        ++$scope.numberOfmarkers;
        if (!$scope.routeDataService.isEventToIgnore(leafEvent.originalEvent.timeStamp)) {
            console.log("----------> $scope.onMapClick({lat: " + leafEvent.latlng.lat + ", lng: " + leafEvent.latlng.lng + "})");
            $scope.onMapClick({lat: leafEvent.latlng.lat, lng: leafEvent.latlng.lng});
        }
    });
});
