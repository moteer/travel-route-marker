var routeParts = {}

function getContentFor(multipolyLine) {
    var result = "empty";

    if (multipolyLine !== undefined && routeParts[multipolyLine.getLatLngs().toString()] !== undefined) {
        result = routeParts[multipolyLine.getLatLngs().toString()];
    }
    return result;
}

function createContentFor(multiPolyLine, content) {
    routeParts[multiPolyLine.getLatLngs().toString()] = content;
}
