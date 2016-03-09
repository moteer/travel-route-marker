<!DOCTYPE html>
<html>

<head>
</head>

<body ng-app="editableRoutePartTableApp">

<div data-ng-controller="MyEditTableTableController" data-ng-init="rows=['First row', 'Second Row', 'Third Row']">

    <h2>This controller contains {{ rows.length }} Elements</h2>
    <table border="1">
        <thead>
        <td>Header</td>
        <td>Actions</td>
        </thead>
        <tr ng-repeat="row in rows">
            <td>{{row}}</td>
            <td>
                <button ng-click="deleteRow(row)">Delete</button>
            </td>
        </tr>
        <tfoot>
        <td>
            <input type="text" data-ng-model="newRow"/>
        </td>
        <td>
            <button ng-click="addRow()">Add</button>
        </td>
        </tfoot>
    </table>
</div>


<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.0-beta.17/angular.min.js"></script>
<script src="/scripts/angular/EditableRoutePartTableApp.js"></script>

</body>
</html>

<%--http://www.letscodejavascript.com/--%>
<%--http://www.tutorialspoint.com/angularjs/angularjs_environment.htm--%>
