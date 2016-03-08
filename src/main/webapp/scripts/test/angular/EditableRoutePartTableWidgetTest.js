describe('EditableRoutePartTableController Unit Test', function () {
    beforeEach(module('EditableRoutePartTableApp'));

    var EditableRoutePartTableController,
        scope;

    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        EditableRoutePartTableController = $controller('EditableRoutePartTableController', {
            $scope: scope
        });
    }));

    it('adds an Element to the table', function () {
        scope.elements = 0;
        scope.addRow("");
        expect(scope.elements).toBe(2);
    });

});


