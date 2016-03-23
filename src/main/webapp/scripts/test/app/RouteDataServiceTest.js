describe('RouteDataServiceTest', function () {

    beforeEach(function () {
        module('RouteApp');
    });

    beforeEach(inject(function (_RouteDataService_) {
        RouteDataService = _RouteDataService_;
    }));

    it('displays Route in table', function () {
        var route = new Route("My first travel experience.");
        var content = new Content("some description", "some image");
        //var timePeriod = new TimePeriod("1.1.2016", "1.2.2016");
        var geoCoordinates = new GeoCoordinates([
            new GeoCoordinate({lat: "1", lng: "2"}, "Kopenhagen"),
            new GeoCoordinate({lat: "2", lng: "3"}, "Brisbane")]);
        var rp = new RoutePart(content, geoCoordinates);
        route.addRoutePart(rp);

        RouteDataService.init(route);
        expect(RouteDataService.getRoute()).toEqual(route);
        expect(RouteDataService.getRouteParts()).toEqual([rp]);
        expect(RouteDataService.getRouteParts()).toContain(rp);
        expect(RouteDataService.getNumberOfRouteParts()).toBe(1);

        expect(RouteDataService.getRouteParts()[0].toString()).toBe("some description | some image");

        // add another routePart
        var rpNew = new RoutePart(new Content("new description", "new image"),
            new TimePeriod(),
            new GeoCoordinates(
                new GeoCoordinate({lat: "5", lng: "6"}, "Dubai"),
                new GeoCoordinate({lat: "7", lng: "8"}, "Phnom Phen")));

        route.addRoutePart(rpNew);

        expect(RouteDataService.getRoute()).toEqual(route);
        expect(RouteDataService.getRouteParts()).toContain(rp);
        expect(RouteDataService.getRouteParts()).toContain(rpNew);
        expect(RouteDataService.getNumberOfRouteParts()).toBe(2);

        expect(RouteDataService.getRouteParts()[0].toString()).toBe("some description | some image");
        expect(RouteDataService.getRouteParts()[0].content.description).toBe("some description");
        expect(RouteDataService.getRouteParts()[0].content.image).toBe("some image");

        expect(RouteDataService.getRouteParts()[1].toString()).toBe("new description | new image");
        expect(RouteDataService.getRouteParts()[1].content.description).toBe("new description");
        expect(RouteDataService.getRouteParts()[1].content.image).toBe("new image");

    });

    it('should create a new route when method called', function () {
        expect(RouteDataService.route).toBe(null);
        RouteDataService.createNewRoute("some great Titel");
        expect(RouteDataService.route).not.toBe(null);
        expect(RouteDataService.getTitel()).toBe("some great Titel");
    });


    it('should get titel and no RouteParts on initialisation of RouteDataService', function () {
        RouteDataService.init(new Route("My route where I save something"));
        expect(RouteDataService.getTitel()).toBe("My route where I save something");
        expect(RouteDataService.getRouteParts().length).toBe(0);
    });

    it('should return 0 for getNumberOfRouteParts when no RoutePart is been inserted yet', function () {
        expect(RouteDataService.getNumberOfRouteParts()).toBe(0);

    });

    it('should save RoutePart to RouteDataService by given city, description and image in case of manually added in the table', function () {
        RouteDataService.init(new Route("My Berlin Route"));
        RouteDataService.saveRoutePartByName("Berlin", "berlins description", "images in berlin");
        expect(RouteDataService.getRouteParts().length).toBe(1);

        var berlinRoutePart = RouteDataService.getRouteParts()[0];
        expect(berlinRoutePart.content.description).toBe("berlins description");
        expect(berlinRoutePart.content.image).toBe("images in berlin");
        expect(berlinRoutePart.geoCoordinates.geoCoordinates[0].city).toBe("Berlin");

        RouteDataService.saveRoutePartByName("Kuala Lumpur", "KLs description", "images in KL");
        expect(RouteDataService.getRouteParts().length).toBe(2);
        expect(berlinRoutePart.content.description).toBe("berlins description");
        expect(berlinRoutePart.content.image).toBe("images in berlin");
    });

    it('should call save method on Factory when latitude longitude is added via map for a single point', function () {
        RouteDataService.init(new Route("My Route I drew on the map"));
        var singleRoutePoint = {lat: "11.11", lng: "22.22"};
        RouteDataService.saveRoutePointByLatLng(singleRoutePoint);
        expect(RouteDataService.getRoutePoints().length).toBe(1);

        expect(RouteDataService.getRoutePoints()[0].getLatLng().lat).toEqual("11.11");
        expect(RouteDataService.getRoutePoints()[0].getLatLng().lng).toEqual("22.22");
    });

    it('should call save method on Factory when latitude longitude is added via map for a routepart with two points', function () {
        RouteDataService.init(new Route("My Route I drew on the map"));

        RouteDataService.saveRoutePartByLatLngs({lat: "33.33", lng: "44.44"}, {lat: "55.55", lng: "66.66"});
        expect(RouteDataService.getRouteParts()[0].geoCoordinates.geoCoordinates[0].lat).toEqual("33.33");
        expect(RouteDataService.getRouteParts()[0].geoCoordinates.geoCoordinates[0].lng).toEqual("44.44");

        expect(RouteDataService.getRouteParts()[0].geoCoordinates.geoCoordinates[1].lat).toEqual("55.55");
        expect(RouteDataService.getRouteParts()[0].geoCoordinates.geoCoordinates[1].lng).toEqual("66.66");
    });

    it('should call save method on Factory when latitude longitude is added via map for a routepart with more then two points', function () {
        RouteDataService.init(new Route("My Route I drew on the map"));

        RouteDataService.saveRoutePartByLatLngs(
            {lat: "33.33", lng: "33.33"},
            {lat: "55.55", lng: "55.55"},
            {lat: "66.66", lng: "66.66"},
            {lat: "77.77", lng: "77.77"},
            {lat: "88.88", lng: "88.88"});

        expect(RouteDataService.getRouteParts()[0].geoCoordinates.geoCoordinates[0].lat).toEqual("33.33");
        expect(RouteDataService.getRouteParts()[0].geoCoordinates.geoCoordinates[0].lng).toEqual("33.33");
        expect(RouteDataService.getRouteParts()[0].geoCoordinates.geoCoordinates[1].lat).toEqual("55.55");
        expect(RouteDataService.getRouteParts()[0].geoCoordinates.geoCoordinates[1].lng).toEqual("55.55");

        expect(RouteDataService.getRouteParts()[0].geoCoordinates.geoCoordinates[2].lat).toEqual("66.66");
        expect(RouteDataService.getRouteParts()[0].geoCoordinates.geoCoordinates[2].lng).toEqual("66.66");

        expect(RouteDataService.getRouteParts()[0].geoCoordinates.geoCoordinates[3].lat).toEqual("77.77");
        expect(RouteDataService.getRouteParts()[0].geoCoordinates.geoCoordinates[3].lng).toEqual("77.77");

        expect(RouteDataService.getRouteParts()[0].geoCoordinates.geoCoordinates[4].lat).toEqual("88.88");
        expect(RouteDataService.getRouteParts()[0].geoCoordinates.geoCoordinates[4].lng).toEqual("88.88");

        RouteDataService.saveRoutePartByLatLngs(
                    {lat: "11.11", lng: "11.11"},
            {lat: "22.22", lng: "22.22"});
        expect(RouteDataService.getRouteParts()[1].geoCoordinates.geoCoordinates[0].lat).toEqual("11.11");
        expect(RouteDataService.getRouteParts()[1].geoCoordinates.geoCoordinates[0].lng).toEqual("11.11");
        expect(RouteDataService.getRouteParts()[1].geoCoordinates.geoCoordinates[1].lat).toEqual("22.22");
        expect(RouteDataService.getRouteParts()[1].geoCoordinates.geoCoordinates[1].lng).toEqual("22.22");
    });

    it('should change current to new selection when selectRoutePartByLatLngs is been called', function () {
        var route = new Route("My way through Asia");
        var rp = new RoutePart(new Content("some description", "some image"), new GeoCoordinates([
            new GeoCoordinate({lat: "1", lng: "2"}, "Kopenhagen"),
            new GeoCoordinate({lat: "2", lng: "3"}, "Brisbane")]));
        var rp2 = new RoutePart(new Content("some other description", "some other image"), new GeoCoordinates([
            new GeoCoordinate({lat: "1", lng: "2"}, "Brazil"),
            new GeoCoordinate({lat: "2", lng: "3"}, "Wellington")]));

        route.addRoutePart(rp);
        route.addRoutePart(rp2);
        RouteDataService.init(route);

        expect(RouteDataService.getCurrentlySelectedRoutePart()).toEqual(undefined);

        RouteDataService.selectRoutePart(0);
        expect(RouteDataService.getCurrentlySelectedRoutePart()).toEqual(rp);

        RouteDataService.selectRoutePart(1);
        expect(RouteDataService.getCurrentlySelectedRoutePart()).toEqual(rp2);
    });

    it('should deselect all selections when deselect is been called', function () {
        var route = new Route("My way through Asia");
        var rp = new RoutePart(new Content("some description", "some image"), new GeoCoordinates([
            new GeoCoordinate({lat: "1", lng: "2"}, "Kopenhagen"),
            new GeoCoordinate({lat: "2", lng: "3"}, "Brisbane")]));
        var rp2 = new RoutePart(new Content("some other description", "some other image"), new GeoCoordinates([
            new GeoCoordinate({lat: "1", lng: "2"}, "Brazil"),
            new GeoCoordinate({lat: "2", lng: "3"}, "Wellington")]));

        route.addRoutePart(rp);
        route.addRoutePart(rp2);
        RouteDataService.init(route);

        expect(RouteDataService.getCurrentlySelectedRoutePart()).toEqual(undefined);

        RouteDataService.selectRoutePart(0);
        expect(RouteDataService.getCurrentlySelectedRoutePart()).toEqual(rp);

        RouteDataService.resetCurrentSelection();
        expect(RouteDataService.getCurrentlySelectedRoutePart()).toEqual(undefined);

    });
});
