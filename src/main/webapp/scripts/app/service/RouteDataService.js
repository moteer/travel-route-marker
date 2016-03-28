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

    this.getNumberOfRouteSections = function () {
        return this.getRouteSections().length;
    };

    //TODO: deprecated
    this.getNumberOfRouteParts = function () {
        return this.getRouteParts().length;
    };

    this.getRoutePoints = function () {
        if (this.route === null) {
            return [];
        }
        return this.route.getRoutePoints();
    };

    this.getRouteSections = function () {
        if (this.route === null) {
            return [];
        }
        return this.route.getRouteSections();
    };

    //TODO: deprecated
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

    this.saveRouteSection = function (routePointA, routePointB, content) {
        var routeSection = new RouteSection(routePointA, routePointB, content);
        this.route.addRoutePoint(routePointA);
        this.route.addRoutePoint(routePointB);
        this.route.addRouteSection(routeSection);    
    };

    //TODO: deprecated
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

    this.saveRoutePointByName = function (latLng, content, timePeriod) {
        var routePoint = new RoutePoint(latLng, content, timePeriod);
        this.route.addRoutePoint(routePoint);
    };


    this.saveRoutePointByLatLng = function (latLng) {
        var routePoint = new RoutePoint(latLng);
        this.route.addRoutePoint(routePoint);
    };

    function extractGeoCoordinatesFromLatLngs(arguments) {
        var geoCoordinates = [];

        for (var i = 0; i < arguments.length; i++) {
            geoCoordinates.push(arguments[i]);
        }
        return geoCoordinates;
    }

    //TODO: deprecated
    this.saveRoutePartByLatLngs = function (latLngs) {
        var geoCoordinates = extractGeoCoordinatesFromLatLngs(arguments);
        this.route.addRoutePart(
            new RoutePart(
                undefined,
                new GeoCoordinates(
                    geoCoordinates
                )));
    };

    //TODO: deprecated
    this.selectRoutePart = function (index) {
        this.currenSelectionIndex = index;
    };

    //TODO: deprecated
    this.getCurrentlySelectedRoutePart = function () {
        return this.getRouteParts()[this.currenSelectionIndex];
    };

    //TODO: deprecated
    this.resetCurrentSelection = function () {
        this.currenSelectionIndex = undefined;
    };
});
