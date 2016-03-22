<div data-ng-controller="RouteTableController" class="table-partial-div">
    <h1>{{ getTitel() }}</h1>
    enter Titel ... <input type="text" data-ng-model="newTitel"/><button ng-click="createNewRoute()">create new Route</button>


    <h2>This route has {{ getNumberOfRouteParts() }} sections</h2>
    <table border="1">
        <thead>
        <td>Description</td>
        <td>Image</td>
        <td>Geo location</td>
        <td>Action</td>
        </thead>
        <tr ng-repeat="routePart in getRouteParts()" ng-class="{'selected':$index == selectedRow}"  ng-click="setClickedRow($index)">
            <td>{{routePart.content.description}}</td>
            <td>{{routePart.content.image}}</td>
            <td>{{routePart.getCities()}}</td>
            <td>
                <span ng-repeat="geoCoordinate in routePart.geoCoordinates.geoCoordinates">
                {{geoCoordinate.city}} lat: {{geoCoordinate.lat}} lng {{geoCoordinate.lng}}
                </span>
            </td>
            <td>
                <button ng-click="deleteRow(row)">Delete</button>
            </td>
        </tr>
        <tfoot>
        <td>
            <input type="text" data-ng-model="newDescription"/>
        </td>
        <td>
            <input type="text" data-ng-model="newImage"/>
        </td>
        <td>
            <input type="text" data-ng-model="newCity"/>
        </td>
        <td>
            <input type="text" value="geoCoordinate" contenteditable="false"/>
        </td>
        <td>
            <button ng-click="addRoutePart()">Add</button>
        </td>
        </tfoot>
    </table>
</div>
