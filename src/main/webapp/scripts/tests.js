QUnit.test( "hello test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});


QUnit.test( "object test", function( assert ) {
  var obj = {
    firstProp: "myString",
    secondProp: function (string) {
      this.firstProp = string;
    }
  };
  assert.ok( obj.firstProp == "myString", "obj.firstProp ist myString!" );
  obj.secondProp("new string");
  assert.ok( obj.firstProp == "new string", "obj.firstProp is now new string!" );
});
