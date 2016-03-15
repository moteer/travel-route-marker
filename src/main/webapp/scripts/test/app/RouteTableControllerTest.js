describe('RouteTableController with example content', function () {
    beforeEach(module('RouteTableApp'));

    var RouteTableController,
        scope;

    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        RouteTableController = $controller('RouteTableController', {
            $scope: scope
        });
    }));

    it('displays Route in table', function () {
        var route = new Route("My first travel experience.");
        var content = new Content("some description", "some image");
        var timePeriod = new TimePeriod("1.1.2016", "1.2.2016");
        var geoCoordinates = new GeoCoordinates(
            new GeoCoordinate("1", "2"),
            new GeoCoordinate("2", "3"));
        var rp = new RoutePart(content, timePeriod, geoCoordinates);
        route.addRoutePart(rp);

        scope.route = route;
        expect(scope.route).toEqual(route);
        expect(scope.getRouteParts()).toEqual([rp]);
        expect(scope.getRouteParts()).toContain(rp);
        expect(scope.getNumberOfRouteParts()).toBe(1);

        expect(scope.getRouteParts()[0].toString()).toBe("some description | some image");

        // add another routePart
        var rpNew = new RoutePart(new Content("new description", "new image"),
            new TimePeriod(),
            new GeoCoordinates(
                new GeoCoordinate("5", "6"),
                new GeoCoordinate("7", "8")));

        route.addRoutePart(rpNew);

        expect(scope.route).toEqual(route);
        expect(scope.getRouteParts()).toContain(rp);
        expect(scope.getRouteParts()).toContain(rpNew);
        expect(scope.getNumberOfRouteParts()).toBe(2);

        expect(scope.getRouteParts()[0].toString()).toBe("some description | some image");
        expect(scope.getRouteParts()[0].content.description).toBe("some description");
        expect(scope.getRouteParts()[0].content.image).toBe("some image");

        expect(scope.getRouteParts()[1].toString()).toBe("new description | new image");
        expect(scope.getRouteParts()[1].content.description).toBe("new description");
        expect(scope.getRouteParts()[1].content.image).toBe("new image");

    });

    it('should have a description and image when saved as a new routeParts to route', function () {
        scope.route = new Route("My route where I save something");
        expect(scope.titel()).toBe("My route where I save something");

        expect(scope.getRouteParts().length).toBe(0);

        scope.newDescription = "description to be saved";
        scope.newImage = "image to be saved";

        scope.saveRoutePart({lat: "11.11", lng: "11.11"});
        expect(scope.getRouteParts().length).toBe(1);
        expect(scope.getRouteParts()[0].content.description).toBe("description to be saved");
        expect(scope.getRouteParts()[0].content.image).toBe("image to be saved");


        scope.newDescription = "another description to be saved";
        scope.newImage = "another image to be saved";

        scope.saveRoutePart({lat: "11.11", lng: "11.11"});
        expect(scope.getRouteParts().length).toBe(2);
        expect(scope.getRouteParts()[0].content.description).toBe("description to be saved");
        expect(scope.getRouteParts()[0].content.image).toBe("image to be saved");
        expect(scope.getRouteParts()[1].content.description).toBe("another description to be saved");
        expect(scope.getRouteParts()[1].content.image).toBe("another image to be saved");
    });

    it('should have a latLngs in geoCoordinates assigned to routeParts under route', function () {
        scope.route = new Route("My route where I save something");

        scope.newDescription = "something not necesarry for this test";
        scope.newImage = "something not necesarry for this test";

        var singleRoutePoint = {lat: "11.11", lng: "22.22"};
        scope.saveRoutePart(singleRoutePoint);
        expect(scope.getRouteParts().length).toBe(1);

        expect(scope.getRouteParts()[0].geoCoordinates.geoCoordinates[0].lat).toEqual("11.11");
        expect(scope.getRouteParts()[0].geoCoordinates.geoCoordinates[0].lng).toEqual("22.22");

        scope.saveRoutePart({lat: "33.33", lng: "44.44"}, {lat: "55.55", lng: "66.66"});
        expect(scope.getRouteParts()[0].geoCoordinates.geoCoordinates[0].lat).toEqual("11.11");
        expect(scope.getRouteParts()[0].geoCoordinates.geoCoordinates[0].lng).toEqual("22.22");

        expect(scope.getRouteParts()[1].geoCoordinates.geoCoordinates[0].lat).toEqual("33.33");
        expect(scope.getRouteParts()[1].geoCoordinates.geoCoordinates[0].lng).toEqual("44.44");
        expect(scope.getRouteParts()[1].geoCoordinates.geoCoordinates[1].lat).toEqual("55.55");
        expect(scope.getRouteParts()[1].geoCoordinates.geoCoordinates[1].lng).toEqual("66.66");
    });

});



