<!DOCTYPE html>
<html>
<head>
    <script type="text/javascript" src="../../../scripts/jquery-2.1.4.js"></script>
    <script src="http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.js"></script>
    <title>moteer Route</title>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.css"/>
</head>
<body>

<div id="map" style="width: 1024px; height: 600px; float: left; background-color: orange;"></div>
<div id="controlPanel" style="background-color: #ff8e12">
    <input id="routeAddModusCheckBox" type="checkbox" name="addModus" value="Add modus" checked> Add modus<br>
</div>
<div id="tableDiv" style="float: left;  background-color: #ff8e12;">
    <table id="routePartTable" border="1">
        <thead>
        <tr>
            <th id="header">lnglat to lnglat</th>
            <th>Description</th>
            <th>Image</th>
            <th>action</th>
        </tr>
        </thead>
        <tbody id="routePartTableBody">
        </tbody>
    </table>
</div>

<script type="text/javascript" src="/scripts/route/leaflet/leafletcontroller.js"></script>
<script type="text/javascript" src="/scripts/route/route_controller.js"></script>
<script type="text/javascript" src="/scripts/route/route_model.js"></script>
</body>
</html>
