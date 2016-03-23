function Route(titel) {
    this.routePoints = new Array();
    this.routeParts = [];
    this.titel = titel;

    this.getTitel = function () {
        return this.titel;
    };

    this.addRoutePoint = function (point) {
        this.routePoints.push(point);
    };

    this.getRoutePoints = function () {
        return this.routePoints;
    };

    this.getRouteParts = function () {
        return this.routeParts;
    };

    this.addRoutePart = function (routePart) {
        this.routeParts.push(routePart);
    };

    this.addConnection(routePoint, routePoint) {

    };
}

function Content(description, image) {

    this.description = description;
    this.image = image;

    this.toString = function () {
        return this.description + " | " + this.image
    };
}

function TimePeriod(time) {
    this.time = time;

    this.getTime = function () {
        return this.time;
    };
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

function LatLng(latLng) {
    this.lat = latLng.lat;
    this.lng = latLng.lng;
}


function RoutePoint(latLng, content, timePeriod) {
    this.latLng = latLng;
    this.content = content;
    this.timePeriod = timePeriod;

    this.getLatLng = function () {
        return this.latLng;
    };

    this.getContent = function () {
        return this.content;
    };

    this.getTimePeriod = function () {
        return this.timePeriod;
    };
}

function RoutePart(content, geoCoordinates) {
    this.content = content;
    this.geoCoordinates = geoCoordinates;

    this.getGeoCoordinatesAsArray = function () {
        return this.geoCoordinates.geoCoordinates;
    };

    //getCities

    this.toString = function () {
        return this.content.toString();
    };
}
