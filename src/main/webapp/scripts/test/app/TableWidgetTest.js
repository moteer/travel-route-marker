describe('RouteTableController simple Unit Test', function () {
    beforeEach(module('routeTableApp'));

    var EditableRoutePartTableController,
        scope;

    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        RouteTableController = $controller('RouteTableController', {
            $scope: scope
        });
    }));

    it('adds rows an Element to the rows', function () {
        expect(scope.elements()).toBe(0);
        scope.newRow = "Something";
        scope.addRow();
        expect(scope.rows).toEqual(["Something"]);
        expect(scope.elements()).toBe(1);

        scope.newRow = "Something Else";
        scope.addRow();
        expect(scope.rows).toContain("Something");
        expect(scope.rows).toContain("Something Else");
        expect(scope.elements()).toBe(2);
    });

    it('removes Elements from rows', function () {
        scope.rows = ["one", "two", "three"];
        expect(scope.elements()).toBe(3);

        scope.deleteRow("two");
        expect(scope.elements()).toBe(2);
        expect(scope.rows).toEqual(["one", "three"]);

        scope.deleteRow("three");
        expect(scope.elements()).toBe(1);
        expect(scope.rows).toEqual(["one"]);

        scope.deleteRow("three");
        expect(scope.elements()).toBe(1);
        expect(scope.rows).toEqual(["one"]);
    });
});

describe('EditTableController with complex row content', function () {
    beforeEach(module('editableRoutePartTableApp'));

    var EditableRoutePartTableController,
        scope;

    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        EditableRoutePartTableController = $controller('EditableRoutePartTableController', {
            $scope: scope
        });
    }));

    it('adds complex object to row', function () {
        var complexObj = {lat:'123', lng:456};
        expect(scope.elements()).toBe(0);
        scope.newRow = complexObj;
        scope.addRow();
        expect(scope.rows).toContain(complexObj);
        expect(scope.elements()).toBe(1);

        var anotherComplexObj = {lat:'999', lng:555};

        scope.newRow = anotherComplexObj;
        scope.addRow();
        expect(scope.rows).toContain(complexObj);
        expect(scope.rows).toContain(anotherComplexObj);
        expect(scope.elements()).toBe(2);
    });

    it('removes Elements from rows', function () {
        scope.rows = ["one", "two", "three"];
        expect(scope.elements()).toBe(3);

        scope.deleteRow("two");
        expect(scope.elements()).toBe(2);
        expect(scope.rows).toEqual(["one", "three"]);

        scope.deleteRow("three");
        expect(scope.elements()).toBe(1);
        expect(scope.rows).toEqual(["one"]);

        scope.deleteRow("three");
        expect(scope.elements()).toBe(1);
        expect(scope.rows).toEqual(["one"]);
    });
});



