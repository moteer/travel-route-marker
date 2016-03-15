describe('RouteTableController', function () {

    beforeEach(function () {
        var mockRouteFactory = {};
        module('RouteApp', function ($provide) {
            $provide.value('RouteFactory', mockRouteFactory);
        });

        mockRouteFactory.saveRoutePointByName = function (city) {
            console.log("mock mockRouteFactory.saveRoutePointByName was called with city" + city);
        };

        mockRouteFactory.saveRoutePartByName = function (cities) {
            console.log("mock mockRouteFactory.saveRoutePointByName was called with city" + cities);
        };

    });

    beforeEach(inject(function ($rootScope, $controller, _RouteFactory_) {
        scope = $rootScope.$new();
        RouteFactory = _RouteFactory_;
        RouteTableController = $controller('RouteTableController', {
            $scope: scope,
            routeFactory: RouteFactory
        });
    }));

    it('should call save RoutePart on RouteFactory when new routePart is inserted', function () {
        spyOn(RouteFactory, 'saveRoutePointByName');
        scope.saveRoutePart("Leipzig");
        expect(RouteFactory.saveRoutePointByName).toHaveBeenCalledWith("Leipzig");

        spyOn(RouteFactory, 'saveRoutePartByName');
        scope.saveRoutePart("Leipzig", "Sydney");
        expect(RouteFactory.saveRoutePartByName).toHaveBeenCalledWith("Leipzig", "Sydney");
    });
});



