describe('RouteTableController', function () {

    beforeEach(function () {
        var mockRouteDataService = {};
        module('RouteApp', function ($provide) {
            $provide.value('RouteDataService', mockRouteDataService);
        });

        mockRouteDataService.saveRoutePartByName = function (city) {
            console.log("mock mockRouteDataService.saveRoutePointByName was called with city" + city);
        };

        mockRouteDataService.getRoute = function () {
            console.log("mock mockRouteDataService.getRoute was called");
            var testRoute = new Route("My first travel experience.");
            var content = new Content("some description", "some image");
            //var timePeriod = new TimePeriod("1.1.2016", "1.2.2016");
            var geoCoordinates = new GeoCoordinates(
                [
                    new GeoCoordinate({lat: "11.11", lng: "11.11"}),
                    new GeoCoordinate({lat: "22.22", lng: "22.22"})
                ]
            );
            var rp = new RoutePart(content, geoCoordinates);
            testRoute.addRoutePart(rp);
            testRoute.addRoutePart(new RoutePart(new Content("new description", "new image"),
                new GeoCoordinates(
                    [
                        new GeoCoordinate({lat: "12.11", lng: "11.11"}, "Hamburg"),
                        new GeoCoordinate({lat: "13.11", lng: "11.11"}, "Dresden")
                    ]
                )));
            return testRoute;
        };
    });

    beforeEach(inject(function ($rootScope, $controller, _RouteDataService_) {
        scope = $rootScope.$new();
        RouteDataService = _RouteDataService_;
        RouteTableController = $controller('RouteTableController', {
            $scope: scope,
            routeDataService: RouteDataService
        });
    }));

    it('should call save RoutePart on RouteDataService when new routePart is inserted', function () {
        spyOn(RouteDataService, 'saveRoutePartByName');

        scope.saveRoutePartByName("Leipzig");
        expect(RouteDataService.saveRoutePartByName).toHaveBeenCalledWith("Leipzig");

        scope.saveRoutePartByName("Leipzig", "Sydney");
        expect(RouteDataService.saveRoutePartByName).toHaveBeenCalledWith("Leipzig", "Sydney");
    });
});



