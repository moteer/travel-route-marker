//editing mode
QUnit.test("display control elements for a certain route part", function (assert) {
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
    //clearRouteParts();

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
});
//
//list all entries
QUnit.test("display a list of all entries", function (assert) {

    //clearRouteParts();
    updateRoutePartList(routeParts);
    var multiPolyLine = L.multiPolyline([[L.latLng(99.4, 0.5)], [L.latLng(60.5, 40.5)]]);
    var content = new Content("desc C", "image C");
    routeParts.add(multiPolyLine, content);

    updateRoutePartList(routeParts);

    var list = document.getElementById("routePartList");

    assert.equal(list.hasChildNodes(), true, "List has child nodes");

    assert.equal(list.childElementCount, 1, "List has 1 entries.");
    assert.equal(list.childNodes[0].description, "desc C", "description is present");


});


//
//
////drawing mode
//QUnit.test("only show text elements but not editable", function (assert) {
//
//});


