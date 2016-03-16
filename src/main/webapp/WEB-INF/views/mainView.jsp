<!DOCTYPE html>
<html data-ng-app="RouteApp">

<head>
    <script type="text/javascript" src="../../scripts/jquery-2.1.4.js"></script>
    <script src="http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.js"></script>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.css"/>
</head>

<body>
<div>
  <div data-ng-view=""></div>
</div>


<%--leaflet map custums --%>
<script type="text/javascript" src="../../scripts/app/leaflet/leafletcontroller.js"></script>

<%--angular libs--%>
<script src="../../scripts/angular/angular.min.js"></script>
<script src="../../scripts/angular-route/angular-route.min.js"></script>

<%--routepart scripts--%>
<script src="../../scripts/app/RouteTableApp.js"></script>
<script src="../../scripts/app/model/RouteModel.js"></script>
<script src="../../scripts/app/factory/RouteFactory.js"></script>
<script src="../../scripts/app/controller/RouteTableController.js"></script>
<script src="../../scripts/app/controller/MapController.js"></script>

</body>
</html>
