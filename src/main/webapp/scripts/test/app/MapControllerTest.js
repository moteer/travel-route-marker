describe('Map Controller', function () {

    beforeEach(function () {
        var mockRouteFactory = {};
        module('RouteApp', function ($provide) {
            $provide.value('RouteFactory', mockRouteFactory);
        });

        mockRouteFactory.saveRoutePart = function (routePart) {
            console.log("mock mockRouteTableController.saveRoutePart was called with routePart" + routePart);
        };

        mockRouteFactory.selectRoutePoint = function (routePoint) {
            console.log("mock mockRouteTableController.selectRoutePoint was called with routePart" + routePoint);
        };

        mockRouteFactory.selectRoutePart = function (routePartArray) {
            console.log("mock mockRouteTableController.selectRoutePart was called with routePart" + routePartArray);
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
        spyOn(RouteFactory, 'saveRoutePart');
        scope.onMapClick({lat:"11.11", lng:"11.11"});
        scope.onMapClick({lat:"22.22", lng:"22.22"});
        expect(RouteFactory.saveRoutePart).toHaveBeenCalledWith(
            {
                from: {lat: "11.11", lng: "11.11"},
                to: {lat: "22.22", lng: "22.22"}
            });

        scope.onMapClick({lat:"33.33", lng:"33.33"});
        expect(RouteFactory.saveRoutePart).toHaveBeenCalledWith(
            {
                from: {lat: "22.22", lng: "22.22"},
                to: {lat: "33.33", lng: "33.33"}
            });

        scope.onMapClick({lat:"44.44", lng:"44.44"});
        expect(RouteFactory.saveRoutePart).toHaveBeenCalledWith(
            {
                from: {lat: "33.33", lng: "33.33"},
                to: {lat: "44.44", lng: "44.44"}
            });
    });

    it('it should set focus in RouteFactory when point in Map selected', function () {
        spyOn(RouteFactory, 'selectRoutePoint');
        //select Point
        scope.onMapSelectPoint({lat: "11.11", lng: "11.11"});
        expect(RouteFactory.selectRoutePoint).toHaveBeenCalledWith({lat: "11.11", lng: "11.11"});
    });

    it('it should set focus to selected RoutePart in RouteFactory when path in Map selected', function () {
        spyOn(RouteFactory, 'selectRoutePart');
        //select RoutePart
        var routePart = [{lat: "11.11", lng: "11.11"}, {lat: "22.22", lng: "22.22"}];

        scope.onMapSelectRoutePart(routePart);
        expect(RouteFactory.selectRoutePart).toHaveBeenCalledWith(routePart);
    });

})
;



