mapApp.controller('RouteTableController', ["$scope", "RouteDataService", function ($scope, RouteDataService) {


    $scope.currentlySelected = "WHAT A Selection";


    $scope.routeDataService = RouteDataService;
    $scope.selectionIndex;

    $scope.newTitel,
        $scope.newDescription,
        $scope.newImage,
        $scope.newCity,
        $scope.shortDescriptor;

    $scope.createNewRoute = function () {
        $scope.routeDataService.createNewRoute($scope.newTitel);
    };

    $scope.getTitel = function () {
        return $scope.routeDataService.getTitel();
    };

    $scope.addRoutePoint = function () {
        console.log("city: " + $scope.newCity + " shortDescriptor: " + $scope.shortDescriptor + " saved to route");
        if ($scope.routeDataService.getRoute() !== null
            && $scope.newCity !== null && $scope.newCity !== undefined
            && $scope.shortDescriptor !== null && $scope.shortDescriptor !== undefined) {

            $scope.saveRoutePointByName($scope.newCity, $scope.shortDescriptor);
            console.log("route: " + $scope.routeDataService.getRoute());
        }
        $scope.shortDescriptor = null;
        $scope.newCity = null;
    };

    $scope.saveRoutePointByName = function (city, shortDescriptor) {
        RouteDataService.saveRoutePointByName(new LatLng(null, city), new Content(shortDescriptor, null, null), new TimePeriod(null));
    };

    $scope.onSelectTableEntry = function (index) {
        $scope.routeDataService.selectRouteTableEntry(index);
        $scope.selectionIndex = RouteDataService.getCurrentlySelectedRouteTableEntryIndex();
        $scope.$broadcast("routeTableEntryChanged", this.currentSelectionIndex);
    };

    $scope.onResetSelection = function () {
        $scope.routeDataService.resetCurrentSelection();
    };

    $scope.$on("current.selection.updated", function (e, newValue) {
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~     current.selection.updated event has been received by RouteTableController")
        $scope.selectionIndex = RouteDataService.getCurrentlySelectedRouteTableEntryIndex();
    });

    $scope.$on("current.selection.changed", function (e, newValue) {
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~     current.selection.changed event has been received by RouteTableController changed to " + newValue)
        $scope.currentSelectedItem = RouteDataService.getCurrentlySelectedRouteTableEntryIndex();
    });


    $scope.deleteRow = function (content) {
        // var index = $scope.rows.indexOf(content);
        // if (index > -1) {
        //     $scope.rows.splice(index, 1);
        // }
    };

    $scope.getImageSource = function (image) {
        return window.URL.createObjectURL(image);
    };

    $scope.accordion = "234523432";

    $scope.changeAccordion = function(itemName) {
        $scope.accordion = itemName;
        console.log("accordion changed to: " + itemName);
    };
}]);



