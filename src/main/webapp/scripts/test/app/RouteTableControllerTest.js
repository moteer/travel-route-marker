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

        mockRouteDataService.getRouteParts = function () {
            console.log("mock mockRouteDataService.getRouteParts");
        };

        mockRouteDataService.selectRoutePart = function (id) {
            console.log("mock mockRouteDataService.selectRoutePart was called with id" + id);
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

    it('it should set focus to selected RoutePart in RouteDataService when row in table selected', function () {
        expect(scope.selectedRow).toBe(null);

        spyOn(RouteDataService, 'selectRoutePart');
        spyOn(RouteDataService, 'getRouteParts').and.callFake(function () {

            return [

                new RoutePart(new Content("RoutePart Desc A", "RoutePart Image A"),
                    new GeoCoordinates([new GeoCoordinate({lat: "12.11", lng: "11.11"}, "Hamburg"),
                        new GeoCoordinate({lat: "13.11", lng: "11.11"}, "Dresden")])),

                new RoutePart(new Content("RoutePart Desc B", "RoutePart Image B"),
                    new GeoCoordinates([new GeoCoordinate({lat: "13.11", lng: "11.11"}, "Paris")])),

                new RoutePart(new Content("RoutePart Desc C", "RoutePart Image C"),
                    new GeoCoordinates([new GeoCoordinate({lat: "12.99", lng: "44.44"}, "Pag"),
                            new GeoCoordinate({lat: "13.99", lng: "55.55"}, "Moskau")]
                    ))];
        });

        scope.onSelectRoutePart(0);
        expect(RouteDataService.selectRoutePart).toHaveBeenCalledWith(0);
        expect(scope.selectedRow).toBe(0);

        scope.onSelectRoutePart(1);
        expect(RouteDataService.selectRoutePart).toHaveBeenCalledWith(1);
        expect(scope.selectedRow).toBe(1);
    });
});



