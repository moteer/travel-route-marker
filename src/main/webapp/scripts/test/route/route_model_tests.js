QUnit.test("get Content for multiPolyLine", function (assert) {

    assert.equal(getContentFor(), "empty", "There is no content defined yet. It is empty.");

    var latlngs = [[L.latLng(50.5, 30.5)], [L.latLng(60.5, 40.5)]];

    var multiPolyLine = L.multiPolyline(latlngs);
    assert.equal(getContentFor(multiPolyLine), "empty", "There ist still no content defined yet. It is empty.");
});

QUnit.test("set and get Content for multiPolyLine to asociative/directory array", function (assert) {
    var multiPolyLineA = L.multiPolyline([[L.latLng(50.5, 30.5)], [L.latLng(60.5, 40.5)]]);
    var contentA = new Content("desc A", "image A");
    createContentFor(multiPolyLineA, contentA);
    assert.equal(getContentFor(multiPolyLineA), contentA, "Returns the content for given multiPolyLine A");

    var multiPolyLineB = L.multiPolyline([[L.latLng(10.5, 20.5)], [L.latLng(90.5, 80.5)]]);
    var contentB = new Content("desc B", "image B");
    createContentFor(multiPolyLineB, contentB);
    assert.equal(getContentFor(multiPolyLineB), contentB, "Returns the content for given multiPolyLine B");
    assert.equal(getContentFor(multiPolyLineA), contentA, "and A is still there too");
});


QUnit.test("verify added content", function (assert) {
    var multiPolyLineA = L.multiPolyline([[L.latLng(50.5, 30.5)], [L.latLng(60.5, 40.5)]]);

    var expectedContent = {
        description:"this is my description",
        image:"this is my path to the image"
    };

    var content = new Content("this is my description", "this is my path to the image");
    createContentFor(multiPolyLineA, content);
    var actualContent = getContentFor(multiPolyLineA);

    assert.equal(actualContent.description, expectedContent.description, actualContent.description + " looks right!");
    assert.equal(actualContent.image, expectedContent.image, actualContent.image + " looks right too!");
});
