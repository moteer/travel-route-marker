QUnit.test("get Content for multiPolyLine", function (assert) {

    assert.equal(getContentFor(), "empty", "There is no content defined yet. It is empty.");

    var latlngs = [[L.latLng(50.5, 30.5)], [L.latLng(60.5, 40.5)]];

    var multiPolyLine = L.multiPolyline(latlngs);
    assert.equal(getContentFor(multiPolyLine), "empty", "There ist still no content defined yet. It is empty.");
});

QUnit.test("set and get Content for multiPolyLine", function (assert) {
    var multiPolyLineA = L.multiPolyline([[L.latLng(50.5, 30.5)], [L.latLng(60.5, 40.5)]]);
    createContentFor(multiPolyLineA, "{A}");
    assert.equal(getContentFor(multiPolyLineA), "{A}", "Returns the content for given multiPolyLine A");

    var multiPolyLineB = L.multiPolyline([[L.latLng(10.5, 20.5)], [L.latLng(90.5, 80.5)]]);
    createContentFor(multiPolyLineB, "{B}");
    assert.equal(getContentFor(multiPolyLineB), "{B}", "Returns the content for given multiPolyLine B");
    assert.equal(getContentFor(multiPolyLineA), "{A}", "and A is still there too");

});
