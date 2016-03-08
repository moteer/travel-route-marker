var myEditAbleTableApp = angular.module('EditableRoutePartTableApp', []);
myEditAbleTableApp.controller('EditableRoutePartTableController', ['$scope', function($scope) {
    $scope.elements = 0;
    $scope.addRow = function () {
        $scope.elements = 2;
    };
}]);
