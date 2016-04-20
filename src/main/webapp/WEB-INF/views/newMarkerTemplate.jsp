<div ng-controller="MapController">
    <form>
        <table>
            <tr>
                <td>Titel</td>
                <td><input type="text" value="ывамстмптим" ng-model="newMarkerTitel"/></td>
            </tr>
            <tr>
                <td>Place</td>
                <td><input type="text" value="чывмчмчсм" ng-model="newMarkerPlace" /></td>
            </tr>
        </table>
        <button ng-click="saveTitelAndPlace()">Save</button>
    </form>
</div>
