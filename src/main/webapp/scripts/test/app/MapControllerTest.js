describe('Map Controller', function () {

    beforeEach(function () {
        var mockRouteTableController = {};
        module('MapModule', function ($provide) {
            $provide.value('RouteTableController', mockRouteTableController);
        });

        mockRouteTableController.saveRoutePart = function (routePart) {
            console.log("mock mockRouteTableController.saveRoutePart was called with routePart" + routePart);
        };

        mockRouteTableController.selectRoutePoint = function (routePoint) {
            console.log("mock mockRouteTableController.selectRoutePoint was called with routePart" + routePoint);
        };

        mockRouteTableController.selectRoutePart = function (routePartArray) {
            console.log("mock mockRouteTableController.selectRoutePart was called with routePart" + routePartArray);
        };
    });

    var MapController,
        RouteTableController,
        scope;

    beforeEach(inject(function ($rootScope, $controller, _RouteTableController_) {
        scope = $rootScope.$new();
        RouteTableController = _RouteTableController_;
        MapController = $controller('MapController', {
            $scope: scope,
            routeTableController: RouteTableController
        });
    }));


    it('should call save RoutePart on RouteTableController when two points added to Map', function () {
        spyOn(RouteTableController, 'saveRoutePart');
        scope.onMapClick({lat:"11.11", lng:"11.11"});
        scope.onMapClick({lat:"22.22", lng:"22.22"});
        expect(RouteTableController.saveRoutePart).toHaveBeenCalledWith(
            {
                from: {lat: "11.11", lng: "11.11"},
                to: {lat: "22.22", lng: "22.22"}
            });

        scope.onMapClick({lat:"33.33", lng:"33.33"});
        expect(RouteTableController.saveRoutePart).toHaveBeenCalledWith(
            {
                from: {lat: "22.22", lng: "22.22"},
                to: {lat: "33.33", lng: "33.33"}
            });

        scope.onMapClick({lat:"44.44", lng:"44.44"});
        expect(RouteTableController.saveRoutePart).toHaveBeenCalledWith(
            {
                from: {lat: "33.33", lng: "33.33"},
                to: {lat: "44.44", lng: "44.44"}
            });
    });

    it('it should fokus the selected RoutePoint in RouteTableController when point in Map selected', function () {
        spyOn(RouteTableController, 'selectRoutePoint');
        //select Point
        scope.onMapSelectPoint({lat: "11.11", lng: "11.11"});
        expect(RouteTableController.selectRoutePoint).toHaveBeenCalledWith({lat: "11.11", lng: "11.11"});
    });

    it('it should fokus the selected RoutePart in RouteTableController when path in Map selected', function () {
        spyOn(RouteTableController, 'selectRoutePart');
        //select RoutePart
        var routePart = [{lat: "11.11", lng: "11.11"}, {lat: "22.22", lng: "22.22"}];

        scope.onMapSelectRoutePart(routePart);
        expect(RouteTableController.selectRoutePart).toHaveBeenCalledWith(routePart);
    });

})
;



