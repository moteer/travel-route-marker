QUnit.test("select set content to displayed elements", function (assert) {

    var multiPolyLine = L.multiPolyline([[L.latLng(50.5, 30.5)], [L.latLng(60.5, 40.5)]]);
    var content = new Content("desc A", "image A");
    createContentFor(multiPolyLine, content);

    displayControllFor(multiPolyLine);

    var descriptionTextBox = document.getElementById("descriptionTextBox");
    assert.equal(descriptionTextBox.style.visibility, "visible", "descriptionTextBox is visible");

    assert.equal(descriptionTextBox.value, content.description, "descriptionTextBox has text " + content.description);

    var image = document.getElementById("image");
    assert.equal(image.style.visibility, "visible", "image is visible");
    //assert.equal(image.title, content.image, "image has alternative text " + content.image)
});

