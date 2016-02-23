function addNewListEntrie(lngLat, content) {
    var routePartList = document.getElementById("routePartTable");
    var row = routePartList.insertRow(routePartList.rows.length);
    row.insertCell(0).innerHTML = lngLat;
    row.insertCell(1).innerHTML = content.toString();
    row.insertCell(2).innerHTML = "<button>edit</button><button>delete</button>";
}

function displayControllFor(multiPolyLine) {
    var descriptionTextBox = document.getElementById("descriptionTextBox");
    descriptionTextBox.style.visibility = "visible";
    descriptionTextBox.value = routeParts.getContentFor(multiPolyLine).getDescription();

    var image = document.getElementById("image");
    image.style.visibility = "visible";

    var latLng = document.getElementById("latLng");
    latLng.innerHTML = multiPolyLine.getLatLngs().toString();
    updateRoutePartList();
}

function clearRoutePartList() {
    var routePartTable = document.getElementById("routePartTable");
    for(var i = routePartTable.rows.length - 1; i > 0; i--) {
        routePartTable.deleteRow(i);
    }
}

function updateRoutePartList() {
    clearRoutePartList();
    routeParts.getMap().forEach(function (value, key, map) {
        addNewListEntrie(key, value);
    });
}
