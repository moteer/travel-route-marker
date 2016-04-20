mapApp.controller('MapController', ["$scope", "RouteDataService", function ($scope, RouteDataService) {
    $scope.routeDataService = RouteDataService;

    $scope.numberOfmarkers = 0;
    $scope.selectionIndex;
    $scope.newMarkerTitel;
    $scope.newMarkerPlace;
    $scope.currentSelectedItem


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

    $scope.$on("current.selection.updated", function (e, newSelectedIndex, newSelectedItem) {
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~     current.selection.updated has been event received by MapController")
        if (newSelectedIndex !== undefined && newSelectedItem !== undefined) {
            $scope.selectionIndex = newSelectedIndex;
            if (newSelectedItem instanceof RoutePoint) {
                $scope.newMarkerTitel = newSelectedItem.getContent().getTitel();
                $scope.newMarkerPlace = newSelectedItem.getLatLng().getCity();
            }
            $scope.currentSelectedItem = newSelectedItem.toString();
        }
    });

    $scope.markers = new Array();

    $scope.$on("leafletDirectiveMap.click", function (event, args) {
        var leafEvent = args.leafletEvent;

        var marker = {
            lat: leafEvent.latlng.lat,
            lng: leafEvent.latlng.lng,
            draggable: false,
            message: "<div ng-include src=\"'/newMarkerTemplate'\"></div>"
        };

        //marker.on('leafletDirectiveMarker.click', function() {console.log("Clicked on" + leafEvent.latlng.lat)});

        $scope.markers.push(marker);
        ++$scope.numberOfmarkers;
        if (!$scope.routeDataService.isEventToIgnore(leafEvent.originalEvent.timeStamp)) {
            console.log("----------> $scope.onMapClick({lat: " + leafEvent.latlng.lat + ", lng: " + leafEvent.latlng.lng + "})");
            $scope.onMapClick(new LatLng({lat: leafEvent.latlng.lat, lng: leafEvent.latlng.lng}, null));
        }
    });

    $scope.$on('leafletDirectiveMarker.click', function (e, args) {
        var leafEvent = args.leafletEvent;
        if (!$scope.routeDataService.isEventToIgnore(leafEvent.originalEvent.timeStamp)) {
            $scope.onMapSelectRouteElementByLatLng(new LatLng({lat: args.model.lat, lng: args.model.lng}, null));
        }
    });

    $scope.saveTitelAndPlace = function () {
        $scope.routeDataService.saveTitelAndPlaceForCurrentSelection($scope.newMarkerTitel, $scope.newMarkerPlace);
    };
}]);

//http://tombatossals.github.io/angular-leaflet-directive/examples/0000-viewer.html#/basic/first-example
