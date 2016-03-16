describe('Map Controller', function () {

    beforeEach(function () {
        var mockRouteFactory = {};
        module('RouteApp', function ($provide) {
            $provide.value('RouteFactory', mockRouteFactory);
        });

        mockRouteFactory.selectRoutePartByLatLngs = function (routePoint) {
            console.log("mock mockRouteTableController.selectRoutePartByLatLngs was called with routePart" + routePoint);
        };

        mockRouteFactory.saveRoutePartByLatLngs = function (routePartArray) {
            console.log("mock mockRouteTableController.saveRoutePartByLatLng was called with routePart" + routePartArray);
        };
    });

    beforeEach(inject(function ($rootScope, $controller, _RouteFactory_) {
        scope = $rootScope.$new();
        RouteFactory = _RouteFactory_;
        MapController = $controller('MapController', {
            $scope: scope,
            routeFactory: RouteFactory
        });
    }));

    it('should call save RoutePart on RouteFactory when two points added to Map', function () {
        spyOn(RouteFactory, 'saveRoutePartByLatLngs');
        scope.onMapClick({lat:"11.11", lng:"11.11"});
        scope.onMapClick({lat:"22.22", lng:"22.22"});
        expect(RouteFactory.saveRoutePartByLatLngs).toHaveBeenCalledWith(
            {
                from: {lat: "11.11", lng: "11.11"},
                to: {lat: "22.22", lng: "22.22"}
            });

        scope.onMapClick({lat:"33.33", lng:"33.33"});
        expect(RouteFactory.saveRoutePartByLatLngs).toHaveBeenCalledWith(
            {
                from: {lat: "22.22", lng: "22.22"},
                to: {lat: "33.33", lng: "33.33"}
            });

        scope.onMapClick({lat:"44.44", lng:"44.44"});
        expect(RouteFactory.saveRoutePartByLatLngs).toHaveBeenCalledWith(
            {
                from: {lat: "33.33", lng: "33.33"},
                to: {lat: "44.44", lng: "44.44"}
            });
    });

    it('it should set focus in RouteFactory when point in Map selected', function () {
        spyOn(RouteFactory, 'selectRoutePartByLatLngs');
        //select Point
        scope.onMapSelectRoutePartByLatLngs({lat: "11.11", lng: "11.11"});
        expect(RouteFactory.selectRoutePartByLatLngs).toHaveBeenCalledWith({lat: "11.11", lng: "11.11"});
    });

    it('it should set focus to selected RoutePart in RouteFactory when path in Map selected', function () {
        //spyOn(RouteFactory, 'saveRoutePartByLatLngsByLatLng');
        ////select RoutePart
        //var routePart = [{lat: "11.11", lng: "11.11"}, {lat: "22.22", lng: "22.22"}];
        //
        //scope.onMapselectRoutePartByLatLngs(routePart);
        //expect(RouteFactory.selectRoutePartByLatLngs).toHaveBeenCalledWith(routePart);
        fail('not implemented yet');
    });

})
;



