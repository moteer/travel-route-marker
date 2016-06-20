mapApp.controller('RouteTableController', ["$scope", "RouteDataService", function ($scope, RouteDataService) {

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

    $scope.checkForFileAPISuuport = function() {
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            alert('The File APIs fully supported :)');
        } else {
          alert('The File APIs are not fully supported in this browser.');
        }
    };

    $scope.selectLocalFile = function(evt) {
        var files = evt.files; // FileList object

        // files is a FileList of File objects. List some properties.
        var output = [];
        for (var i = 0, f; f = files[i]; i++) {
          output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                      f.size, ' bytes, last modified: ',
                      f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
                      '</li>');
        }
        $scope.filelist = output;
      };
}]);



