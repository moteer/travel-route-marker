describe('RouteDataServiceTest', function () {

    beforeEach(function () {
        module('RouteApp');
    });

    beforeEach(inject(function (_RouteDataService_) {
        RouteDataService = _RouteDataService_;
    }));

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

        this.initializeWithRouteAndOneRoutePoint = function () {
            RouteDataService.init(new Route("My Berlin Route"));
            var latLng = new LatLng({}, "Berlin");
            var content = new Content("some titel", "berlins description", "images in berlin");
            var timePeriod = new TimePeriod();
            RouteDataService.saveRoutePointByName(latLng, content, timePeriod);
            expect(RouteDataService.getRoutePoints().length).toBe(1);

            var berlinRoutePoint = RouteDataService.getRoutePoints()[0];
            expect(berlinRoutePoint.getContent()).toBe(content);
            expect(berlinRoutePoint.getLatLng()).toBe(latLng);
            expect(berlinRoutePoint.getTimePeriod()).toBe(timePeriod);
            console.log("!!!!!!!!!!!");
        };

        this.initializeWithTwoRoutePointsConnectedWithARouteSection = function() {
                RouteDataService.init(new Route("My Route I drew on the map"));

                //latLng, content, timePeriod
                var rp1 = new RoutePoint(new LatLng({}, "Hamburg"), new Content("some titel", "rp1", "rp1"), new TimePeriod());
                var rp2 = new RoutePoint(new LatLng({lat: 1.1, lng: 2.2}, "Berlin"), new Content("some titel", "rp2", "rp2"), new TimePeriod());

                RouteDataService.saveRoutePoint(rp1);
                expect(RouteDataService.getRoutePoints().length).toBe(1);
                expect(RouteDataService.getRoutePoints()[0]).toEqualJSONyFied(rp1);
                expect(RouteDataService.getRouteSections().length).toBe(0);

                RouteDataService.saveRoutePoint(rp2);
                expect(RouteDataService.getRoutePoints().length).toBe(2);
                expect(RouteDataService.getRoutePoints()[1]).toEqualJSONyFied(rp2);

                expect(RouteDataService.getRouteSections().length).toBe(1);
                expect(RouteDataService.getRouteSections()[0].getFromRoutePoint()).toBe(rp1);
                expect(RouteDataService.getRouteSections()[0].getToRoutePoint()).toBe(rp2);
                expect(RouteDataService.getRouteSections()[0].getShortDescriptor()).toBe("Hamburg to Berlin");
            };


    });

    it('should create a new route when method called', function () {
        expect(RouteDataService.route).toBe(null);
        RouteDataService.createNewRoute("some great Titel");
        expect(RouteDataService.route).not.toBe(null);
        expect(RouteDataService.getTitel()).toBe("some great Titel");
    });


    it('should get titel and no RouteSections on initialisation of RouteDataService', function () {
        RouteDataService.init(new Route("My route where I save something"));
        expect(RouteDataService.getTitel()).toBe("My route where I save something");
        expect(RouteDataService.getRouteSections().length).toBe(0);
    });

    it('should return 0 for getNumberOfRouteSections when no RoutePart is been inserted yet', function () {
        RouteDataService.init(new Route("My route where I save something"));
        expect(RouteDataService.getNumberOfRouteSections()).toBe(0)
    });

    it('should save RoutePoint to RouteDataService by given city, description and image in case of manually added in the table', function () {
        this.initializeWithRouteAndOneRoutePoint();
    });

    it('should save RouteSection to RouteDatService when two Points are added', function () {
        this.initializeWithTwoRoutePointsConnectedWithARouteSection();
    });

    it('should change current to new selection when selectRouteSectionByLatLngs is been called', function () {
        var route = new Route("My way through Asia");
        RouteDataService.init(route);

        var rp1 = new RoutePoint(new LatLng({lat: 0.0, lng: 0.0}, "Hamburg"), new Content("some titel", "rp1", "rp1"), new TimePeriod());
        var rp2 = new RoutePoint(new LatLng({lat: 1.1, lng: 1.1}, "Berlin"), new Content("some titel", "rp2", "rp2"), new TimePeriod());
        var rp3 = new RoutePoint(new LatLng({lat: 2.2, lng: 2.2}, "Leipzig"), new Content("some titel", "rp3", "rp3"), new TimePeriod());

        RouteDataService.saveRoutePoint(rp1);
        RouteDataService.saveRoutePoint(rp2);
        RouteDataService.saveRoutePoint(rp3);

        RouteDataService.getRouteSections()[0].content = new Content("some titel", "desc of routesection A", "desc A");
        RouteDataService.getRouteSections()[1].content = new Content("some titel", "desc of routesection B", "desc B");

        var routeSection1 = new RouteSection(rp1, rp2, new Content("some titel", "desc of routesection A", "desc A"));
        var routeSection2 = new RouteSection(rp2, rp3, new Content("some titel", "desc of routesection B", "desc B"));

        expect(RouteDataService.getCurrentlySelectedRouteTableEntry()).toEqualJSONyFied(undefined);

        RouteDataService.selectRouteTableEntry(0);
        expect(RouteDataService.getCurrentlySelectedRouteTableEntry()).toEqualJSONyFied(rp1);

        RouteDataService.selectRouteTableEntry(1);
        expect(RouteDataService.getCurrentlySelectedRouteTableEntry()).toEqualJSONyFied(routeSection1);

        RouteDataService.selectRouteTableEntry(2);
        expect(RouteDataService.getCurrentlySelectedRouteTableEntry()).toEqualJSONyFied(rp2);
        expect(RouteDataService.getCurrentlySelectedRouteTableEntry()).toEqualJSONyFied(routeSection1.getToRoutePoint());

        RouteDataService.selectRouteTableEntry(3);
        expect(RouteDataService.getCurrentlySelectedRouteTableEntry()).toEqualJSONyFied(routeSection2);

        RouteDataService.selectRouteTableEntry(4);
        expect(RouteDataService.getCurrentlySelectedRouteTableEntry()).toEqualJSONyFied(rp3);

        //expect(RouteDataService.getCurrentlySelectedRouteTableEntry()).toEqualJSONyFied(routeSection2.getToRoutePoint());
    });

    it('should deselect all selections when deselect is been called', function () {
        var route = new Route("My way through Asia");
        RouteDataService.init(route);

        var rp1 = new RoutePoint(new LatLng({lat: 0.0, lng: 0.0}, "Hamburg"), new Content("some titel", "rp1", "rp1"), new TimePeriod());
        var rp2 = new RoutePoint(new LatLng({lat: 1.1, lng: 1.1}, "Berlin"), new Content("some titel", "rp2", "rp2"), new TimePeriod());
        var rp3 = new RoutePoint(new LatLng({lat: 2.2, lng: 2.2}, "Leipzig"), new Content("some titel", "rp3", "rp3"), new TimePeriod());

        RouteDataService.saveRoutePoint(rp1);
        RouteDataService.saveRoutePoint(rp2);
        RouteDataService.saveRoutePoint(rp3);

        RouteDataService.getRouteSections()[0].content = new Content("some titel", "desc of routesection A", "desc A");
        RouteDataService.getRouteSections()[1].content = new Content("some titel", "desc of routesection B", "desc B");

        var routeSection1 = new RouteSection(rp1, rp2, new Content("some titel", "desc of routesection A", "desc A"));

        expect(RouteDataService.getCurrentlySelectedRouteTableEntry()).toEqualJSONyFied(undefined);

        RouteDataService.selectRouteTableEntry(0);
        expect(RouteDataService.getCurrentlySelectedRouteTableEntry()).toEqualJSONyFied(rp1);

        RouteDataService.selectRouteTableEntry(1);
        expect(RouteDataService.getCurrentlySelectedRouteTableEntry()).toEqualJSONyFied(routeSection1);

        RouteDataService.selectRouteTableEntry();
        expect(RouteDataService.getCurrentlySelectedRouteTableEntry()).toEqualJSONyFied(undefined);
    });

    it('should set select on clicking on Map Point selectRoutePointByLatLngs', function () {
        var route = new Route("My way through Asia");
        RouteDataService.init(route);

        var rp1 = new RoutePoint(new LatLng({lat: 0.0, lng: 0.0}, "Hamburg"), new Content("some titel", "rp1", "rp1"), new TimePeriod());
        var rp2 = new RoutePoint(new LatLng({lat: 1.1, lng: 1.1}, "Berlin"), new Content("some titel", "rp2", "rp2"), new TimePeriod());
        var rp3 = new RoutePoint(new LatLng({lat: 2.2, lng: 2.2}, "Leipzig"), new Content("some titel", "rp3", "rp3"), new TimePeriod());

        RouteDataService.saveRoutePoint(rp1);

        RouteDataService.selectRoutePointByLatLngs({lat: 0.0, lng: 0.0}, null);
        expect(RouteDataService.getCurrentlySelectedRouteTableEntry()).toEqualJSONyFied(rp1);
        expect(RouteDataService.getCurrentlySelectedRouteTableEntryIndex()).toBe(0);

        RouteDataService.saveRoutePoint(rp2);
        RouteDataService.saveRoutePoint(rp3);

        RouteDataService.selectRoutePointByLatLngs({lat: 1.1, lng: 1.1}, null);
        expect(RouteDataService.getCurrentlySelectedRouteTableEntry()).toEqualJSONyFied(rp2);
        expect(RouteDataService.getCurrentlySelectedRouteTableEntryIndex()).toBe(2);

        RouteDataService.selectRoutePointByLatLngs({lat: 2.2, lng: 2.2}, null);
        expect(RouteDataService.getCurrentlySelectedRouteTableEntry()).toEqualJSONyFied(rp3);
        expect(RouteDataService.getCurrentlySelectedRouteTableEntryIndex()).toBe(4);
    });

    it('should set select on clicking on Map Element selectRouteSectionByLatLngs', function () {
        var route = new Route("My way through Asia");
        RouteDataService.init(route);

        var rp1 = new RoutePoint(new LatLng({lat: 0.0, lng: 0.0}, "Hamburg"), new Content("some titel", "rp1", "rp1"), new TimePeriod());
        var rp2 = new RoutePoint(new LatLng({lat: 1.1, lng: 1.1}, "Berlin"), new Content("some titel", "rp2", "rp2"), new TimePeriod());
        var rp3 = new RoutePoint(new LatLng({lat: 2.2, lng: 2.2}, "Leipzig"), new Content("some titel", "rp3", "rp3"), new TimePeriod());

        RouteDataService.saveRoutePoint(rp1);
        RouteDataService.saveRoutePoint(rp2);
        RouteDataService.saveRoutePoint(rp3);

        RouteDataService.getRouteSections()[0].content = new Content("some titel", "desc of routesection A", "desc A");
        RouteDataService.getRouteSections()[1].content = new Content("some titel", "desc of routesection B", "desc B");

        var routeSection1 = new RouteSection(rp1, rp2, new Content("some titel", "desc of routesection A", "desc A"));
        var routeSection2 = new RouteSection(rp2, rp3, new Content("some titel", "desc of routesection B", "desc B"));

        RouteDataService.selectRouteSectionByLatLngs([{lat: 0.0, lng: 0.0}, {lat: 1.1, lng: 1.1}]);
        expect(RouteDataService.getCurrentlySelectedRouteTableEntry()).toEqualJSONyFied(routeSection1);
        expect(RouteDataService.getCurrentlySelectedRouteTableEntryIndex()).toBe(1);

        RouteDataService.selectRouteSectionByLatLngs([{lat: 1.1, lng: 1.1}, {lat: 2.2, lng: 2.2}]);
        expect(RouteDataService.getCurrentlySelectedRouteTableEntry()).toEqualJSONyFied(routeSection2);
        expect(RouteDataService.getCurrentlySelectedRouteTableEntryIndex()).toBe(3);
    });

    it('should save titel and place at current selected RoutePoint on saveTitelAndPlaceForCurrentSelection', function () {
        var route = new Route("My way through Asia");
        RouteDataService.init(route);
        var rp1 = new RoutePoint(new LatLng({lat: 0.0, lng: 0.0}, null), new Content(null, null, null), new TimePeriod());

        RouteDataService.saveRoutePoint(rp1);
        RouteDataService.selectRoutePointByLatLngs(new LatLng({lat: 0.0, lng: 0.0}, null));
        RouteDataService.saveTitelAndPlaceForCurrentSelection("a new titel", "a place or city");
        var expectedRoutePoint = new RoutePoint(new LatLng({lat: 0.0, lng: 0.0}, "a place or city"), new Content("a new titel", null, null), new TimePeriod());
        expect(RouteDataService.getCurrentlySelectedRouteTableEntry()).toEqualJSONyFied(expectedRoutePoint);
    });

    it('should not save anything when no current selection exists on saveTitelAndPlaceForCurrentSelection', function () {
        var route = new Route("My way through Asia");
        RouteDataService.init(route);
        var rp1 = new RoutePoint(new LatLng({lat: 0.0, lng: 0.0}, null), new Content(null, null, null), new TimePeriod());

        RouteDataService.saveRoutePoint(rp1);
        RouteDataService.saveTitelAndPlaceForCurrentSelection("a new titel", "a place or city");
        expect(RouteDataService.getCurrentlySelectedRouteTableEntry()).toBe(undefined);

        var expectedRoutePoint = new RoutePoint(new LatLng({lat: 0.0, lng: 0.0}, null), new Content(null, null, null), new TimePeriod());
        expect(RouteDataService.getRoutePoints()[0]).toEqualJSONyFied(expectedRoutePoint);
    });

    it('should save new marker position when dragged', function () {
        this.initializeWithRouteAndOneRoutePoint();

        var berlinRoutePoint = RouteDataService.getRoutePoints()[0];
        var expectedLat = 1;
        var expectedLng = 2;

        RouteDataService.changeMarkerPosition(0, expectedLat, expectedLng);
        expect(berlinRoutePoint.getLatLng().lat).toBe(expectedLat);
        expect(berlinRoutePoint.getLatLng().lng).toBe(expectedLng);
    });


    it('should save new marker position and move path to new position when dragged', function () {
        this.initializeWithTwoRoutePointsConnectedWithARouteSection();
        var berlinRoutePoint = RouteDataService.getRoutePoints()[0];
        var hamburgRoutePoint = RouteDataService.getRoutePoints()[1];

        var expectedLat = 44;
        var expectedLng = 55;
        RouteDataService.changeMarkerPosition(1, expectedLat, expectedLng);
        expect(hamburgRoutePoint.getLatLng().lat).toBe(expectedLat);
        expect(hamburgRoutePoint.getLatLng().lng).toBe(expectedLng);

        expectedLat = 100;
        expectedLng = 999;
        RouteDataService.changeMarkerPosition(0, expectedLat, expectedLng);
        expect(berlinRoutePoint.getLatLng().lat).toBe(expectedLat);
        expect(berlinRoutePoint.getLatLng().lng).toBe(expectedLng);
    });


});
