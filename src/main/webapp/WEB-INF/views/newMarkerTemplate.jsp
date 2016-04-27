<div ng-controller="MapController">
    <form ng-submit="saveTitelAndPlace(newNewMarkerTitel, newNewMarkerPlace)">
        <table>
            <tr>
                <td>Titel</td>
                {{newNewMarkerTitel}}
                <td><input type="text" ng-model="newNewMarkerTitel"/></td>
            </tr>
            <tr>
                <td>Place</td>
                <td><input type="text" ng-model="newNewMarkerPlace" /></td>
            </tr>
        </table>
        <button ng-click="saveTitelAndPlace()">Save</button>
    </form>
</div>
