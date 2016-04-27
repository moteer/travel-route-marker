<div ng-controller="MapController">
    <form>
        <table>
            <tr>
                <td>Titel</td>
                {{titel}}
                <td><input type="text" ng-model="titel"/></td>
            </tr>
            <tr>
                <td>Place</td>
                <td><input type="text" ng-model="place" /></td>
            </tr>
        </table>
        <button ng-click="saveTitleAndPlace(titel, place)">Save</button>
    </form>
</div>
