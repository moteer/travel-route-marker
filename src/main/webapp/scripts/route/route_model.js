function RouteParts() {
    var routePartElements = {};

    this.add = function (multiPolyLine, content) {
        routePartElements[multiPolyLine.getLatLngs().toString()] = content;
    };

    this.getContentFor = function (multipolyLine) {
        var result = "empty";

        if (multipolyLine !== undefined && routePartElements[multipolyLine.getLatLngs().toString()] !== undefined) {
            result = routePartElements[multipolyLine.getLatLngs().toString()];
        }
        return result;
    };

    this.clearRouteParts = function () {
        routePartElements = {};
    };

    this.getIterator = function () {
        return new RoutePartIterator(routePartElements);
    };
}

function RoutePartIterator(routePartElements) {
    var nextIndex = 0;

    this.hasNext = function () {
        return nextIndex < routePartElements.length ? false : true;
    };

    this.next = function () {
        return nextIndex < routePartElements.length ?
        {value: routePartElements[nextIndex++], done: false} :
        {done: true};
    };
}

function Content(description, image) {
    var description = description;
    var image = image;

    this.getDescription = function () {
        return description;
    };

    this.getImage = function () {
        return image;
    };

    Object.prototype.toString = function () {
        return "Description: " + description + ", image: " + image;
    }
}
//creates global instance where all Routs will be hold in.
var routeParts = new RouteParts();
