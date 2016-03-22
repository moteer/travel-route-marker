function Route(titel) {
    var routePoints = new Array();
    var routeParts = [];
    this.titel = titel;

    this.addRoutePoint = function(point) {
        routePoints.push(point);
    };

    this.getRoutePoints = function() {
        return routePoints;
    };

    this.getRouteParts = function () {
        return routeParts;
    };

    this.addRoutePart = function (routePart) {
        routeParts.push(routePart);
    };

    this.getTitel = function () {
        return this.titel;
    };
}

function Content(description, image) {

    this.description = description;
    this.image = image;

    this.toString = function () {
        return this.description + " | " + this.image
    };
}

function TimePeriod() {

}

function GeoCoordinates(geoCoordinates) {
    //this.geoCoordinates = [];
    console.log("geoCoordinates.length:" + geoCoordinates.length);
    this.geoCoordinates = geoCoordinates;
}

function GeoCoordinate(latLng, city) {
    this.lat = latLng.lat;
    this.lng = latLng.lng;
    this.city = city;
}

function RoutePoint(latLng) {
    var latLng = latLng;

    this.getLatLngs = function () {
        return latLng;
    };
}

function RoutePart(content, geoCoordinates) {
    this.content = content;
    this.geoCoordinates = geoCoordinates;

    this.getGeoCoordinatesAsArray = function (){
        return this.geoCoordinates.geoCoordinates;
    };

    //getCities

    this.toString = function () {
        return this.content.toString();
    };
}
