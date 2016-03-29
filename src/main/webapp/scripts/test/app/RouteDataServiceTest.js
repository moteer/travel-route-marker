describe('RouteDataServiceTest', function () {

    beforeEach(function () {
        module('RouteApp');
    });

    beforeEach(inject(function (_RouteDataService_) {
        RouteDataService = _RouteDataService_;
    }));

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
        RouteDataService.init(new Route("My Berlin Route"));
        var latLng = new LatLng({}, "Berlin");
        var content = new Content("berlins description", "images in berlin");
        var timePeriod = new TimePeriod();
        RouteDataService.saveRoutePointByName(latLng, content, timePeriod);
        expect(RouteDataService.getRoutePoints().length).toBe(1);

        var berlinRoutePoint = RouteDataService.getRoutePoints()[0];
        expect(berlinRoutePoint.getContent()).toBe(content);
        expect(berlinRoutePoint.getLatLng()).toBe(latLng);
        expect(berlinRoutePoint.getTimePeriod()).toBe(timePeriod);
    });

    it('should save RoutePoint to RouteDatService when latitude longitude is is given', function () {
        RouteDataService.init(new Route("My Route I drew on the map"));

        //latLng, content, timePeriod
        var rp1 = new RoutePoint(new LatLng({}, "Hamburg"), new Content("rp1", "rp1"), new TimePeriod());
        var rp2 = new RoutePoint(new LatLng({lat:1.1, lng:2.2}, "Berlin"), new Content("rp2", "rp2"), new TimePeriod());
        var content = new Content("this is my way from rp1 to rp2", "with some travel images");
        RouteDataService.saveRouteSection(rp1, rp2, content);

        expect(RouteDataService.getRoutePoints().length).toBe(2);
        expect(RouteDataService.getRoutePoints()[0]).toBe(rp1);
        expect(RouteDataService.getRoutePoints()[1]).toBe(rp2);

        expect(RouteDataService.getRouteSections().length).toBe(1);
        expect(RouteDataService.getRouteSections()[0].getContent()).toBe(content);
        expect(RouteDataService.getRouteSections()[0].getFromRoutePoint()).toBe(rp1);
        expect(RouteDataService.getRouteSections()[0].getToRoutePoint()).toBe(rp2);
    });


    it('should change current to new selection when selectRouteSectionByLatLngs is been called', function () {
        var route = new Route("My way through Asia");
        var rp1 = new RoutePoint(new LatLng({lat:0.0, lng:0.0}, "Hamburg"), new Content("rp1", "rp1"), new TimePeriod());
        var rp2 = new RoutePoint(new LatLng({lat:1.1, lng:1.1}, "Berlin"), new Content("rp2", "rp2"), new TimePeriod());
        var rp3 = new RoutePoint(new LatLng({lat:2.2, lng:2.2}, "Leipzig"), new Content("rp3", "rp3"), new TimePeriod());

        var routeSection1 = new RouteSection(rp1, rp2, new Content("desc of routesection A", "desc A"));
        var routeSection2 = new RouteSection(rp2, rp3, new Content("desc of routesection B", "desc B"));

        route.addRouteSection(routeSection1);
        route.addRouteSection(routeSection2);
        RouteDataService.init(route);

        expect(RouteDataService.getCurrentlySelectedRouteTableEntry()).toEqual(undefined);

        RouteDataService.selectRouteTableEntry(0);
        expect(RouteDataService.getCurrentlySelectedRouteTableEntry()).toEqual(rp1);

        RouteDataService.selectRouteTableEntry(1);
        expect(RouteDataService.getCurrentlySelectedRouteTableEntry()).toEqual(routeSection1);

        RouteDataService.selectRouteTableEntry(2);
        expect(RouteDataService.getCurrentlySelectedRouteTableEntry()).toEqual(rp2);
        expect(RouteDataService.getCurrentlySelectedRouteTableEntry()).toEqual(routeSection1.getToRoutePoint());

        RouteDataService.selectRouteTableEntry(3);
        expect(RouteDataService.getCurrentlySelectedRouteTableEntry()).toEqual(routeSection2);

        RouteDataService.selectRouteTableEntry(4);
        expect(RouteDataService.getCurrentlySelectedRouteTableEntry()).toEqual(rp3);
        //expect(RouteDataService.getCurrentlySelectedRouteTableEntry()).toEqual(routeSection2.getToRoutePoint());


    });

    it('should deselect all selections when deselect is been called', function () {
        var route = new Route("My way through Asia");
        var rp1 = new RoutePoint(new LatLng({lat:0.0, lng:0.0}, "Hamburg"), new Content("rp1", "rp1"), new TimePeriod());
        var rp2 = new RoutePoint(new LatLng({lat:1.1, lng:1.1}, "Berlin"), new Content("rp2", "rp2"), new TimePeriod());
        var rp3 = new RoutePoint(new LatLng({lat:2.2, lng:2.2}, "Leipzig"), new Content("rp3", "rp3"), new TimePeriod());

        var routeSection1 = new RouteSection(rp1, rp2, new Content("desc of routesection A", "desc A"));
        var routeSection2 = new RouteSection(rp2, rp3, new Content("desc of routesection B", "desc B"));

        route.addRouteSection(routeSection1);
        route.addRouteSection(routeSection2);
        RouteDataService.init(route);

        expect(RouteDataService.getCurrentlySelectedRouteTableEntry()).toEqual(undefined);

        RouteDataService.selectRouteTableEntry(0);
        expect(RouteDataService.getCurrentlySelectedRouteTableEntry()).toEqual(rp1);

        RouteDataService.selectRouteTableEntry(1);
        expect(RouteDataService.getCurrentlySelectedRouteTableEntry()).toEqual(routeSection1);

        RouteDataService.selectRouteTableEntry();
        expect(RouteDataService.getCurrentlySelectedRouteTableEntry()).toEqual(undefined);
    });

    it('should set select on clicking on Map Point selectRoutePointByLatLngs', function () {
        var route = new Route("My way through Asia");
        var rp1 = new RoutePoint(new LatLng({lat:0.0, lng:0.0}, "Hamburg"), new Content("rp1", "rp1"), new TimePeriod());
        var rp2 = new RoutePoint(new LatLng({lat:1.1, lng:1.1}, "Berlin"), new Content("rp2", "rp2"), new TimePeriod());
        var rp3 = new RoutePoint(new LatLng({lat:2.2, lng:2.2}, "Leipzig"), new Content("rp3", "rp3"), new TimePeriod());

        var routeSection1 = new RouteSection(rp1, rp2, new Content("desc of routesection A", "desc A"));
        var routeSection2 = new RouteSection(rp2, rp3, new Content("desc of routesection B", "desc B"));

        route.addRouteSection(routeSection1);
        route.addRouteSection(routeSection2);
        RouteDataService.init(route);

        RouteDataService.selectRoutePointByLatLngs({lat:0.0, lng:0.0});
        expect(RouteDataService.getCurrentlySelectedRouteTableEntry()).toEqual(rp1);

        RouteDataService.selectRoutePointByLatLngs({lat: 1.1, lng: 1.1});
        expect(RouteDataService.getCurrentlySelectedRouteTableEntry()).toEqual(rp2);

        RouteDataService.selectRoutePointByLatLngs({lat:2.2, lng:2.2});
        expect(RouteDataService.getCurrentlySelectedRouteTableEntry()).toEqual(rp3);

    });

    it('should set select on clicking on Map Element selectRouteSectionByLatLngs', function () {
        var route = new Route("My way through Asia");
        var rp1 = new RoutePoint(new LatLng({lat:0.0, lng:0.0}, "Hamburg"), new Content("rp1", "rp1"), new TimePeriod());
        var rp2 = new RoutePoint(new LatLng({lat:1.1, lng:1.1}, "Berlin"), new Content("rp2", "rp2"), new TimePeriod());
        var rp3 = new RoutePoint(new LatLng({lat:2.2, lng:2.2}, "Leipzig"), new Content("rp3", "rp3"), new TimePeriod());

        var routeSection1 = new RouteSection(rp1, rp2, new Content("desc of routesection A", "desc A"));
        var routeSection2 = new RouteSection(rp2, rp3, new Content("desc of routesection B", "desc B"));

        route.addRouteSection(routeSection1);
        route.addRouteSection(routeSection2);
        RouteDataService.init(route);

        RouteDataService.selectRouteSectionByLatLngs([{lat: 0.0, lng: 0.0}, {lat: 1.1, lng: 1.1}]);
        expect(RouteDataService.getCurrentlySelectedRouteTableEntry()).toEqual(routeSection1);

        RouteDataService.selectRouteSectionByLatLngs([{lat: 1.1, lng: 1.1}, {lat: 2.2, lng: 2.2}]);
        expect(RouteDataService.getCurrentlySelectedRouteTableEntry()).toEqual(routeSection2);
    });



});
