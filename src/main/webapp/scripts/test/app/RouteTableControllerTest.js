describe('RouteTableController', function () {

    beforeEach(function () {
        var mockRouteDataService = {};
        module('RouteApp', function ($provide) {
            $provide.value('RouteDataService', mockRouteDataService);
        });

        mockRouteDataService.saveRoutePointByName = function (city) {
            console.log("mock mockRouteDataService.saveRoutePointByName was called with city" + city);
        };

        mockRouteDataService.getRoute = function () {
            console.log("mock mockRouteDataService.getRoute was called");
            var testRoute = new Route("My first travel experience.");
            var rp1 = new RoutePoint(new LatLng({lat:1.1, lng:1.1}, "Warschau"), new Content("rp1", "rp1"), new TimePeriod());
            var rp2 = new RoutePoint(new LatLng({lat:2.2, lng:2.2}, "Leipzig"), new Content("rp2", "rp2"), new TimePeriod());

            var routeSection1 = new RouteSection(rp1, rp2, new Content("desc of routesection A", "desc A"));
            testRoute.addRouteSection(routeSection1);
            return testRoute;
        };

        mockRouteDataService.getRouteTableEntries = function () {
            console.log("mock mockRouteDataService.getRouteTableEntries");
        };

        mockRouteDataService.selectRouteTableEntry = function (id) {
            console.log("mock mockRouteDataService.selectRoutePoint was called with id" + id);
        };

        mockRouteDataService.resetCurrentSelection = function () {
            console.log("mock mockRouteDataService.resetCurrentSelection");
        };

        mockRouteDataService.createNewRoute = function () {
            console.log("mock mockRouteDataService.createNewRoute");
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

    it('should create a new route when Titel is entered and button is presses', function () {
        spyOn(RouteDataService, 'createNewRoute');

        scope.newTitel = "My very first travel experience";
        scope.createNewRoute();
        expect(RouteDataService.createNewRoute).toHaveBeenCalledWith("My very first travel experience");
    });

    it('should call save RoutePoint on RouteDataService when new routePart is inserted', function () {
        spyOn(RouteDataService, 'saveRoutePointByName');

        scope.saveRoutePointByName("Krakau");
        expect(RouteDataService.saveRoutePointByName).toHaveBeenCalledWith("Krakau");

        scope.saveRoutePointByName("Bangkok", "Sydney");
        expect(RouteDataService.saveRoutePointByName).toHaveBeenCalledWith("Bangkok", "Sydney");
    });

    it('should add new Route Point when city is entered and add button is pressed', function () {
        spyOn(RouteDataService, 'saveRoutePointByName');

        scope.newCity = null;
        scope.addRoutePoint();
        expect(RouteDataService.saveRoutePointByName).not.toHaveBeenCalled();

        scope.newCity = "Dortmund";
        scope.addRoutePoint();
        expect(RouteDataService.saveRoutePointByName).toHaveBeenCalledWith("Dortmund");
    });

    it('it should set focus to selected RoutePoint or RouteSection in RouteDataService when row in table selected', function () {
        expect(scope.selectedRow).toBe(null);

        spyOn(RouteDataService, 'selectRouteTableEntry');
        spyOn(RouteDataService, 'resetCurrentSelection');

        spyOn(RouteDataService, 'getRouteTableEntries').and.callFake(function () {
            var rp1 = new RoutePoint(new LatLng({lat:0.0, lng:0.0}, "Hamburg"), new Content("rp1", "rp1"), new TimePeriod());
            var rp2 = new RoutePoint(new LatLng({lat:1.1, lng:1.1}, "Berlin"), new Content("rp2", "rp2"), new TimePeriod());
            var rp3 = new RoutePoint(new LatLng({lat:2.2, lng:2.2}, "Leipzig"), new Content("rp3", "rp3"), new TimePeriod());

            var routeSection1 = new RouteSection(rp1, rp2, new Content("desc of routesection A", "desc A"));
            var routeSection2 = new RouteSection(rp2, rp3, new Content("desc of routesection B", "desc B"));

            route.addRouteSection(routeSection1);
            route.addRouteSection(routeSection2);


            return [rp1, routeSection1, rp2, routeSection2, rp3];
        });

        scope.onSelectTableEntry(0);
        expect(RouteDataService.selectRouteTableEntry).toHaveBeenCalledWith(0);
        expect(scope.selectedRow).toBe(0);

        scope.onSelectTableEntry(1);
        expect(RouteDataService.selectRouteTableEntry).toHaveBeenCalledWith(1);
        expect(scope.selectedRow).toBe(1);

        scope.onResetSelection();
        expect(RouteDataService.resetCurrentSelection).toHaveBeenCalled();
        expect(scope.selectedRow).toBe(null);
    });
});



