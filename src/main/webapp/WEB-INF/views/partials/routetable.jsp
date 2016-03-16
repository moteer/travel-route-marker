<div data-ng-controller="RouteTableController">
    <h1>{{ titel() }}</h1>

    <h2>This route has {{ getNumberOfRouteParts() }} sections</h2>
    <table border="1">
        <thead>
        <td>Description</td>
        <td>Image</td>
        <td>Geo location</td>
        <td>Action</td>
        </thead>
        <tr ng-repeat="routePart in getRouteParts()">
            <td>{{routePart.content.description}}</td>
            <td>{{routePart.content.image}}</td>
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
            <input type="text" value="geoCoordinate" contenteditable="false"/>
        </td>
        <td>
            <button ng-click="saveRoutePart()">Add</button>
        </td>
        </tfoot>
    </table>
</div>
