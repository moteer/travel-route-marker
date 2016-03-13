<div data-ng-controller="RouteTableController" ng-init="initWithFakeDataForFrontEndTest()">
    <h1>{{ titel() }}</h1>
    
    <h2>This route has {{ getNumberOfRouteParts() }} sections</h2>
    <table border="1">
        <thead>
        <td>Description</td>
        <td>Image</td>
        <td>Action</td>
        </thead>
        <tr ng-repeat="routePart in getRouteParts()">
            <td>{{routePart.content.description}}</td>
            <td>{{routePart.content.image}}</td>
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
            <button ng-click="saveRoutePart()">Add</button>
        </td>
        </tfoot>
    </table>
</div>
