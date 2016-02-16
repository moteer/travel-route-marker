QUnit.test("function scope testing", function (assert) {
    assert.ok(typeof outer === 'function', "outer is in scope!");
    assert.notOk(typeof inner === 'function', "inner is NOT in scope!");

    assert.notOk(typeof a === 'number', "a is NOT in scope. DIFFERENT compared to functions!");
    var a = 1;
    assert.ok(typeof a === 'number', "a is now in scope. DIFFERENT compared to functions!");

    function outer() {
        assert.ok(typeof inner === 'function', "inner is not in scope!");

        var b = 2;

        function inner() {
            var c = 3;
        }
    }

    outer();
    assert.notOk(typeof inner === 'function', "inner NOT in scope anymore!");

});

