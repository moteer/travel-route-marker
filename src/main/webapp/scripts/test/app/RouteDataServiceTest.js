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
        var latLng = new LatLng({lat: "11.11", lng: "22.22"}, null);
        RouteDataService.saveRoutePointByLatLng(latLng);
        expect(RouteDataService.getRoutePoints().length).toBe(1);

        var routePoint = RouteDataService.getRoutePoints()[0];
        expect(routePoint.getLatLng()).toBe(latLng);
        
        var latLng2 = new LatLng({lat: "33.33", lng: "44.44"}, null);
        RouteDataService.saveRoutePointByLatLng(latLng2);
        expect(RouteDataService.getRoutePoints().length).toBe(2);
        
        var rp1 = RouteDataService.getRoutePoints()[0];
        var rp2 = RouteDataService.getRoutePoints()[1];
        expect(rp1.getLatLng()).toBe(latLng);
        expect(rp2.getLatLng()).toBe(latLng2);
    });

    it('should save RouteSection to RouteDatService', function () {
        RouteDataService.init(new Route("My Route I drew on the map"));
        
        //latLng, content, timePeriod
        var rp1 = new RoutePoint(new LatLng({}, "Hamburg"), new Content("rp1", "rp1"), new TimePeriod());
        var rp2 = new RoutePoint(new LatLng({lat:1.1, lng:2.2}, "Berlin"), new Content("rp1", "rp1"), new TimePeriod());
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
