//editing mode
QUnit.test("display control elements for a certain route part", function (assert) {

    var multiPolyLine = L.multiPolyline([[L.latLng(50.5, 30.5)], [L.latLng(60.5, 40.5)]]);
    var content = new Content("desc A", "image A");
    createContentFor(multiPolyLine, content);

    displayControllFor(multiPolyLine);

    var descriptionTextBox = document.getElementById("descriptionTextBox");
    assert.equal(descriptionTextBox.style.visibility, "visible", "descriptionTextBox is visible");
    assert.equal(descriptionTextBox.value, content.description, "descriptionTextBox has text " + content.description);

    var image = document.getElementById("image");
    assert.equal(image.style.visibility, "visible", "image is visible");

    var latLng = document.getElementById("latLng");
    assert.equal(latLng.innerHTML, "LatLng(50.5, 30.5),LatLng(60.5, 40.5)");

    var save = document.getElementById("saveButton");
    assert.equal(save.style.display, "block", "save button is visible");




});

//switch
QUnit.test("switch from one selection to another", function (assert) {

    var multiPolyLine = L.multiPolyline([[L.latLng(111.4, 0.5)], [L.latLng(60.5, 40.5)]]);
    var content = new Content("desc B", "image B");
    createContentFor(multiPolyLine, content);

    displayControllFor(multiPolyLine);

    var descriptionTextBox = document.getElementById("descriptionTextBox");
    assert.equal(descriptionTextBox.style.visibility, "visible", "descriptionTextBox is visible");
    assert.equal(descriptionTextBox.value, content.description, "descriptionTextBox has text " + content.description);

    var image = document.getElementById("image");
    assert.equal(image.style.visibility, "visible", "image is visible");

    var latLng = document.getElementById("latLng");
    assert.equal(latLng.innerHTML, "LatLng(111.4, 0.5),LatLng(60.5, 40.5)");

    var save = document.getElementById("saveButton");
    assert.equal(save.style.display, "block", "save button is visible");
});


//
//
////drawing mode
//QUnit.test("only show text elements but not editable", function (assert) {
//
//});


