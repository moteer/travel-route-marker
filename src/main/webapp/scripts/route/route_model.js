function RouteParts() {
    var routePartElements = new Map();

    this.add = function (multiPolyLine, content) {
        routePartElements.set(multiPolyLine.getLatLngs().toString(), content);
    };

    this.getContentFor = function (multipolyLine) {
        var result = "empty";

        if (multipolyLine !== undefined && routePartElements.get(multipolyLine.getLatLngs().toString()) !== undefined) {
            result = routePartElements.get(multipolyLine.getLatLngs().toString());
        }
        return result;
    };

    this.clearRouteParts = function () {
        routePartElements = {};
    };

    this.getIterator = function () {
        return new RoutePartIterator(routePartElements);
    };

    Object.prototype.toString = function () {
        var iterator = routeParts.getIterator();
        var result = "[";
        while (iterator.hasNext()) {
            result = iterator.next().value.toString() + ", ";
        }
        return result + "]";
    }
}

function RoutePartIterator(routePartElements) {
    var nextIndex = 0;

    this.hasNext = function () {
        return nextIndex < routePartElements.size ? true : false;
    };

    this.next = function () {
        return nextIndex < routePartElements.size ?
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
