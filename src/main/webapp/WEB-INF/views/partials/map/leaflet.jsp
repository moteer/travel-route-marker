<div data-ng-controller="MapController" class="map-partial-div">
    <h1>Map with {{numberOfmarkers}} markers and selection index {{selectionIndex}}</h1>
    <span>{{currentSelectedItem}}</span>

    <p>
        <span>newMarkerTitel: {{newMarkerTitel}}</span><br/>
        <span>newMarkerTitel: {{newMarkerPlace}}</span>
    </p>

    <leaflet class="map" markers="markers" paths="paths" lf-center="center"></leaflet>
</div>

<div data-ng-controller="RouteTableController" class="table-partial-div">
    <h1>{{ getTitel() }}</h1>
    enter Titel ... <input type="text" data-ng-model="newTitel"/>
    <button ng-click="createNewRoute()">create new Route</button>


    <h2>selected index {{selectionIndex}}</h2>
    <table border="1">
        <thead>
        <td>Titel</td>
        <td>Action</td>
        </thead>
        <tr ng-repeat="routeTableEntry in routeDataService.routeTableEntries" ng-class="{'selected':$index === selectionIndex}"
            ng-click="onSelectTableEntry($index)">
            <td>{{routeTableEntry.getShortDescriptor()}}</td>
            <td></td>
        </tr>
        <tfoot>
        <td>
            City: <input type="text" data-ng-model="newCity"/> Titel: <input type="text" data-ng-model="shortDescriptor"/>
        </td>
        <td>
            <button ng-click="addRoutePoint(); ">Add</button>
        </td>
        </tfoot>
    </table>
</div>

