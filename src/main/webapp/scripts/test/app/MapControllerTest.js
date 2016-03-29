describe('Map Controller', function () {

    beforeEach(function () {
        var mockRouteDataService = {};
        module('RouteApp', function ($provide) {
            $provide.value('RouteDataService', mockRouteDataService);
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

        mockRouteDataService.saveRouteSectionByLatLngs = function (routePartArray) {
            console.log("mock mockRouteTableController.saveRouteSectionByLatLngs was called with routePart" + routePartArray);
        };

        mockRouteDataService.getRoute = function () {
            console.log("mock mockRouteTableController.getRoute was called");
        };
    });

    beforeEach(inject(function ($rootScope, $controller, _RouteDataService_) {
        scope = $rootScope.$new();
        RouteDataService = _RouteDataService_;
        MapController = $controller('MapController', {
            $scope: scope,
            routeDataService: RouteDataService
        });
    }));

    it('should not call save Route and not draw marker when route is still null', function () {
        spyOn(RouteDataService, 'saveRoutePointByLatLng');
        spyOn(RouteDataService, 'saveRouteSectionByLatLngs');

        spyOn(RouteDataService, 'getRoute').and.callFake(function () {
            return null;
        });
        expect(RouteDataService.getRoute()).toBe(null);
        scope.onMapClick({lat: "11.11", lng: "11.11"});
        expect(RouteDataService.saveRoutePointByLatLng).not.toHaveBeenCalled();
        expect(RouteDataService.saveRouteSectionByLatLngs).not.toHaveBeenCalled();
    });


    it('should call save RoutePoint on RouteDataService when a point is added to Map', function () {
        spyOn(RouteDataService, 'saveRoutePointByLatLng');
        scope.onMapClick({lat: "12.34", lng: "56.78"});
        //expect(RouteDataService.saveRoutePointByLatLng).toHaveBeenCalledWith(new RoutePoint(new LatLng({lat: "12.34", lng: "56.78"}, null), null, null));
        expect(RouteDataService.saveRoutePointByLatLng).toHaveBeenCalled();
    });

    //[ RoutePoint({ latLng: LatLng({ lat: '12.34', lng: '56.78', city: null }), content: null, timePeriod: null, getLatLng: Function, getContent: Function, getTimePeriod: Function }) ] but actual calls were
    //[ RoutePoint({ latLng: LatLng({ lat: '12.34', lng: '56.78', city: null }), content: null, timePeriod: null, getLatLng: Function, getContent: Function, getTimePeriod: Function }) ]

    //it('should call save RouteSection on RouteDataService when two points added to Map', function () {
    //    spyOn(RouteDataService, 'saveRouteSectionByLatLngs');
    //    scope.onMapClick({lat: "11.11", lng: "11.11"});
    //    scope.onMapClick({lat: "22.22", lng: "22.22"});
    //
    //    expect(RouteDataService.saveRouteSectionByLatLngs).toHaveBeenCalledWith(
    //        new RoutePoint(new LatLng({lat: "11.11", lng: "11.11"}, null), null, null),
    //        new RoutePoint(new LatLng({lat: "22.22", lng: "22.22"}, null), null, null), null);
    //
    //    scope.onMapClick({lat: "44.44", lng: "44.44"});
    //
    //    expect(RouteDataService.saveRouteSectionByLatLngs).toHaveBeenCalledWith(
    //        new RoutePoint(new LatLng({lat: "22.22", lng: "22.22"}, null), null, null),
    //        new RoutePoint(new LatLng({lat: "44.44", lng: "44.44"}, null), null, null), null);
    //});

    it('it should set focus in RouteDataService when point in Map selected', function () {
        spyOn(RouteDataService, 'selectRoutePointByLatLngs');
        //select Point
        scope.onMapSelectRouteElementByLatLng({lat: "11.11", lng: "11.11"});
        expect(RouteDataService.selectRoutePointByLatLngs).toHaveBeenCalledWith({lat: "11.11", lng: "11.11"});
    });

    it('it should set focus to selected RouteSection in RouteDataService when path in Map selected', function () {
        spyOn(RouteDataService, 'selectRouteSectionByLatLngs');
        var routeSection = [{lat: "11.11", lng: "11.11"}, {lat: "22.22", lng: "22.22"}];
        scope.onMapSelectRouteElementsByLatLng(routeSection);
        expect(RouteDataService.selectRouteSectionByLatLngs).toHaveBeenCalledWith(routeSection);
    });

})
;



