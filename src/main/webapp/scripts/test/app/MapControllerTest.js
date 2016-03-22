describe('Map Controller', function () {

    beforeEach(function () {
        var mockRouteDataService = {};
        module('RouteApp', function ($provide) {
            $provide.value('RouteDataService', mockRouteDataService);
        });

        mockRouteDataService.selectRoutePartByLatLngs = function (routePoint) {
            console.log("mock mockRouteTableController.selectRoutePartByLatLngs was called with routePart" + routePoint);
        };

        mockRouteDataService.saveRoutePartByLatLngs = function (routePartArray) {
            console.log("mock mockRouteTableController.saveRoutePartByLatLng was called with routePart" + routePartArray);
        };

        mockRouteDataService.saveRoutePointByLatLng = function (routePoint) {
            console.log("mock mockRouteTableController.saveRoutePointByLatLng was called with routePart" + routePoint);
        };

        mockRouteDataService.getRoute = function () {
            console.log("mock mockRouteTableController.getRoute was called");
        };
    });

    beforeEach(inject(function ($rootScope, $controller, _RouteDataService_) {
        scope = $rootScope.$new();
        RouteDataService = _RouteDataService_;
        MapController = $controller('MapController', {
            $scope: scope,
            routeDataService: RouteDataService
        });
    }));

    it('should not call save Route and not draw marker when route is still null', function () {
        spyOn(RouteDataService, 'saveRoutePartByLatLngs');
        spyOn(RouteDataService, 'getRoute').and.callFake(function () {
            return null;
        });
        expect(RouteDataService.getRoute()).toBe(null);
        scope.onMapClick({lat: "11.11", lng: "11.11"});
        expect(RouteDataService.saveRoutePartByLatLngs).not.toHaveBeenCalled();
    });

    it('should call save RoutePoint on RouteDataService when a point is added to Map', function () {
        spyOn(RouteDataService, 'saveRoutePointByLatLng');
        scope.onMapClick({lat: "12.34", lng: "56.78"});
        expect(RouteDataService.saveRoutePointByLatLng).toHaveBeenCalledWith({lat: "12.34", lng: "56.78"});
    });


    it('should call save RoutePart on RouteDataService when two points added to Map', function () {
        spyOn(RouteDataService, 'saveRoutePartByLatLngs');
        scope.onMapClick({lat: "11.11", lng: "11.11"});
        scope.onMapClick({lat: "22.22", lng: "22.22"});
        expect(RouteDataService.saveRoutePartByLatLngs).toHaveBeenCalledWith(
            {
                from: {lat: "11.11", lng: "11.11"},
                to: {lat: "22.22", lng: "22.22"}
            });

        scope.onMapClick({lat: "33.33", lng: "33.33"});
        expect(RouteDataService.saveRoutePartByLatLngs).toHaveBeenCalledWith(
            {
                from: {lat: "22.22", lng: "22.22"},
                to: {lat: "33.33", lng: "33.33"}
            });

        scope.onMapClick({lat: "44.44", lng: "44.44"});
        expect(RouteDataService.saveRoutePartByLatLngs).toHaveBeenCalledWith(
            {
                from: {lat: "33.33", lng: "33.33"},
                to: {lat: "44.44", lng: "44.44"}
            });
    });

    it('it should set focus in RouteDataService when point in Map selected', function () {
        spyOn(RouteDataService, 'selectRoutePartByLatLngs');
        //select Point
        scope.onMapSelectRoutePartByLatLngs({lat: "11.11", lng: "11.11"});
        expect(RouteDataService.selectRoutePartByLatLngs).toHaveBeenCalledWith({lat: "11.11", lng: "11.11"});
    });

    it('it should set focus to selected RoutePart in RouteDataService when path in Map selected', function () {
        spyOn(RouteDataService, 'selectRoutePartByLatLngs');
        var routePart = [{lat: "11.11", lng: "11.11"}, {lat: "22.22", lng: "22.22"}];
        scope.onMapSelectRoutePartByLatLngs(routePart);
        expect(RouteDataService.selectRoutePartByLatLngs).toHaveBeenCalledWith(routePart);
    });

})
;



