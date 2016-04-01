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


    //TODO: MEMOIZE function properly
    function isSecondEventToIgnore(key) {
        var currentTime = new Date().getTime();
        var toIgnore = true;
        if (!isSecondEventToIgnore.prevTime) {
            isSecondEventToIgnore.prevTime = {};
        }
        console.log("isSecondEventToIgnore.prevTime === null  -> " + (isSecondEventToIgnore.prevTime[key] == null));
        console.log("(currentTime - isSecondEventToIgnore.prevTime)  -> " + (currentTime - isSecondEventToIgnore.prevTime[key]));

        if (isSecondEventToIgnore.prevTime[key] == null || (currentTime - isSecondEventToIgnore.prevTime[key]) > 5000) {
            toIgnore = false;
        }
        isSecondEventToIgnore.prevTime[key] = currentTime;

        return toIgnore;
    }

    $scope.markers = new Array();
    $scope.$on("leafletDirectiveMap.click", function (event, args) {
        var leafEvent = args.leafletEvent;

        if (!isSecondEventToIgnore("something")) {
            $scope.markers.push({
                lat: leafEvent.latlng.lat,
                lng: leafEvent.latlng.lng,
                draggable: false
            });
            ++$scope.numberOfmarkers;
            console.log("----------> $scope.onMapClick({lat: "+ leafEvent.latlng.lat + ", lng: "+ leafEvent.latlng.lng +"})");
            $scope.onMapClick({lat: leafEvent.latlng.lat, lng: leafEvent.latlng.lng});
        }
    });


});
