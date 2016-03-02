var points = [[51.343392, 12.532735]];

function addModusIsActive() {
    return document.getElementById("routeAddModusCheckBox").checked == true;
}


function Leafletcontroller() {

    var latLngs = [];

    function isInitialLatLngPresent() {
        return latLngs.length > 0;
    }

    function getLatestLatLng(e) {
        var latest = undefined;
        if (latLngs.length > 0) {
            latest = latLngs[latLngs.length - 1]
        }
        return latest;
    }

    function createAndSaveNewLatLng(e) {
        var latLng = L.latLng(e.latlng.lat, e.latlng.lng);
        latLngs.push(latLng);
        return latLng;
    }

    function createAndDisplayNewPolyLine(startLatLng, endLatLng) {
        var myNewPolyLine = L.polyline([startLatLng, endLatLng], {
            color: 'red',
            weight: 3,
            opacity: 0.5,
            smoothFactor: 1

        }).addTo(map);

        L.featureGroup([myNewPolyLine])
            .on('click', function () {
                if (addModusIsActive()) {
                    alert("check checkbox to change to select mode");
                } else {
                    controller.addEmptyRoutePart(L.multiPolyline([startLatLng], [endLatLng]));
                }
            }).addTo(map);
    }

    function onMapClick(e) {
        if (addModusIsActive()) {
            if (isInitialLatLngPresent()) {
                var oldLatLng = getLatestLatLng(e);
                var newLatLng = createAndSaveNewLatLng(e);
                createAndDisplayNewPolyLine(oldLatLng, newLatLng);
            } else {
                createAndSaveNewLatLng(e);
            }
        }
    }

    this.createAndDisplay = function () {
        var map = L.map('map').setView([51.343392, 12.332735]);
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibW90ZWVyIiwiYSI6ImNpbDhodXh2ZzBjbnp1cG0yMjYxd2c0MjcifQ.cmyXxY6rg1fhX0wTjm3eig', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
            '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="http://mapbox.com">Mapbox</a>',
            id: 'mapbox.streets'
        }).addTo(map);
        var points = [[51.343392, 12.532735]];
        var selectedPoints = [];
        var polyline = L.polyline(points, {color: 'red'}).addTo(map);
        map.fitBounds(polyline.getBounds());
        map.on('click', onMapClick);
        return map;
    };


}

var leafletController = new Leafletcontroller();
var map = leafletController.createAndDisplay();
