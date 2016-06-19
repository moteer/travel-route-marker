describe('Map Controller', function () {

    beforeEach(function () {
        var mockRouteDataService = {};
        var mockLeafletData = {};
        var mockModal = {};
        module('RouteApp', function ($provide) {
            $provide.value('RouteDataService', mockRouteDataService);
            $provide.value('leafletData', mockLeafletData);
            $provide.value('modal', mockModal);

        });

        mockRouteDataService.selectRoutePointByLatLngs = function (routePoint) {
            console.log("mock mockRouteTableController.selectRoutePointByLatLng was called with routePart" + routePoint);
        };

        mockRouteDataService.selectRouteSectionByLatLngs = function (routePoint) {
            console.log("mock mockRouteTableController.selectRouteSectionByLatLngs was called with routePart" + routePoint);
        };

        mockRouteDataService.saveRoutePointByLatLng = function (routePoint) {
            console.log("mock mockRouteTableController.saveRoutePointByLatLng was called with routePart" + routePoint);
        };

        mockRouteDataService.saveRouteSection = function (routePartArray) {
            console.log("mock mockRouteTableController.saveRouteSectionByLatLngs was called with routePart" + routePartArray);
        };

        mockRouteDataService.getRoute = function () {
            console.log("mock mockRouteTableController.getRoute was called");
        };

        mockRouteDataService.getLastRouteTableEntry = function () {
            console.log("mock mockRouteTableController.getLastRouteTableEntry was called");
        };

        mockRouteDataService.saveTitelAndPlaceForCurrentSelection = function () {
            console.log("mock mockRouteTableController.saveTitelAndPlaceForCurrentSelection was called");
        };

    });

    beforeEach(inject(function ($rootScope, $controller, _RouteDataService_, _leafletData_, _modal_) {
        scope = $rootScope.$new();
        leafletData = _leafletData_;
        RouteDataService = _RouteDataService_;
        MapController = $controller('MapController', {
            $scope: scope,
            routeDataService: RouteDataService,
            leafletData: leafletData,
            $modal: _modal_
        });
    }));

    beforeEach(function () {
        jasmine.addMatchers({
            toEqualJSONyFied: function (util, customTesters) {
                return {
                    compare: function (actual, expected) {
                        var result = {};
                        result.pass = util.equals(JSON.stringify(actual), JSON.stringify(expected), customTesters);
                        if (!result.pass) {
                            result.message = "Expected: " + JSON.stringify(expected) + "\n" +
                                "to Equal: " + JSON.stringify(actual);
                        } else {
                            result.message = "Expected: " + JSON.stringify(expected) + "\n" +
                                "is Equal: " + JSON.stringify(actual) + "\n" +
                                "but should not be equal";
                        }
                        return result;
                    }
                }
            }
        });
    });

    it('should not call save Route and not draw marker when route is still null', function () {
        spyOn(RouteDataService, 'saveRoutePointByLatLng');
        spyOn(RouteDataService, 'saveRouteSection');

        spyOn(RouteDataService, 'getRoute').and.callFake(function () {
            return null;
        });
        expect(RouteDataService.getRoute()).toBe(null);
        scope.onMapClick({lat: "11.11", lng: "11.11"});
        expect(RouteDataService.saveRoutePointByLatLng).not.toHaveBeenCalled();
        expect(RouteDataService.saveRouteSection).not.toHaveBeenCalled();
    });


    it('should call save RoutePoint on RouteDataService when a point is added to Map', function () {
        spyOn(RouteDataService, 'saveRoutePointByLatLng');
        scope.onMapClick({lat: 12.34, lng: 56.78});
        //expect(RouteDataService.saveRoutePointByLatLng).toHaveBeenCalledWith(new RoutePoint(new LatLng({lat: "12.34", lng: "56.78"}, null), null, null));
        //expect(RouteDataService.saveRoutePointByLatLng).toHaveBeenCalled();
        expect(RouteDataService.saveRoutePointByLatLng.calls.argsFor(0)).toEqualJSONyFied([{lat: 12.34, lng: 56.78}]);
    });


    it('should call save RouteSection on RouteDataService when previous point exists already', function () {
        spyOn(RouteDataService, 'saveRouteSection');

        spyOn(RouteDataService, 'saveRoutePointByLatLng').and.callFake(function () {
            return new RoutePoint(new LatLng({lat: 22.22, lng: 22.22}, null), new Content(null, null, null, null), new TimePeriod(null));
        });
        spyOn(RouteDataService, 'getRoute').and.callFake(function () {
            return new Route("something");
        });
        spyOn(RouteDataService, 'getLastRouteTableEntry').and.callFake(function () {
            return new RoutePoint(new LatLng({lat: 11.11, lng: 11.11}, null), new Content(null, null, null), new TimePeriod(null));
        });

        scope.onMapClick({lat: 22.22, lng: 22.22});
        expect(RouteDataService.saveRoutePointByLatLng.calls.argsFor(0)).toEqualJSONyFied([{lat: 22.22, lng: 22.22}]);
    });

    it('should set focus in RouteDataService when point in Map selected', function () {
        spyOn(RouteDataService, 'selectRoutePointByLatLngs');
        //select Point
        scope.onMapSelectRouteElementByLatLng({lat: "11.11", lng: "11.11"});
        expect(RouteDataService.selectRoutePointByLatLngs).toHaveBeenCalledWith({lat: "11.11", lng: "11.11"});
    });

    it('should set focus to selected RouteSection in RouteDataService when path in Map selected', function () {
        spyOn(RouteDataService, 'selectRouteSectionByLatLngs');
        var routeSection = [{lat: "11.11", lng: "11.11"}, {lat: "22.22", lng: "22.22"}];
        scope.onMapSelectRouteElementsByLatLng(routeSection);
        expect(RouteDataService.selectRouteSectionByLatLngs).toHaveBeenCalledWith(routeSection);
    });

    it('should call save Titel on dataService and place on click save Button at RoutePoint', function () {
        spyOn(RouteDataService, 'saveTitelAndPlaceForCurrentSelection');
        scope.saveTitleAndPlace("some Titel", "some Place or City");
        expect(RouteDataService.saveTitelAndPlaceForCurrentSelection).toHaveBeenCalledWith("some Titel", "some Place or City");
    });

})
;



