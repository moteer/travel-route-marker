mapApp.controller('MapController', ["$scope", "RouteDataService", "leafletData", "$modal", "$rootScope",
    function ($scope, RouteDataService, leafletData, $modal, $rootScope) {
        $scope.routeDataService = RouteDataService;

        $scope.numberOfmarkers = 0;
        $scope.selectionIndex;
        $scope.newMarkerTitel;
        $scope.newMarkerPlace;
        $scope.currentSelectedItem;

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
                draggable: true,
                compileMessage: true,
                message: "<div ng-include src=\"'/app/partials/templates/marker-popup.html'\"></div>",
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

        $scope.addDragableMarker = function (routePoint) {
            var city = routePoint.getLatLng().city
            leafletData.getMap().then(function (map) {
                var marker = {
                    name: city,
                    lat: map.getCenter().lat,
                    lng: map.getCenter().lng,
                    draggable: true,
                    compileMessage: true,
                    message: "<div ng-include src=\"'/app/partials/templates/marker-popup.html'\"></div>",
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
                routePoint.getLatLng().lat = marker.lat;
                routePoint.getLatLng().lng = marker.lng;
                $scope.markers.push(marker);
                addPath(marker);
            });
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
                    weight: 5,
                    //compileMessage: true,
                    //message: "<div ng-include src=\"'/app/partials/templates/marker-popup.html'\"></div>",
                    //getMessageScope: function () {
                    //    var popupScope = $scope.$new(true);
                    //    popupScope.titel = $scope.newMarkerTitel;
                    //    popupScope.place = $scope.newMarkerPlace;
                    //
                    //    popupScope.$on("current.selection.updated", function () {
                    //        popupScope.titel = $scope.newMarkerTitel;
                    //        popupScope.place = $scope.newMarkerPlace;
                    //    });
                    //
                    //    popupScope.onClickSaveButton = function () {
                    //        closePopups();
                    //    };
                    //
                    //    return popupScope;
                    //},
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
            var leafletEvent = args.leafletEvent;
            if (!$scope.routeDataService.isEventToIgnore(leafletEvent.originalEvent.timeStamp)) {
                $scope.onMapSelectRouteElementByLatLng(new LatLng({lat: args.model.lat, lng: args.model.lng}, null));
            }
        });

        $scope.$on('leafletDirectivePath.click', function (e, path) {
            var leafletEvent = path.leafletEvent;
            if (!$scope.routeDataService.isEventToIgnore(leafletEvent.originalEvent.timeStamp)) {
                var fromLatLng = path.leafletObject.getLatLngs()[0];
                var toLatLng = path.leafletObject.getLatLngs()[1];
                $scope.onMapSelectRouteElementsByLatLng([fromLatLng, toLatLng]);
            }
        });

        $scope.$on('routepoint.added', function (e, routePoint) {
            if (routePoint.getLatLng().lat === undefined || routePoint.getLatLng().lng === undefined) {
                $scope.addDragableMarker(routePoint);
            }
        });

        $scope.$on('leafletDirectiveMarker.dragend', function (e, leafletObject) {
            console.log(e);
            console.log("LAT: " + leafletObject.model.lat);
            console.log("LNG: " + leafletObject.model.lng);
            console.log("MARKER ID: " + leafletObject.modelName);
            $scope.handleMarkerDrag(leafletObject.modelName, leafletObject.model.lat, leafletObject.model.lng);
        });


        $scope.rearangePathsAttachedTo = function (markerId, lat, lng) {
            if ($scope.paths.length > 0) {
                if (markerId > 0) {
                    var pathTowardsPoint = $scope.paths[markerId - 1];
                    if (pathTowardsPoint !== null && pathTowardsPoint !== undefined) {
                        pathTowardsPoint.latlngs[1].lat = lat;
                        pathTowardsPoint.latlngs[1].lng = lng;
                    }
                }
                var pathFromPoint = $scope.paths[markerId];
                if (pathFromPoint !== null && pathFromPoint !== undefined) {
                    pathFromPoint.latlngs[0].lat = lat;
                    pathFromPoint.latlngs[0].lng = lng;
                }
            }
        };

        $scope.handleMarkerDrag = function (markerId, lat, lng) {
            RouteDataService.changeMarkerPosition(markerId, lat, lng);
            $scope.markers[markerId].lat = lat;
            $scope.markers[markerId].lng = lng;
            $scope.rearangePathsAttachedTo(markerId, lat, lng);
        };

        $scope.saveTitleAndPlace = function (newMarkerTitel, newMarkerPlace) {
            console.log("newMarkerTitel: " + newMarkerTitel + " | newMarkerPlace: " + newMarkerPlace);
            $scope.newMarkerTitel = newMarkerTitel;
            $scope.newMarkerPlace = newMarkerPlace;
            $scope.routeDataService.saveTitelAndPlaceForCurrentSelection($scope.newMarkerTitel, $scope.newMarkerPlace);
        };

        $scope.$on('modal.save', function (e, selected) {
            $scope.selected = selected;
            RouteDataService.getCurrentlySelectedRouteTableEntry().getLatLng().city = selected.city;
            RouteDataService.getCurrentlySelectedRouteTableEntry().getContent().titel = selected.titel;
            RouteDataService.getCurrentlySelectedRouteTableEntry().getContent().description = selected.description;
        });
    }]);
