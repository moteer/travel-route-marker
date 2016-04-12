mapApp.service('RouteDataService', function () {

    this.route = null;
    this.currentSelectionIndex = null;
    this.routeTableEntries = new Array();

    this.createNewRoute = function (titel) {
        this.route = new Route(titel);
    };

    this.init = function (route) {
        this.createNewRoute(route.getTitel());
        var routeSections = route.getRouteSections();
        for (var i = 0; i < routeSections.length; i++) {
            this.saveRouteSection(routeSections[i].getFromRoutePoint(),
                routeSections[i].getToRoutePoint(),
                routeSections[i].getContent());
        }
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
        this.route.addRouteSection(routeSection);
        this.routeTableEntries.push(routeSection);
    };

    this.getPreviousRoutePoint = function () {
        console.log("PreviousRoutePoint called with " + this.getRoutePoints().toString());
        return this.getRoutePoints().length > 0 ? this.getRoutePoints()[this.getRoutePoints().length - 1] : null;
    };

    this.saveRoutePoint = function (routePoint) {
        var prevRoutePoint = this.getPreviousRoutePoint();
        if (prevRoutePoint !== null) {
            this.saveRouteSection(prevRoutePoint, routePoint, new Content(null, null))
        }
        this.route.addRoutePoint(routePoint);
        this.routeTableEntries.push(routePoint);
    };

    this.saveRoutePointByName = function (latLng, content, timePeriod) {
        var routePoint = new RoutePoint(latLng, content, timePeriod);
        this.saveRoutePoint(routePoint);
    };

    this.saveRoutePointByLatLng = function (latLng) {
        var routePoint = new RoutePoint(latLng, new Content(null, null), new TimePeriod(null));
        this.saveRoutePoint(routePoint);
        return routePoint;
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
        return this.routeTableEntries;
    };

    this.getCurrentlySelectedRouteTableEntry = function () {
        return this.getRouteTableEntries()[this.currentSelectionIndex];
    };

    this.resetCurrentSelection = function () {
        this.currentSelectionIndex = undefined;
    };

    // TODO: not tested
    this.getLastRouteTableEntry = function () {
        return this.routeTableEntries[this.routeTableEntries.length - 1];
    }

    this.prevClickTime = undefined;
    this.isEventToIgnore = function (currentTimeStamp) {
        var toIgnore = true;
        console.log("------------ > Click " + (this.prevClickTime === undefined ? "for the first time" : "time difference is " + (currentTimeStamp - this.prevClickTime)));
        if (this.prevClickTime === undefined || (currentTimeStamp - this.prevClickTime) > 400) {
            toIgnore = false;
        }
        this.prevClickTime = currentTimeStamp;

        return toIgnore;
    };

});
