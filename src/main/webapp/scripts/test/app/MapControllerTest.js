describe('Map Controller', function () {
    beforeEach(module('MapModule'));

    var RouteTableController,
        scope;

    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        MapController = $controller('MapController', {
            $scope: scope
        });
    }));

    it('handles user click on Map', function () {
        scope.onMapClick("12.34", "56.78");
        expect(scope.currentPoint.lat).toBe("12.34");
        expect(scope.currentPoint.lng).toBe("56.78");

        //user clicks should call a method
        //if prevPoint exists draw call draw line

        
    });
});



