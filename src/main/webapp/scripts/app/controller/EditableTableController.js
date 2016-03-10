editableRoutePartTableApp.controller('EditableRoutePartTableController', function ($scope) {

    $scope.rows = [];

    $scope.elements = function () {
        return $scope.rows.length;
    };

    $scope.addRow = function () {
        $scope.rows.push($scope.newRow);
    };

    $scope.deleteRow = function (content) {
        var index = $scope.rows.indexOf(content);
        if (index > -1) {
            $scope.rows.splice(index, 1);
        }
    };

});

