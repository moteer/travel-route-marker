describe('RouteDataServiceTest', function () {

    beforeEach(function () {
        module('RouteApp');
    });

    beforeEach(inject(function (_RouteDataService_) {
        RouteDataService = _RouteDataService_;
    }));


// RouteDataService test
    it('displays Route in table', function () {
        var route = new Route("My first travel experience.");
        var content = new Content("some description", "some image");
        var timePeriod = new TimePeriod("1.1.2016", "1.2.2016");
        var geoCoordinates = new GeoCoordinates([
            new GeoCoordinate({lat: "1", lng: "2"}, "Kopenhagen"),
            new GeoCoordinate({lat: "2", lng: "3"}, "Brisbane")]);
        var rp = new RoutePart(content, timePeriod, geoCoordinates);
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

    it('should get titel and no RouteParts on initialisation of RouteDataService', function () {
        RouteDataService.init(new Route("My route where I save something"));
        expect(RouteDataService.titel()).toBe("My route where I save something");
        expect(RouteDataService.getRouteParts().length).toBe(0);
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

    it('should call save method on Factory when latitude longitude is added via map', function () {
        RouteDataService.init(new Route("My Route I drew on the map"));
        var singleRoutePoint = {lat: "11.11", lng: "22.22"};
        RouteDataService.saveRoutePartByLatLngs(singleRoutePoint);
        expect(RouteDataService.getRouteParts().length).toBe(1);

        expect(RouteDataService.getRouteParts()[0].geoCoordinates.geoCoordinates[0].lat).toEqual("11.11");
        expect(RouteDataService.getRouteParts()[0].geoCoordinates.geoCoordinates[0].lng).toEqual("22.22");

        RouteDataService.saveRoutePartByLatLngs({lat: "33.33", lng: "44.44"}, {lat: "55.55", lng: "66.66"});
        expect(RouteDataService.getRouteParts()[0].geoCoordinates.geoCoordinates[0].lat).toEqual("11.11");
        expect(RouteDataService.getRouteParts()[0].geoCoordinates.geoCoordinates[0].lng).toEqual("22.22");

        expect(RouteDataService.getRouteParts()[1].geoCoordinates.geoCoordinates[0].lat).toEqual("33.33");
        expect(RouteDataService.getRouteParts()[1].geoCoordinates.geoCoordinates[0].lng).toEqual("44.44");

        expect(RouteDataService.getRouteParts()[1].geoCoordinates.geoCoordinates[1].lat).toEqual("55.55");
        expect(RouteDataService.getRouteParts()[1].geoCoordinates.geoCoordinates[1].lng).toEqual("66.66");

        //TODO: same test for more than 2 points
    });

    it('should change current to new selection when selectRoutePartByLatLngs is been called', function () {
        var route = new Route("My way through Asia");
        var content = new Content("some description", "some image");
        var timePeriod = new TimePeriod("1.1.2016", "1.2.2016");
        var geoCoordinates = new GeoCoordinates([
            new GeoCoordinate({lat: "1", lng: "2"}, "Kopenhagen"),
            new GeoCoordinate({lat: "2", lng: "3"}, "Brisbane")]);
        var rp = new RoutePart(content, timePeriod, geoCoordinates);
        route.addRoutePart(rp);
        RouteDataService.init(route);


    });
});
