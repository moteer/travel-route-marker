<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>QUnit Tests for playground</title>
    <link rel="stylesheet" href="/scripts/test/qunitjs/qunit/qunit.css">
</head>
<input>

<div id="qunit"></div>
<div id="qunit-fixture"></div>
<script type="application/javascript" src="/scripts/test/qunitjs/qunit/qunit.js"></script>
<script src="http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.js"></script>


<%--PROD CODE--%>
<script type="application/javascript" src="/scripts/route/route_model.js"></script>
<script type="application/javascript" src="/scripts/route/route_controller.js"></script>
<%--TESTS--%>
<script type="application/javascript" src="/scripts/test/route/route_controller_tests.js"></script>

<div>
    <input id="descriptionTextBox" type="text"/>
    <input id="image" type="text"/>
    <button id="saveButton" type="button" style="display: block;">save</button>
</div>
<p id="latLng"/>
<ul id="routePartList">
</ul>

    <div id="tableDiv">
        <table id="routePartTable" border="1">
            <thead>
              <tr>
                <th id="header">lnglat to lnglat</th>
                <th>Description</th>
                  <th>Image</th>
                <th>action</th>
              </tr>
             </thead>
            <tbody id="routePartTableBody">
<%--            <tr>
                <td>asdas</td>
                <td>grdsf</td>
                <td>sfsdf</td>
            </tr>--%>
            </tbody>
        </table>
    </div>
</body>
</html>
