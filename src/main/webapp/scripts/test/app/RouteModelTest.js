describe('Route Model Test', function () {


    it('should create empty route', function () {
        var route = new Route("My first Route");
        expect(route.getTitel()).toBe("My first Route");
        expect(route.getRoutePoints().length).toBe(0);
    });

    it('route should hold RoutePoints when add route point is called', function () {
        var route = new Route("My first Route");

        var latLng = new LatLng({lat: 1.2, lng: 3.4});
        var routePoint = new RoutePoint(latLng);

        route.addRoutePoint(routePoint);
        expect(route.getRoutePoints().length).toBe(1);
        expect(route.getRoutePoints()[0]).toEqual(routePoint);

        var latLng2 = new LatLng({lat: 5.6, lng: 7.8});
        var routePoint2 = new RoutePoint(latLng2);
        route.addRoutePoint(routePoint2);

        expect(route.getRoutePoints().length).toBe(2);
        expect(route.getRoutePoints()[0]).toEqual(routePoint);
        expect(route.getRoutePoints()[1]).toEqual(routePoint2);
    });

    it('routepoints should hold latlng, content and timeperiod', function () {
        var route = new Route("My first Route");

        var latLng = new LatLng({lat: 1.2, lng: 3.4});
        var content = new Content("some description", "some image");
        var timePeriod = new TimePeriod();
        var routePoint = new RoutePoint(latLng, content, timePeriod);

        route.addRoutePoint(routePoint);
        expect(route.getRoutePoints()[0].getLatLng()).toEqual(latLng);
        expect(route.getRoutePoints()[0].getContent()).toEqual(content);
        expect(route.getRoutePoints()[0].getTimePeriod()).toEqual(timePeriod);
    });

    it('routepoints should be conected via routeparts', function () {
        var route = new Route("My first Route");

        var content = new Content("some description", "some image");
        var timePeriod = new TimePeriod({from: "01.01.2015", to: "01.01.2016"});
        var latLng = new LatLng({lat: 1.2, lng: 3.4});
        var routePoint = new RoutePoint(latLng, content, timePeriod);

        var content2 = new Content("some other description", "some other image");
        var timePeriod2 = new TimePeriod({from: "01.01.2014", to: "01.01.2016"});
        var latLng2 = new LatLng({lat: 5.6, lng: 7.8});
        var routePoint2 = new RoutePoint(latLng2, content2, timePeriod2);

        route.addRoutePoint(routePoint);
        route.addRoutePoint(routePoint2);
        route.addConnection(routePoint, routePoint2);

        expect(route.getRoutePoints().length).toBe(2);
        expect(route.getRouteParts().length).toBe(1);

    });


    //it('create route', function () {
    //    var route = new Route("My first travel experience.");
    //    var content = new Content("some description", "some image");
    //    //var timePeriod = new TimePeriod("1.1.2016", "1.2.2016");
    //    var geoCoordinates = new GeoCoordinates([
    //        new GeoCoordinate({lat: "1", lng: "2"}, "Kopenhagen"),
    //        new GeoCoordinate({lat: "2", lng: "3"}, "Brisbane")]);
    //    var rp = new RoutePart(content, geoCoordinates);
    //    route.addRoutePart(rp);
    //
    //    RouteDataService.init(route);
    //    expect(RouteDataService.getRoute()).toEqual(route);
    //    expect(RouteDataService.getRouteParts()).toEqual([rp]);
    //    expect(RouteDataService.getRouteParts()).toContain(rp);
    //    expect(RouteDataService.getNumberOfRouteParts()).toBe(1);
    //
    //    expect(RouteDataService.getRouteParts()[0].toString()).toBe("some description | some image");
    //
    //    // add another routePart
    //    var rpNew = new RoutePart(new Content("new description", "new image"),
    //        new TimePeriod(),
    //        new GeoCoordinates(
    //            new GeoCoordinate({lat: "5", lng: "6"}, "Dubai"),
    //            new GeoCoordinate({lat: "7", lng: "8"}, "Phnom Phen")));
    //
    //    route.addRoutePart(rpNew);
    //
    //    expect(RouteDataService.getRoute()).toEqual(route);
    //    expect(RouteDataService.getRouteParts()).toContain(rp);
    //    expect(RouteDataService.getRouteParts()).toContain(rpNew);
    //    expect(RouteDataService.getNumberOfRouteParts()).toBe(2);
    //
    //    expect(RouteDataService.getRouteParts()[0].toString()).toBe("some description | some image");
    //    expect(RouteDataService.getRouteParts()[0].content.description).toBe("some description");
    //    expect(RouteDataService.getRouteParts()[0].content.image).toBe("some image");
    //
    //    expect(RouteDataService.getRouteParts()[1].toString()).toBe("new description | new image");
    //    expect(RouteDataService.getRouteParts()[1].content.description).toBe("new description");
    //    expect(RouteDataService.getRouteParts()[1].content.image).toBe("new image");
    //
    //});

});
