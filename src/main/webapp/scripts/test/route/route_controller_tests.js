QUnit.testStart(function () {
    controller.clear();
});

//editing mode
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

//add new empty row
QUnit.test("add new empty row for a coresponding routePart selection on the map in the routePart table", function (assert) {
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
    controller.showEditRowForNewSelection(multiPolyLine);

    routePartTableRow = document.getElementById(multiPolyLine.getLatLngs().toString());
    assert.ok(routePartTableRow !== null, "row is present");
    assert.ok(routePartTableRow.cells[0].innerHTML === multiPolyLine.getLatLngs().toString(), "first column contains lnglats");
    assert.ok(routePartTableRow.cells[1].children[0].id === "description", "second column contains input field for Description");
    assert.ok(routePartTableRow.cells[2].children[0].id === "image", "third column contains input field for Image");
    assert.ok(routePartTableRow.cells[3].children[0].id === "save", "fourths column contains save button");

});

//switch
//QUnit.test("switch from one selection to another", function (assert) {
//    console.log("TEST: switch from one selection to another");
//    var multiPolyLine = L.multiPolyline([[L.latLng(111.4, 0.5)], [L.latLng(60.5, 40.5)]]);
//    var content = new Content("desc B", "image B");
//    controller.addRoutePart(multiPolyLine, content);
//
//    var descriptionTextBox = document.getElementById("descriptionTextBox");
//    assert.equal(descriptionTextBox.style.visibility, "visible", "descriptionTextBox is visible");
//    assert.equal(descriptionTextBox.value, content.getDescription(), "descriptionTextBox has text " + content.getDescription());
//
//    var image = document.getElementById("image");
//    assert.equal(image.style.visibility, "visible", "image is visible");
//
//    var latLng = document.getElementById("latLng");
//    assert.equal(latLng.innerHTML, "LatLng(111.4, 0.5),LatLng(60.5, 40.5)");
//
//    var save = document.getElementById("saveButton");
//    assert.equal(save.style.display, "block", "save button is visible");
//
//    // now another
//    var multiPolyLineAnother = L.multiPolyline([[L.latLng(77.4, 0.5)], [L.latLng(60.5, 40.5)]]);
//    var contentAnother = new Content("just Another Description", "just Another image");
//    controller.addRoutePart(multiPolyLineAnother, contentAnother);
//
//    assert.equal(descriptionTextBox.value, contentAnother.getDescription(), "descriptionTextBox has text " + contentAnother.getDescription());
//    assert.equal(latLng.innerHTML, "LatLng(77.4, 0.5),LatLng(60.5, 40.5)");
//
//});
//
//list all entries
QUnit.test("display a table of all entries", function (assert) {
    console.log("TEST: display a table of all entries");
    //updateRoutePartList();
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


