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

    this.clear = function () {
        routePartElements.clear();
    }

    this.getMap = function () {
        return routePartElements;
    };

    Object.prototype.toString = function () {
        var result;
        routePartElements.forEach(function(value, key, map) {
            var mapEntry = "m[" + key + "] = " + value;
            console.log(mapEntry);
            result = mapEntry;
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

    Object.prototype.toString = function () {
        return "Description: " + description + ", image: " + image;
    }
}
//creates global instance where all Routs will be hold in.
var routeParts = new RouteParts();
