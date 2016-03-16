mapApp.factory('RouteFactory', function () {

    this.route = {};

    var fakeRoute = new Route("My first travel experience.");
    var content = new Content("some description", "some image");
    var timePeriod = new TimePeriod("1.1.2016", "1.2.2016");
    var geoCoordinates = new GeoCoordinates(
        new GeoCoordinate({lat:"11.11", lng:"11.11"}),
        new GeoCoordinate({lat:"22.22", lng:"22.22"}));
    var rp = new RoutePart(content, timePeriod, geoCoordinates);
    fakeRoute.addRoutePart(rp);
    fakeRoute.addRoutePart(new RoutePart(new Content("new description", "new image"),
        new TimePeriod(),
        new GeoCoordinates(
            new GeoCoordinate({lat:"12.11", lng:"11.11"}, "Hamburg"),
            new GeoCoordinate({lat:"13.11", lng:"11.11"}, "Dresden"))));

    this.init = function (route) {
        this.route = route;
    };

    this.init(fakeRoute);

    this.getRoute = function () {
        return this.route;
    };

    this.getNumberOfRouteParts = function (route) {
        this.route;
    };

    this.getNumberOfRouteParts = function () {
        return this.route.getRouteParts().length;
    };

    this.getRouteParts = function () {
        return this.route.getRouteParts();
    };

    this.titel = function () {
        return this.route.titel;
    };

    this.saveRoutePartByName = function (cityName, description, image) {
        var emptyLatLng = {lat: "0.0", lng: "0.0"};

        var geoCoordinates = [new GeoCoordinate(emptyLatLng, cityName)];

        this.route.addRoutePart(
            new RoutePart(
                new Content(description, image),
                new GeoCoordinates(
                    geoCoordinates
                )));
    };

    function extractGeoCoordinatesFromLatLngs(arguments) {
        var geoCoordinates = [];

        for (var i = 0; i < arguments.length; i++) {
            geoCoordinates.push(arguments[i]);
        }
        return geoCoordinates;
    }

    this.saveRoutePartByLatLngs = function (latLngs) {
        var geoCoordinates = extractGeoCoordinatesFromLatLngs(arguments);
        this.route.addRoutePart(
            new RoutePart(
                undefined,
                new GeoCoordinates(
                    geoCoordinates
                )));
    };

    return this;
});
