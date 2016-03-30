function Route(titel) {
    this.routePoints = new Array();
    this.routeSections = new Array();
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

    this.addRouteSection = function (routeSection) {
        this.routeSections.push(routeSection);
    };

    this.getRouteSections = function () {
        return this.routeSections;
    };

    this.toString = function () {
        return JSON.stringify(this);
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
        return JSON.stringify(this);
    };
}

function TimePeriod(time) {
    this.time = time;

    this.getTime = function () {
        return this.time;
    };
}

function LatLng(latLng, city) {
    this.lat;
    this.lng;
    this.city = city;

    if (latLng !== null) {
        this.lat = latLng.lat;
        this.lng = latLng.lng;
    }

    this.getCity = function () {
        return this.city;
    };

    this.toString = function () {
        return JSON.stringify(this);
    };
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

    this.toString = function () {
        return JSON.stringify(this);
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

