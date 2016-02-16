QUnit.test("function has properties test (MEMOIZING)", function (assert) {
    function getFromCache(key) {
        if (!getFromCache.cache) {
            getFromCache.cache = {};
        }
        var elem = getFromCache.cache[key];
        if (getFromCache.cache[key] == null) {
            getFromCache.cache[key] = key + ' is cached now!';
        }
        return elem;

    }

    assert.ok(getFromCache(1) == null, "Passed, because it is not been cached yet!");
    assert.ok(getFromCache(2) == null, "Passed, because it is not been cached yet!");
    assert.ok(getFromCache(1) == "1 is cached now!", "Now element for key 1 is there!");
    assert.ok(getFromCache(2) == "2 is cached now!", "Now element for key 2 is there!");
    assert.ok(getFromCache(3) == null, "Passed, because it is not been cached yet!");
});


