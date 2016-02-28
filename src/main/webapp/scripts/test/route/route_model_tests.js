QUnit.test("get Content for multiPolyLine", function (assert) {
    var routeParts = new RouteParts();
    assert.equal(routeParts.getRoutePartElementFor(), "empty", "There is no content defined yet. It is empty.");

    var latlngs = [[L.latLng(50.5, 30.5)], [L.latLng(60.5, 40.5)]];

    var multiPolyLine = L.multiPolyline(latlngs);
    assert.equal(routeParts.getRoutePartElementFor(multiPolyLine), "empty", "There ist still no content defined yet. It is empty.");
});

QUnit.test("set and get Content for multiPolyLine to asociative/directory array", function (assert) {
    var routeParts = new RouteParts();
    var multiPolyLineA = L.multiPolyline([[L.latLng(50.5, 30.5)], [L.latLng(60.5, 40.5)]]);
    var contentA = new Content("desc A", "image A");
    routeParts.saveRoutePartElement(multiPolyLineA, contentA);
    assert.equal(routeParts.getRoutePartElementFor(multiPolyLineA), contentA, "Returns the content for given multiPolyLine A");

    var multiPolyLineB = L.multiPolyline([[L.latLng(10.5, 20.5)], [L.latLng(90.5, 80.5)]]);
    var contentB = new Content("desc B", "image B");
    routeParts.saveRoutePartElement(multiPolyLineB, contentB);
    assert.equal(routeParts.getRoutePartElementFor(multiPolyLineB), contentB, "Returns the content for given multiPolyLine B");
    assert.equal(routeParts.getRoutePartElementFor(multiPolyLineA), contentA, "and A is still there too");
});


QUnit.test("verify added content", function (assert) {
    var routeParts = new RouteParts();
    var multiPolyLineA = L.multiPolyline([[L.latLng(50.5, 30.5)], [L.latLng(60.5, 40.5)]]);

    var expectedContent = {
        description:"this is my description",
        image:"this is my path to the image"
    };

    var content = new Content("this is my description", "this is my path to the image");
    routeParts.saveRoutePartElement(multiPolyLineA, content);
    var actualContent = routeParts.getRoutePartElementFor(multiPolyLineA);

    assert.equal(actualContent.getDescription(), expectedContent.description, actualContent.getDescription() + " looks right!");
    assert.equal(actualContent.getImage(), expectedContent.image, actualContent.getImage() + " looks right too!");
});
