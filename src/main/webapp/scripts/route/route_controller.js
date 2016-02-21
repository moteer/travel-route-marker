function addNewListEntrie(description) {
    var routePartList = document.getElementById("routePartList");
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(description));
    routePartList.appendChild(li);
}

function displayControllFor(multiPolyLine) {
    var descriptionTextBox = document.getElementById("descriptionTextBox");
    descriptionTextBox.style.visibility = "visible";
    descriptionTextBox.value = routeParts.getContentFor(multiPolyLine).getDescription();

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
    var iterator = routeParts.getIterator();
    while(iterator.hasNext()) {
        addNewListEntrie(iterator.next().value);
    }
}
