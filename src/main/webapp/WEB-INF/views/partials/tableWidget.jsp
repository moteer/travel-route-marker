<div data-ng-controller="EditableRoutePartTableController" data-ng-init="rows=['First row', 'Second Row', 'Third Row']">

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
