//var points = [[51.343392, 12.532735]];

//function addModusIsActive() {
//    return document.getElementById("routeAddModusCheckBox").checked == true;
//}


function Leafletcontroller() {

    //var latLngs = [];
    //var currentSelectedPolyLines = [];
    //
    //function isInitialLatLngPresent() {
    //    return latLngs.length > 0;
    //}
    //
    //function getLatestLatLng(e) {
    //    var latest = undefined;
    //    if (latLngs.length > 0) {
    //        latest = latLngs[latLngs.length - 1]
    //    }
    //    return latest;
    //}
    //
    //function createAndSaveNewLatLng(e) {
    //    var latLng = L.latLng(e.latlng.lat, e.latlng.lng);
    //    latLngs.push(latLng);
    //    return latLng;
    //}
    //
    //function showMessage(msg) {
    //    document.getElementById("notifier").textContent = msg;
    //}
    //
    //function markRoutePartAsSelected(polyLine) {
    //    polyLine.setStyle({color: "orange"});
    //}
    //
    //this.checkBoxChange = function (checkBox) {
    //    for (var i=0; i< currentSelectedPolyLines.length; i++) {
    //        currentSelectedPolyLines[i].setStyle({color: "blue"});
    //    }
    //    currentSelectedPolyLines = [];
    //}
    //
    //function selectRoutePart(polyLine) {
    //    markRoutePartAsSelected(polyLine);
    //    currentSelectedPolyLines.push(polyLine);
    //    controller.addEmptyRoutePart(L.multiPolyline(currentSelectedPolyLines));
    //}
    //
    //function createAndDisplayNewPolyLine(startLatLng, endLatLng) {
    //    var myNewPolyLine = L.polyline([startLatLng, endLatLng], {
    //        color: 'red',
    //        weight: 9,
    //        opacity: 0.5,
    //        smoothFactor: 1
    //
    //    }).addTo(map);
    //
    //    L.featureGroup([myNewPolyLine])
    //        .on('click', function () {
    //            if (addModusIsActive()) {
    //                showMessage("to select route parts turn off edit mode");
    //            } else {
    //                showMessage("you can select multiple route parts");
    //                selectRoutePart(myNewPolyLine);
    //            }
    //        }).addTo(map);
    //}
    //
    //function onMapClick(e) {
    //    if (addModusIsActive()) {
    //        showMessage("click on Map to add Route Parts");
    //        if (isInitialLatLngPresent()) {
    //            var oldLatLng = getLatestLatLng(e);
    //            var newLatLng = createAndSaveNewLatLng(e);
    //            createAndDisplayNewPolyLine(oldLatLng, newLatLng);
    //        } else {
    //            createAndSaveNewLatLng(e);
    //        }
    //    } else {
    //        showMessage("check checkbox to change to add mode or select Route Parts to edit them");
    //    }
    //}

    this.createAndDisplay = function () {
        var map = L.map('map').setView([51.343392, 12.332735]);
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibW90ZWVyIiwiYSI6ImNpbDhodXh2ZzBjbnp1cG0yMjYxd2c0MjcifQ.cmyXxY6rg1fhX0wTjm3eig', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
            '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="http://mapbox.com">Mapbox</a>',
            id: 'mapbox.streets'
        }).addTo(map);

        ////TODO: set bounds to an initial country
        var points = [[51.343392, 12.532735]];
        var polyline = L.polyline(points, {color: 'red'}).addTo(map);
        map.fitBounds(polyline.getBounds());
        //map.on('click', onMapClick);
        return map;
    };
}

var leafletController = new Leafletcontroller();
var map = leafletController.createAndDisplay();



