QUnit.test("function invocation as normal function context check test", function (assert) {
    function doSomething() {
        assert.ok(this === window, "function context is window")
    }

    doSomething();
});

QUnit.test("function invocation as method context check test", function (assert) {
    function myMethod() {
        assert.notOk(this === window, "function context is NOT window here!")
        assert.ok(this === myObject, "function context is myObject!")
    }

    var myObject = {
        methodProp: myMethod
    };
    myObject.methodProp();
});

QUnit.test("function invocation as constructor context check test", function (assert) {
    function ObjectConstructor() {
        console.log(this);
        console.log(ObjectConstructor);

        this.myPropertie = function () {
            return this;
        }
    }

    var myObject = new ObjectConstructor();
    assert.ok(myObject.myPropertie() === myObject, "The function context is now the object myObject");

    var mySecondObject = new ObjectConstructor();
    assert.ok(mySecondObject.myPropertie() === mySecondObject, "The function context is now the object mySecondObject");
});

QUnit.test("function invocation with apply and call context check test", function (assert) {
    function myFunction() {
        var sum = 0;
        for (var n = 0; n < arguments.length; n++) {
            sum += arguments[n];
        }
        return sum;
    }

    var someObject = {};
    assert.ok(myFunction.apply(someObject, [1, 2, 3]) === 6, "myFunction is been called with an context set to someObject using apply");

    var someOtherObject = {};
    assert.ok(myFunction.call(someOtherObject, 4, 5, 6) === 15, "myFunction is been called with an context set to someOtherObject using call and a arbitrary number pf arguments");


});

