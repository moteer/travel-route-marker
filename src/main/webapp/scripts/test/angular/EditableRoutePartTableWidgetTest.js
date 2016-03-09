describe('EditableRoutePartTableController Unit Test', function () {
    beforeEach(module('editableRoutePartTableApp'));

    var EditableRoutePartTableController,
        scope;

    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        EditableRoutePartTableController = $controller('MyEditTableTableController', {
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


