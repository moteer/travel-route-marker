mapApp.factory('RouteFactory', function () {
    this.route = {};

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

    this.saveRoutePointByName = function (cityName, description, image) {
        var emptyLatLng = {lat: "0.0", lng: "0.0"};
        this.route.addRoutePart(
            new RoutePart(
                new Content(description, image),
                new GeoCoordinates(
                    new GeoCoordinate(emptyLatLng, cityName)
                )));
    };

    return this;
});
