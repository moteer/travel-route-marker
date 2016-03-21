<!DOCTYPE html>
<html data-ng-app="RouteApp">

<head>
    <%--angular libs--%>
    <script src="../../scripts/angular/angular.min.js"></script>
    <script src="../../scripts/angular-route/angular-route.min.js"></script>

    <%--leaflet map lib --%>
    <script src="../../scripts/leaflet/leaflet.js"></script>
    <script src="../../scripts/angular-leaflet-directive/angular-leaflet-directive.min.js"></script>
    <link rel="stylesheet" href="/resources/css/leaflet.css"/>
    <link rel="stylesheet" href="/resources/css/main.css"/>

    <%--<link rel="stylesheet" href="../css/main.css"/>--%>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>

<body>
<div class="main-div">
    <div data-ng-view="" class="partial-parent-div"></div>
</div>

<%--routepart scripts--%>
<script src="../../scripts/app/RouteTableApp.js"></script>
<script src="../../scripts/app/model/RouteModel.js"></script>
<script src="../../scripts/app/service/RouteDataService.js"></script>
<script src="../../scripts/app/controller/RouteTableController.js"></script>
<script src="../../scripts/app/controller/MapController.js"></script>

</body>
</html>
