mapApp.service('RouteDataService', function () {

    this.route = null;

    this.createNewRoute = function (titel) {
        this.route = new Route(titel);
    };

    this.init = function (route) {
        this.route = route;
    };

    this.getRoute = function () {
        return this.route;
    };

    this.getNumberOfRouteParts = function () {
        return this.getRouteParts().length;
    };

    this.getRouteParts = function () {
        if (this.route === null) {
            return [];
        }
        return this.route.getRouteParts();
    };

    this.getTitel = function () {
        if (this.route === null) {
            return "...";
        }
        return this.route.getTitel();
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

    this.selectRoutePart = function (index) {
        this.currenSelectionIndex = index;
    };

    this.getCurrentlySelectedRoutePart = function () {
        return this.getRouteParts()[this.currenSelectionIndex];
    };

    this.resetCurrentSelection = function () {
        this.currenSelectionIndex = undefined;
    };
});
