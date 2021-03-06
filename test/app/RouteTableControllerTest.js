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
            var rp1 = new RoutePoint(new LatLng({lat:1.1, lng:1.1}, "Warschau"), new Content("some titel", "rp1", "rp1"), new TimePeriod());
            var rp2 = new RoutePoint(new LatLng({lat:2.2, lng:2.2}, "Leipzig"), new Content("some titel", "rp2", "rp2"), new TimePeriod());

            var routeSection1 = new RouteSection(rp1, rp2, new Content("some titel", "desc of routesection A", "desc A"));
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

        mockRouteDataService.getCurrentlySelectedRouteTableEntryIndex = function () {
            console.log("mock mockRouteDataService.getCurrentlySelectedRouteTableEntryIndex");
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

    //TODO: enhance matcher to deal with multiple arguments
    beforeEach(function () {
           jasmine.addMatchers({
               toEqualJSONyFied: function (util, customTesters) {
                   return {
                       compare: function (actual, expected) {
                           var result = {};
                           result.pass = util.equals(JSON.stringify(actual), JSON.stringify(expected), customTesters);
                           if (!result.pass) {
                               result.message = "Expected: " + JSON.stringify(expected) + "\n" +
                                   "notEqual: " + JSON.stringify(actual);
                           } else {
                               result.message = "Expected: " + JSON.stringify(expected) + "\n" +
                                   "is Equal: " + JSON.stringify(actual) + "\n" +
                                   "but should not be equal";
                           }
                           return result;
                       }
                   }
               }
           });
       });

    it('should create a new route when Titel is entered and button is presses', function () {
        spyOn(RouteDataService, 'createNewRoute');

        scope.newTitel = "My very first travel experience";
        scope.createNewRoute();
        expect(RouteDataService.createNewRoute).toHaveBeenCalledWith("My very first travel experience");
    });

    it('should call save RoutePoint on RouteDataService when new routePart is inserted', function () {
        spyOn(RouteDataService, 'saveRoutePointByName');

        scope.saveRoutePointByName("Krakau", "2 days in Krakau");
        expect(RouteDataService.saveRoutePointByName.calls.argsFor(0)).toEqualJSONyFied([new LatLng(null, "Krakau"), new Content("2 days in Krakau", null, null), new TimePeriod(null)]);

        scope.saveRoutePointByName("Bangkok", "Tuk Tuk in BKK");
        expect(RouteDataService.saveRoutePointByName.calls.argsFor(1)).toEqualJSONyFied([new LatLng(null, "Bangkok"), new Content("Tuk Tuk in BKK", null, null), new TimePeriod(null)]);
    });

    it('should add new Route Point when city is entered and add button is pressed', function () {
        spyOn(RouteDataService, 'saveRoutePointByName');

        scope.newCity = null;
        scope.addRoutePoint();
        expect(RouteDataService.saveRoutePointByName).not.toHaveBeenCalled();

        scope.newCity = "Dortmund";
        scope.shortDescriptor = "watching soccer in Dortmund";

        scope.addRoutePoint();
        expect(RouteDataService.saveRoutePointByName.calls.argsFor(0)).toEqualJSONyFied([new LatLng(null, "Dortmund"), new Content("watching soccer in Dortmund", null, null), new TimePeriod(null)]);
    });

    it('it should set focus to selected RoutePoint or RouteSection in RouteDataService when row in table selected', function () {
        expect(scope.selectedRow).toBe(undefined);

        spyOn(RouteDataService, 'selectRouteTableEntry');
        spyOn(RouteDataService, 'resetCurrentSelection');
        spyOn(RouteDataService, 'getCurrentlySelectedRouteTableEntryIndex');

        spyOn(RouteDataService, 'getRouteTableEntries').and.callFake(function () {
            var rp1 = new RoutePoint(new LatLng({lat:0.0, lng:0.0}, "Hamburg"), new Content("some titel","rp1", "rp1"), new TimePeriod());
            var rp2 = new RoutePoint(new LatLng({lat:1.1, lng:1.1}, "Berlin"), new Content("some titel","rp2", "rp2"), new TimePeriod());
            var rp3 = new RoutePoint(new LatLng({lat:2.2, lng:2.2}, "Leipzig"), new Content("some titel","rp3", "rp3"), new TimePeriod());

            var routeSection1 = new RouteSection(rp1, rp2, new Content("some titel","desc of routesection A", "desc A"));
            var routeSection2 = new RouteSection(rp2, rp3, new Content("some titel","desc of routesection B", "desc B"));

            route.addRouteSection(routeSection1);
            route.addRouteSection(routeSection2);


            return [rp1, routeSection1, rp2, routeSection2, rp3];
        });

        scope.onSelectTableEntry(0);
        expect(RouteDataService.selectRouteTableEntry).toHaveBeenCalledWith(0);

        scope.onSelectTableEntry(1);
        expect(RouteDataService.selectRouteTableEntry).toHaveBeenCalledWith(1);

        scope.onResetSelection();
        expect(RouteDataService.resetCurrentSelection).toHaveBeenCalled();
    });
});



