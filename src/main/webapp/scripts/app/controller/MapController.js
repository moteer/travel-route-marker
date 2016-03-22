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
        $scope.routeDataService.saveRoutePointByLatLng(latLng);

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

    $scope.markers = new Array();
    $scope.$on("leafletDirectiveMap.click", function(event, args){
        var leafEvent = args.leafletEvent;
        $scope.markers.push({
            lat: leafEvent.latlng.lat,
            lng: leafEvent.latlng.lng,
            draggable: true
        });
        $scope.onMapClick({lat:leafEvent.latlng.lat, lng:leafEvent.latlng.lng});
    });


});
