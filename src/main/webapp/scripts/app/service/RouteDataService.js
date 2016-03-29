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

    function isLatLngEqualTo(latLngObject, latLng) {
        return latLngObject.lat === latLng.lat
            && latLngObject.lng === latLng.lng;
    }

    this.selectRoutePointByLatLngs = function (latLng) {
        this.resetCurrentSelection();
        var routeSections = this.getRouteSections();
        for (var i = 0; i < routeSections.length; i++) {
            if (isLatLngEqualTo(routeSections[i].getFromRoutePoint().getLatLng(), latLng)) {
                this.currentSelectionIndex = i * 2;
            } else if (isLatLngEqualTo(routeSections[i].getToRoutePoint().getLatLng(), latLng)
                && routeSections.length - 1 == i) {
                this.currentSelectionIndex = i * 2 + 2;
            }
        }
    };

    this.selectRouteSectionByLatLngs = function (latLngs) {
        this.resetCurrentSelection();
        var routeSections = this.getRouteSections();
        for (var i = 0; i < routeSections.length; i++) {
            if (isLatLngEqualTo(routeSections[i].getFromRoutePoint().getLatLng(), latLngs[0]) &&
                isLatLngEqualTo(routeSections[i].getToRoutePoint().getLatLng(), latLngs[1])) {
                this.currentSelectionIndex = i * 2 + 1;
            }
        }
    };

    this.getRouteTableEntries = function () {
        var routeSections = this.getRouteSections();
        var tableEntries = new Array();
        var i = 0;
        for (; i < routeSections.length; i++) {
            tableEntries.push(routeSections[i].getFromRoutePoint());
            tableEntries.push(routeSections[i]);
        }
        if (routeSections.length !== 0) {
            tableEntries.push(routeSections[i - 1].getToRoutePoint());
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
