QUnit.testStart(function () {
    console.log("testSetup");
    console.log("==============before update");
    console.log(routeParts.toString());
    routeParts.clear();
    updateRoutePartList();
    console.log("==============after update");
    console.log(routeParts.toString());
    console.log("===========================");

});

//editing mode
QUnit.test("display control elements for a certain route part", function (assert) {
    console.log("TEST: display control elements for a certain route part");
    var multiPolyLine = L.multiPolyline([[L.latLng(50.5, 30.5)], [L.latLng(60.5, 40.5)]]);
    var content = new Content("desc A", "image A");
    routeParts.add(multiPolyLine, content);

    displayControllFor(multiPolyLine);

    var descriptionTextBox = document.getElementById("descriptionTextBox");
    assert.equal(descriptionTextBox.style.visibility, "visible", "descriptionTextBox is visible");
    assert.equal(descriptionTextBox.value, content.getDescription(), "descriptionTextBox has text " + content.getDescription());

    var image = document.getElementById("image");
    assert.equal(image.style.visibility, "visible", "image is visible");

    var latLng = document.getElementById("latLng");
    assert.equal(latLng.innerHTML, "LatLng(50.5, 30.5),LatLng(60.5, 40.5)");

    var save = document.getElementById("saveButton");
    assert.equal(save.style.display, "block", "save button is visible");
});

//switch
QUnit.test("switch from one selection to another", function (assert) {
    console.log("TEST: switch from one selection to another");
    var multiPolyLine = L.multiPolyline([[L.latLng(111.4, 0.5)], [L.latLng(60.5, 40.5)]]);
    var content = new Content("desc B", "image B");
    routeParts.add(multiPolyLine, content);

    displayControllFor(multiPolyLine);

    var descriptionTextBox = document.getElementById("descriptionTextBox");
    assert.equal(descriptionTextBox.style.visibility, "visible", "descriptionTextBox is visible");
    assert.equal(descriptionTextBox.value, content.getDescription(), "descriptionTextBox has text " + content.getDescription());

    var image = document.getElementById("image");
    assert.equal(image.style.visibility, "visible", "image is visible");

    var latLng = document.getElementById("latLng");
    assert.equal(latLng.innerHTML, "LatLng(111.4, 0.5),LatLng(60.5, 40.5)");

    var save = document.getElementById("saveButton");
    assert.equal(save.style.display, "block", "save button is visible");

    // now another
    var multiPolyLineAnother = L.multiPolyline([[L.latLng(77.4, 0.5)], [L.latLng(60.5, 40.5)]]);
    var contentAnother = new Content("just Another Description", "just Another image");
    routeParts.add(multiPolyLineAnother, contentAnother);

    displayControllFor(multiPolyLineAnother);
    assert.equal(descriptionTextBox.value, contentAnother.getDescription(), "descriptionTextBox has text " + contentAnother.getDescription());
    assert.equal(latLng.innerHTML, "LatLng(77.4, 0.5),LatLng(60.5, 40.5)");

});
//
//list all entries
QUnit.test("display a table of all entries", function (assert) {
    console.log("TEST: display a table of all entries");
    //updateRoutePartList();
    var multiPolyLine = L.multiPolyline([[L.latLng(99.4, 0.5)], [L.latLng(60.5, 40.5)]]);
    var content = new Content("desc C", "image C");
    routeParts.add(multiPolyLine, content);
    updateRoutePartList();

    var tableRows = document.getElementById("routePartTable");
    assert.equal(tableRows.rows.length, 2, "Table has entry row and a header");

    var multiPolyLine2 = L.multiPolyline([[L.latLng(30.4, 0.5)], [L.latLng(60.5, 40.5)]]);
    var content2 = new Content("hello descr", "hello Image");
    routeParts.add(multiPolyLine2, content2);
    assert.equal(tableRows.rows.length, 2, "Table has still entry row and a header");

    updateRoutePartList();
    assert.equal(tableRows.rows.length, 3, "Table has even one more entry and a row and a header");

    //assert.equal(tableRows[1].textContent, "LatLng(99.4, 0.5),LatLng(60.5, 40.5) | Description: desc C, image: image C", "description is present");
});


//drawing mode
//QUnit.test("select routePart and make table row editable", function (assert) {
//    var listElements = document.getElementById("routePartTable").getElementsByTagName("tr");
//    assert.equal(listElements.length, 2, "Table has entry row and a header");
//});


