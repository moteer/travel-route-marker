function addNewListEntrie(description) {
    var routePartList = document.getElementById("routePartList");
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(description));
    routePartList.appendChild(li);
}

function displayControllFor(multiPolyLine) {
    var descriptionTextBox = document.getElementById("descriptionTextBox");
    descriptionTextBox.style.visibility = "visible";
    descriptionTextBox.value = getContentFor(multiPolyLine).description;

    var image = document.getElementById("image");
    image.style.visibility = "visible";

    var latLng = document.getElementById("latLng");
    latLng.innerHTML = multiPolyLine.getLatLngs().toString();
    addNewListEntrie();
}

function clearRoutePartList() {
    var routePartList = document.getElementById("routePartList");
    for(var i=0; i < routePartList.childElementCount; i++) {
        routePartList.removeChild(routePartList.childNodes[i]);
    }
}

function updateRoutePartList(routeParts) {
    clearRoutePartList();
    for (var routePart in routeParts) {
        addNewListEntrie(routePart.toString());
    }
}
