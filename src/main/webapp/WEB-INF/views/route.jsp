<!DOCTYPE html>
<html>
<head>
    <script type="text/javascript" src="../../scripts/jquery-2.1.4.js"></script>
    <script src="http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.js"></script>

    <title>Leaflet Quick Start Guide Example</title>
    <meta charset="utf-8"/>

    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

    <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.css"/>
</head>
<body>
<div id="map" style="width: 600px; height: 400px"></div>


<script type="text/javascript">

    $(document).ready(function () {
    });

    var map = L.map('map').setView([51.343392, 12.332735]);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IjZjNmRjNzk3ZmE2MTcwOTEwMGY0MzU3YjUzOWFmNWZhIn0.Y8bhBaUMqFiPrDRW9hieoQ', {
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

    var popup = L.popup();

    function onMapClick(e) {

        var newpoint = e.latlng;
        var polylinePoints = null;
        if (points.length == 0) {
            polylinePoints = [[newpoint]];
        } else {
            var prevLat = [points[points.length - 1]][0][0];
            var prevLng = [points[points.length - 1]][0][1];
            polylinePoints = [[prevLat, prevLng], [newpoint.lat, newpoint.lng]];
            points.push([newpoint.lat, newpoint.lng]);
        }
        var pl = L.polyline(polylinePoints, {color: "blue"}).addTo(map);
        sendAjax(newpoint.lat, newpoint.lng);

        L.featureGroup([pl])
//            .bindPopup('Hello world!')
                .on('click', function () {
                    if (isSelectedAlready(polylinePoints)) {
                        deselectPoint(polylinePoints)
                        pl.setStyle({color: "blue"});
                    } else {
                        selectedPoints.push(polylinePoints);
                        pl.setStyle({color: "red"});
                    }
                })
                .addTo(map);

    }

    map.on('click', onMapClick);

    function isSelectedAlready(polylinePoints) {
        for (i = 0; i < selectedPoints.length; i++) {
            if (selectedPoints[i] == polylinePoints) {
                return true;
            }
        }
        return false;
    }


    function deselectPoint(polylinePoints) {
        for (i = 0; i < selectedPoints.length; i++) {
            if (selectedPoints[i] == polylinePoints) {
                selectedPoints.splice(i, 1);
                return;
            }
        }
    }


    function sendAjax(longitude, latitude) {

        $.ajax({
            url: "/route/safe",
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(
                    {
                        "longitude": longitude,
                        "latitude": latitude
                    }),
            contentType: 'application/json',
            mimeType: 'application/json',
            success: function (data) {
                $('table').append('<tr><td>' + data.latitude + '</td><td>' + data.longitude + '</td></tr>');
            },
            error: function (data, status, er) {
                alert("error: " + data + " status: " + status + " er:" + er);
            }
        });
    }

    function get_random_color() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.round(Math.random() * 15)];
        }
        return color;
    }

</script>
<p></p>


<table>
</table>
<%--<c:if test="${not empty lists}">--%>

<%--<ul>--%>
<%--<c:forEach var="lnglat" items="${route}">--%>
<%--<li>${lnglat}</li>--%>
<%--</c:forEach>--%>
<%--</ul>--%>

<%--</c:if>--%>
</body>
</html>
