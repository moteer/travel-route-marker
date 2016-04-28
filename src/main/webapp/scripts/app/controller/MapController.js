mapApp.controller('MapController', ["$scope", "RouteDataService", "leafletData", function ($scope, RouteDataService, leafletData) {
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

    $scope.onMapSelectRouteElementsByLatLng = function (routePoints) {
        $scope.routeDataService.selectRouteSectionByLatLngs(routePoints);
    };

    var closePopups = function () {
        leafletData.getMap().then(function (map) {
            if (map._popup._isOpen) {
                map.closePopup();
            }
        });
    };

    $scope.$on("current.selection.updated", function (e, newSelectedIndex, newSelectedItem) {
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~     current.selection.updated has been event received by MapController");

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
    $scope.paths = new Array();

    var addNewMarker = function (leafEvent) {
        var marker = {
            lat: leafEvent.latlng.lat,
            lng: leafEvent.latlng.lng,
            draggable: false,
            compileMessage: true,
            message: "<div ng-include src=\"'/newMarkerTemplate'\"></div>",
            getMessageScope: function () {
                var popupScope = $scope.$new(true);
                popupScope.titel = $scope.newMarkerTitel;
                popupScope.place = $scope.newMarkerPlace;

                popupScope.$on("current.selection.updated", function () {
                    popupScope.titel = $scope.newMarkerTitel;
                    popupScope.place = $scope.newMarkerPlace;
                });

                popupScope.onClickSaveButton = function () {
                    closePopups();
                };

                return popupScope;
            }
        };
        $scope.markers.push(marker);
        return marker;
    };

    var getPrevMarker = function () {
        if ($scope.markers.length >= 2) {
            return $scope.markers[$scope.markers.length - 2];
        }
        return undefined;
    };

    var addPath = function (newMarker) {
        var path;
        var prevMarker = getPrevMarker();
        if (prevMarker !== undefined) {
            path = {
                color: '#008000',
                weight: 4,
                latlngs: [
                    {lat: prevMarker.lat, lng: prevMarker.lng},
                    {lat: newMarker.lat, lng: newMarker.lng}
                ]
            };
            $scope.paths.push(path);
        }
        return path;
    };

    $scope.$on("leafletDirectiveMap.click", function (event, args) {
        var leafEvent = args.leafletEvent;

        var marker = addNewMarker(leafEvent);
        addPath(marker);

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

    $scope.$on('leafletDirectivePath.click', function (e, path) {
        var leafEvent = path.leafletEvent;
        if (!$scope.routeDataService.isEventToIgnore(leafEvent.originalEvent.timeStamp)) {
            var fromLatLng = path.leafletObject.getLatLngs()[0];
            var toLatLng = path.leafletObject.getLatLngs()[1];
            $scope.onMapSelectRouteElementsByLatLng([fromLatLng, toLatLng]);
        }
    });


    $scope.saveTitleAndPlace = function (newMarkerTitel, newMarkerPlace) {
        console.log("newMarkerTitel: " + newMarkerTitel + " | newMarkerPlace: " + newMarkerPlace);
        $scope.newMarkerTitel = newMarkerTitel;
        $scope.newMarkerPlace = newMarkerPlace;
        $scope.routeDataService.saveTitelAndPlaceForCurrentSelection($scope.newMarkerTitel, $scope.newMarkerPlace);
    };
}]);

//http://tombatossals.github.io/angular-leaflet-directive/examples/0000-viewer.html#/basic/first-example
