function RouteParts() {
    var routePartElements = new Map();

    this.saveRoutePartElement = function (multiPolyLine, content) {
        routePartElements.set(multiPolyLine, content);
    };

    this.getRoutePartElementFor = function (multipolyLine) {
        var result = "empty";

        if (multipolyLine !== undefined && routePartElements.get(multipolyLine) !== undefined) {
            result = routePartElements.get(multipolyLine);
        }
        return result;
    };

    this.clearAllRoutePartElements = function () {
        routePartElements.clear();
    };

    this.getMap = function () {
        return routePartElements;
    };

    this.toString = function () {
        var result = routePartElements.size === 0 ? "EMPTY": "";
        routePartElements.forEach(function(value, key, map) {
            var mapEntry = "m[" + key + "] = " + value;
            console.log(mapEntry);
            result = result + " | " + mapEntry;
        });
        return result;
    }
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

    this.toString = function () {
        return "Description: " + description + ", image: " + image;
    }
}
//creates global instance where all Routs will be hold in.
var routeParts = new RouteParts();
