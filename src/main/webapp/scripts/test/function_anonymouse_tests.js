QUnit.test( "assigns anonymouse function to an object's propertie test", function( assert ) {
  var obj = {
    firstProp: "originalString",
    secondProp: function (string) {
      this.firstProp = string;
    }
  };
  assert.ok( obj.firstProp == "originalString", "obj.firstProp is originalString!" );
  obj.secondProp("new string");
  assert.ok( obj.firstProp == "new string", "obj.firstProp is now new string!" );
});
