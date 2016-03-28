mapApp.service('RouteDataService', function () {

    this.route = null;
    this.routeTableEntries = new Array();
    this.currentSelectionIndex = null;

    this.createNewRoute = function (titel) {
        this.route = new Route(titel);
    };

    this.init = function (route) {
        this.route = route;
    };

    this.getRoute = function () {
        return this.route;
    };

    this.getNumberOfRouteSections = function () {
        return this.getRouteSections().length;
    };

    this.getRoutePoints = function () {
        if (this.route === null) {
            return [];
        }
        return this.route.getRoutePoints();
    };

    this.getRouteSections = function () {
        if (this.route === null) {
            return [];
        }
        return this.route.getRouteSections();
    };

    this.getTitel = function () {
        if (this.route === null) {
            return "...";
        }
        return this.route.getTitel();
    };

    this.saveRouteSection = function (routePointA, routePointB, content) {
        var routeSection = new RouteSection(routePointA, routePointB, content);
        this.route.addRoutePoint(routePointA);
        this.route.addRoutePoint(routePointB);
        this.route.addRouteSection(routeSection);    
    };

    this.saveRoutePointByName = function (latLng, content, timePeriod) {
        var routePoint = new RoutePoint(latLng, content, timePeriod);
        this.route.addRoutePoint(routePoint);
    };


    this.saveRoutePointByLatLng = function (latLng) {
        var routePoint = new RoutePoint(latLng);
        this.route.addRoutePoint(routePoint);
    };

    this.selectRouteTableEntry = function (index) {
        this.currentSelectionIndex = index;
    };

    this.getRouteTableEntries = function() {
        var routeSections = this.getRouteSections();
        var tableEntries = new Array();
        var i=0;
        for (; i<routeSections.length; i++) {
            tableEntries.push(routeSections[i].getFromRoutePoint());
            tableEntries.push(routeSections[i]);
        }
        if (routeSections.length !== 0) {
            tableEntries.push(routeSections[i-1].getToRoutePoint());
        }

        return tableEntries;
    };

    this.getCurrentlySelectedRouteTableEntry = function () {
        return this.getRouteTableEntries()[this.currentSelectionIndex];
    };

    this.resetCurrentSelection = function () {
        this.currentSelectionIndex = undefined;
    };
});
