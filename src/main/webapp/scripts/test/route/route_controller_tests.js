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

function assertThatNoOtherRowHasEditElements(multiPolyLine, content, assert) {
    var routePartTableRows = document.getElementById("routePartTable");
    var tBodies = routePartTableRows.tBodies;

    for (var i = 0; i < tBodies.length; i++) {
        console.log(tBodies.item(i).childNodes[1].cells[0].innerHTML);
        if (tBodies.item(i).childNodes[1].id !== multiPolyLine.getLatLngs().toString()) {
            assert.ok(tBodies.item(i).childNodes[1].cells[1].innerHTML.toLowerCase().indexOf("input") === -1, "Should not have an input field.");
            assert.ok(tBodies.item(i).childNodes[1].cells[2].innerHTML.toLowerCase().indexOf("input") === -1, "Should not have an input field.");

            assert.ok(tBodies.item(i).childNodes[1].cells[3].children[0].id !== "save", "fourths column does NOT contain save button");
            assert.ok(tBodies.item(i).childNodes[1].cells[3].children[0].id === "edit", "fourths column contains edit button");
            assert.ok(tBodies.item(i).childNodes[1].cells[3].children[1].id === "delete", "fourths column contains delete button");
        }
    }
}

function assertSelectOnControllerMethod(multiPolyLine, content, assert) {
    controller.selectOn(multiPolyLine);

    assertThatNoOtherRowHasEditElements(multiPolyLine, content, assert);
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
    assertSelectOnControllerMethod(multiPolyLineA, contentA, assert);

    var multiPolyLineB = L.multiPolyline([[L.latLng(12.34, 56.78)], [L.latLng(9.1, 11.12)]]);
    var contentB = new Content("some descr", "some image");
    controller.addRoutePart(multiPolyLineB, contentB);
    assertSelectOnControllerMethod(multiPolyLineB, contentB, assert);

    var emptyMultiPolyLine = L.multiPolyline([[L.latLng(33.34, 33.78)], [L.latLng(33.1, 33.12)]]);
    controller.addEmptyRoutePart(emptyMultiPolyLine);
    assertSelectOnControllerMethod(emptyMultiPolyLine, new Content("undefined", "undefined"), assert);
});

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

function assertThatSelectRowEmulatePressSaveAndSaveUpdatesNewContent(multiPolyLineA, assert, desc, image) {
    controller.selectOn(multiPolyLineA);
    controller.onSave(multiPolyLineA, desc, image);

    var routePartElement = routeParts.getRoutePartElementFor(multiPolyLineA.getLatLngs().toString());
    assert.equal(routePartElement.getDescription(), desc);
    assert.equal(routePartElement.getImage(), image);

    var routePartTableRowA = document.getElementById(multiPolyLineA.getLatLngs().toString());
    assert.equal(routePartTableRowA.cells[1].innerHTML, desc, "new desc is in place and input button is disapeared");
    assert.equal(routePartTableRowA.cells[2].innerHTML, image, "new image is in place and input button is disapeared");
    assert.equal(routePartTableRowA.cells[3].children[0].id, "edit", "fourths column contains edit button");
    assert.equal(routePartTableRowA.cells[3].children[1].id, "delete", "fourths column contains delete button");
}

QUnit.test("edit and save entry", function (assert) {
    var multiPolyLineA = L.multiPolyline([[L.latLng(10.20, 30.40)], [L.latLng(9.1, 11.12)]]);
    var contentA = new Content("some descr", "some image");
    controller.addRoutePart(multiPolyLineA, contentA);

    var multiPolyLineB = L.multiPolyline([[L.latLng(12.34, 56.78)], [L.latLng(9.1, 11.12)]]);
    var contentB = new Content("some descr B", "some image B");
    controller.addRoutePart(multiPolyLineB, contentB);

    var emptyMultiPolyLine = L.multiPolyline([[L.latLng(2.2, 2.2)], [L.latLng(2.2, 2.2)]]);
    controller.addEmptyRoutePart(emptyMultiPolyLine);

    assertThatSelectRowEmulatePressSaveAndSaveUpdatesNewContent(multiPolyLineA, assert, "new desc for A", "new image for A");
    assertThatSelectRowEmulatePressSaveAndSaveUpdatesNewContent(multiPolyLineB, assert, "new desc for B", "new image for B");
    assertThatSelectRowEmulatePressSaveAndSaveUpdatesNewContent(emptyMultiPolyLine, assert, "new desc for empty one", "new image for empty one");
});

//drawing mode
//QUnit.test("select routePart and make table row editable", function (assert) {
//    var listElements = document.getElementById("routePartTable").getElementsByTagName("tr");
//    assert.equal(listElements.length, 2, "Table has entry row and a header");
//});


