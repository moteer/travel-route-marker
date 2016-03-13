routeTableApp.controller('RouteTableController', function ($scope) {

    $scope.route = {};
    $scope.newDescription, $scope.newImage;

    $scope.titel = function () {
        return $scope.route.titel;
    };

    $scope.initWithFakeDataForFrontEndTest = function() {
        var route = new Route("My first travel experience.");
        var content = new Content("some description", "some image");
        var timePeriod = new TimePeriod("1.1.2016", "1.2.2016");
        var geoCoordinates = new GeoCoordinates(
                                new GeoCoordinate("1", "2"), 
                                new GeoCoordinate("2", "3")); 
        var rp = new RoutePart(content, timePeriod, geoCoordinates);    
        route.addRoutePart(rp);
        route.addRoutePart(new RoutePart(new Content("new description", "new image"), 
                                        new TimePeriod(), 
                                        new GeoCoordinates(
                                            new GeoCoordinate("5", "6"), 
                                            new GeoCoordinate("7", "8"))));
        $scope.route = route;
    };    

    $scope.getNumberOfRouteParts = function () {
        return $scope.route.getRouteParts().length;
    };

    $scope.getRouteParts = function() {
        return $scope.route.getRouteParts();
    };

    $scope.saveRoutePart = function () {
        console.log($scope.newDescription + " | "+ $scope.newImage);
        $scope.route.addRoutePart(new RoutePart(
            new Content($scope.newDescription, $scope.newImage)));
    };

    $scope.deleteRow = function (content) {
        // var index = $scope.rows.indexOf(content);
        // if (index > -1) {
        //     $scope.rows.splice(index, 1);
        // }
    };

});
