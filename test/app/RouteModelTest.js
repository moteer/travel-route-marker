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
        var content = new Content("some titel", "some description", "some image");
        var timePeriod = new TimePeriod();
        var routePoint = new RoutePoint(latLng, content, timePeriod);

        route.addRoutePoint(routePoint);
        expect(route.getRoutePoints()[0].getLatLng()).toEqual(latLng);
        expect(route.getRoutePoints()[0].getContent()).toEqual(content);
        expect(route.getRoutePoints()[0].getTimePeriod()).toEqual(timePeriod);
    });

    it('routepoints should hold city, content and timeperiod', function () {
        var route = new Route("My first Route");

        var latLng = new LatLng({lat: 1.2, lng: 3.4}, "Amsterdam");
        var content = new Content("some titel", "some description", "some image");
        var timePeriod = new TimePeriod();
        var routePoint = new RoutePoint(latLng, content, timePeriod);

        route.addRoutePoint(routePoint);
        expect(route.getRoutePoints()[0].getLatLng()).toEqual(latLng);
        expect(route.getRoutePoints()[0].getContent()).toEqual(content);
        expect(route.getRoutePoints()[0].getTimePeriod()).toEqual(timePeriod);
    });


    it('routepoints should be conected via routesection', function () {
        var route = new Route("My first Route");

        var content = new Content("some titel", "some description", "some image");
        var timePeriod = new TimePeriod({from: "01.01.2015", to: "01.01.2016"});
        var latLng = new LatLng({lat: 1.2, lng: 3.4});
        var routePoint = new RoutePoint(latLng, content, timePeriod);

        var content2 = new Content("some titel", "some titel", "some other description", "some other image");
        var timePeriod2 = new TimePeriod({from: "01.01.2014", to: "01.01.2016"});
        var latLng2 = new LatLng({lat: 5.6, lng: 7.8});
        var routePoint2 = new RoutePoint(latLng2, content2, timePeriod2);

        route.addRoutePoint(routePoint);
        route.addRoutePoint(routePoint2);

        var sectionContent = new Content("some titel", "This is my way from point one to point two", "including some images");
        var routeSection = new RouteSection(routePoint, routePoint2, sectionContent);
        route.addRouteSection(routeSection);

        expect(route.getRoutePoints().length).toBe(2);
        expect(route.getRouteSections().length).toBe(1);

        expect(route.getRouteSections()[0]).toBe(routeSection);
        expect(routeSection.getContent()).toBe(sectionContent);
        expect(routeSection.getFromRoutePoint()).toBe(routePoint);
        expect(routeSection.getToRoutePoint()).toBe(routePoint2);
    });

    it('routepoints should provide a shortDescriptor', function () {

        var content = new Content("this is my titel", "some description", "some image");
        var timePeriod = new TimePeriod({from: "01.01.2015", to: "01.01.2016"});
        var latLng = new LatLng({lat: 1.2, lng: 3.4});
        var routePoint = new RoutePoint(latLng, content, timePeriod);

        expect(routePoint.getShortDescriptor()).toBe("this is my titel");
    });

    it('routesections should provide a shortDescriptor', function () {

        var content = new Content("some titel", "some description", "some image");
        var timePeriod = new TimePeriod({from: "01.01.2015", to: "01.01.2016"});
        var latLng = new LatLng({lat: 1.2, lng: 3.4}, "Berlin");
        var fromRoutePoint = new RoutePoint(latLng, content, timePeriod);

        var content2 = new Content("some titel", "some titel", "some other description", "some other image");
        var timePeriod2 = new TimePeriod({from: "01.01.2014", to: "01.01.2016"});
        var latLng2 = new LatLng({lat: 5.6, lng: 7.8}, "Hamburg");
        var toRoutePoint = new RoutePoint(latLng2, content2, timePeriod2);


        var sectionContent = new Content("this is my titel", "This is my way from point one to point two", "including some images");
        var routeSection = new RouteSection(fromRoutePoint, toRoutePoint, sectionContent);
        expect(routeSection.getShortDescriptor()).toBe("Berlin to Hamburg");
    });

});
