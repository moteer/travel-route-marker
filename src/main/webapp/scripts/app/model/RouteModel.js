function Route(titel) {
    this.routePoints = new Array();
    this.routeSections  = new Array();
    this.titel = titel;
    
    //TODO: deprecated
    this.routeParts = [];
    
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

    this.addRouteSection = function (routeSection) {
        this.routeSections.push(routeSection);
    };

    this.getRouteSections = function () {
        return this.routeSections;
    };    
}

function Content(description, image) {

    this.description = description;
    this.image = image;

    this.getDescription = function () {
        return this.description;
    };

    this.getImage = function () {
        return this.image;
    };

    this.toString = function () {
        return this.description + " | " + this.image;
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

function LatLng(latLng, city) {
    this.lat = latLng.lat;
    this.lng = latLng.lng;
    this.city = city;
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

function RouteSection(fromRoutePoint, toRoutePoint, content) {
    this.content = content;
    this.fromRoutePoint = fromRoutePoint;
    this.toRoutePoint = toRoutePoint;
    
    this.getContent = function () {
        return this.content;
    };

    this.getFromRoutePoint = function () {
        return this.fromRoutePoint;
    };

    this.getToRoutePoint = function () {
        return this.toRoutePoint;
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
