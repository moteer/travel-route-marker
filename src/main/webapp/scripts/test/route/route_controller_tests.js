QUnit.testStart(function () {
    controller.clearAllRoutePartElements();
});

QUnit.test("save new routePart should display a new entry in the routePart table", function (assert) {
    var multiPolyLine;
    var content;
    var routePartTableRow;

    for (var i = 0; i < 15; i++) {
        multiPolyLine = L.multiPolyline([[L.latLng(i, 30.5)], [L.latLng(i, 40.5)]]);
        content = new Content("desc " + i, "image A" + i);
        controller.addRoutePart(multiPolyLine, content);

        routePartTableRow = document.getElementById(multiPolyLine.getLatLngs().toString());
        assert.ok(routePartTableRow !== null, "row is present");
        assert.ok(routePartTableRow.cells[0].innerHTML === multiPolyLine.getLatLngs().toString(), "first column contains lnglats");
        assert.ok(routePartTableRow.cells[1].innerHTML === content.getDescription(), "second column contains description");
        assert.ok(routePartTableRow.cells[2].innerHTML === content.getImage(), "third column contains image");
        assert.ok(routePartTableRow.cells[3].children[0].id === "edit", "fourths column contains save button");
        assert.ok(routePartTableRow.cells[3].children[1].id === "delete", "fourths column contains save button");
    }
});

QUnit.test("add new editable empty row for a coresponding routePart selection on the map in the routePart table", function (assert) {
    var multiPolyLine;
    var content;
    var routePartTableRow;

    // add filled rows
    for (var i = 0; i < 5; i++) {
        multiPolyLine = L.multiPolyline([[L.latLng(i, 30.5)], [L.latLng(i, 40.5)]]);
        content = new Content("desc " + i, "image A" + i);
        controller.addRoutePart(multiPolyLine, content);

        routePartTableRow = document.getElementById(multiPolyLine.getLatLngs().toString());
        assert.ok(routePartTableRow !== null, "row is present");
        assert.ok(routePartTableRow.cells[0].innerHTML === multiPolyLine.getLatLngs().toString(), "first column contains lnglats");
        assert.ok(routePartTableRow.cells[1].innerHTML === content.getDescription(), "second column contains description");
        assert.ok(routePartTableRow.cells[2].innerHTML === content.getImage(), "third column contains image");
        assert.ok(routePartTableRow.cells[3].children[0].id === "edit", "fourths column contains edit button");
        assert.ok(routePartTableRow.cells[3].children[1].id === "delete", "fourths column contains delete button");
    }

    // add empty row
    multiPolyLine = L.multiPolyline([[L.latLng(12.34, 56.78)], [L.latLng(9.1, 11.12)]]);
    controller.addEmptyRoutePart(multiPolyLine);

    routePartTableRow = document.getElementById(multiPolyLine.getLatLngs().toString());
    assert.ok(routePartTableRow !== null, "row is present");
    assert.ok(routePartTableRow.cells[0].innerHTML === multiPolyLine.getLatLngs().toString(), "first column contains lnglats");
    assert.ok(routePartTableRow.cells[1].innerHTML === "undefined", "second column contains input field for Description");
    assert.ok(routePartTableRow.cells[2].innerHTML === "undefined", "third column contains input field for Image");
    assert.ok(routePartTableRow.cells[3].children[0].id === "edit", "fourths column contains edit button");
    assert.ok(routePartTableRow.cells[3].children[1].id === "delete", "fourths column contains delete button");

});

QUnit.test("save empty route part", function (assert) {
    var multiPolyLine = L.multiPolyline([[L.latLng(55, 55.5)], [L.latLng(55, 55.5)]]);
    controller.addEmptyRoutePart(multiPolyLine);
    var routePartTableRow = document.getElementById(multiPolyLine.getLatLngs().toString());
    assert.ok(routePartTableRow !== null, "row is present");
    assert.ok(routePartTableRow.cells[0].innerHTML === multiPolyLine.getLatLngs().toString(), "first column contains lnglats");
    assert.ok(routePartTableRow.cells[1].innerHTML === "undefined", "second column contains input field for Description");
    assert.ok(routePartTableRow.cells[2].innerHTML === "undefined", "third column contains input field for Image");
    assert.ok(routePartTableRow.cells[3].children[0].id === "edit", "fourths column contains edit button");
    assert.ok(routePartTableRow.cells[3].children[1].id === "delete", "fourths column contains delete button");

});

function callControllerSelectOnMethodAndAssert(multiPolyLine, content, assert) {
    controller.selectOn(multiPolyLine);
    var routePartTableEditRow = document.getElementById(multiPolyLine.getLatLngs().toString());
    assert.ok(routePartTableEditRow !== null, "edit row is present in routepart table");
    assert.ok(routePartTableEditRow.cells[0].innerHTML === multiPolyLine.getLatLngs().toString(), "first column contains lnglats");
    assert.ok(routePartTableEditRow.cells[1].children[0].id === "description", "second column contains input field for Description");
    assert.ok(routePartTableEditRow.cells[1].children[0].value === content.getDescription(), "Description");
    assert.ok(routePartTableEditRow.cells[2].children[0].id === "image", "third column contains input field for Image");
    assert.ok(routePartTableEditRow.cells[2].children[0].value === content.getImage(), "Image");
    assert.ok(routePartTableEditRow.cells[3].children[0].id === "save", "fourths column contains save button");
}

QUnit.test("select multipolyline on map", function (assert) {
    var multiPolyLineA = L.multiPolyline([[L.latLng(10.20, 30.40)], [L.latLng(9.1, 11.12)]]);
    var contentA = new Content("some descr", "some image");
    controller.addRoutePart(multiPolyLineA, contentA);
    callControllerSelectOnMethodAndAssert(multiPolyLineA, contentA, assert);

    var multiPolyLineB = L.multiPolyline([[L.latLng(12.34, 56.78)], [L.latLng(9.1, 11.12)]]);
    var contentB = new Content("some descr", "some image");
    controller.addRoutePart(multiPolyLineB, contentB);
    callControllerSelectOnMethodAndAssert(multiPolyLineB, contentB, assert);

    var emptyMultiPolyLine = L.multiPolyline([[L.latLng(33.34, 33.78)], [L.latLng(33.1, 33.12)]]);
    controller.addEmptyRoutePart(emptyMultiPolyLine);
    callControllerSelectOnMethodAndAssert(emptyMultiPolyLine, new Content("undefined", "undefined"), assert);
});

//list all entries
QUnit.test("display a table of all entries", function (assert) {
    var multiPolyLine = L.multiPolyline([[L.latLng(99.4, 0.5)], [L.latLng(60.5, 40.5)]]);
    var content = new Content("desc C", "image C");
    controller.addRoutePart(multiPolyLine, content);

    var tableRows = document.getElementById("routePartTable");
    assert.equal(tableRows.rows.length, 2, "Table has entry row and a header");

    var multiPolyLine2 = L.multiPolyline([[L.latLng(30.4, 0.5)], [L.latLng(60.5, 40.5)]]);
    var content2 = new Content("hello descr", "hello Image");
    controller.addRoutePart(multiPolyLine2, content2);
    assert.equal(tableRows.rows.length, 3, "Table has even one more entry and a row and a header");
});


//drawing mode
//QUnit.test("select routePart and make table row editable", function (assert) {
//    var listElements = document.getElementById("routePartTable").getElementsByTagName("tr");
//    assert.equal(listElements.length, 2, "Table has entry row and a header");
//});


