function Route(titel) {
    var routeParts = [];
    this.titel = titel;

    this.getRouteParts = function () {
        return routeParts;
    };

    this.addRoutePart = function (routePart) {
        routeParts.push(routePart);
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

function RoutePart(content, geoCoordinates) {
    this.content = content;
    this.geoCoordinates = geoCoordinates;

    this.getGeoCoordinatesAsArray = function (){
        return this.geoCoordinates.geoCoordinates;
    };

    this.toString = function () {
        return this.content.toString();
    };
}
