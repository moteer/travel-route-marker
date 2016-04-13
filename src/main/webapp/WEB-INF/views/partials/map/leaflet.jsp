<div data-ng-controller="MapController" class="map-partial-div">
    <h1>Map with {{numberOfmarkers}} markers and selection index {{selectionIndex}}</h1>

    <leaflet class="map" markers="markers"  lf-center="center"></leaflet>
</div>

<div data-ng-controller="RouteTableController" class="table-partial-div">
    <h1>{{ getTitel() }}</h1>
    enter Titel ... <input type="text" data-ng-model="newTitel"/>
    <button ng-click="createNewRoute()">create new Route</button>


    <h2>selected index {{selectionIndex}}</h2>
    <table border="1">
        <thead>
        <td>toString</td>
        <td>Description</td>
        <td>Image</td>
        <td>City</td>
        <td>Action</td>
        </thead>
        <tr ng-repeat="routeTableEntry in routeDataService.routeTableEntries" ng-class="{'selected':$index === selectedRow}" ng-click="onSelectTableEntry($index)">
            <td>{{routeTableEntry.toString()}}</td>
            <td>
                <%--<span ng-repeat="geoCoordinate in routePart.geoCoordinates.geoCoordinates">--%>
                <%--{{geoCoordinate.city}}--%>
                <%--</span>--%>
            </td>
            <td>
                <%--<span ng-repeat="geoCoordinate in routePart.geoCoordinates.geoCoordinates">--%>
                <%--lat: {{geoCoordinate.lat}} lng {{geoCoordinate.lng}}--%>
                <%--</span>--%>
            </td>
            <td>{{routeTableEntry.getLatLng().getCity()}}</td>
            <td>
                <button ng-click="deleteRow(row)">Delete</button>
            </td>
        </tr>
        <tfoot>
        <td>
            <%--<input type="text" data-ng-model="newDescription"/>--%>
        </td>
        <td>
            <%--<input type="text" data-ng-model="newImage"/>--%>
        </td>
        <td>
            <%--<input type="text" data-ng-model="newImage"/>--%>
        </td>
        <td>
            <input type="text" data-ng-model="newCity"/>
        </td>
        <td>
            <button ng-click="addRoutePoint(); ">Add</button>
        </td>
        </tfoot>
    </table>
</div>

