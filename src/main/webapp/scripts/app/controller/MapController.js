mapApp.controller('MapController', function ($scope, RouteDataService) {
    $scope.routeDataService = RouteDataService;

    $scope.numberOfmarkers = 0;
    $scope.selectionIndex = RouteDataService.getCurrentlySelectedRouteTableEntry();

    angular.extend($scope, {
        //bounds: $scope.regions.sydney,
        center: {
            lat: 51.505,
            lng: -0.09,
            zoom: 8
        },
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

        var marker = {
            lat: leafEvent.latlng.lat,
            lng: leafEvent.latlng.lng,
            draggable: false
        };

        //marker.on('leafletDirectiveMarker.click', function() {console.log("Clicked on" + leafEvent.latlng.lat)});

        $scope.markers.push(marker);
        ++$scope.numberOfmarkers;
        if (!$scope.routeDataService.isEventToIgnore(leafEvent.originalEvent.timeStamp)) {
            console.log("----------> $scope.onMapClick({lat: " + leafEvent.latlng.lat + ", lng: " + leafEvent.latlng.lng + "})");
            $scope.onMapClick({lat: leafEvent.latlng.lat, lng: leafEvent.latlng.lng});
        }
    });

    $scope.$on('leafletDirectiveMarker.click', function (e, args) {
        $scope.onMapSelectRouteElementByLatLng({lat:args.model.lat, lng:args.model.lng});
    });
});

//http://tombatossals.github.io/angular-leaflet-directive/examples/0000-viewer.html#/basic/first-example
