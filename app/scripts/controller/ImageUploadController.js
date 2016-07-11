mapApp.directive('fileChange', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        scope: {
            fileChange: '&'
        },
        link: function link($scope, element, attrs, ctrl) {
            element.on('change', onChange);

            $scope.$on('destroy', function () {
                element.off('change', onChange);
            });

            function onChange() {
                attrs.multiple ? ctrl.$setViewValue(element[0].files) : ctrl.$setViewValue(element[0].files[0]);
                $scope.$apply(function () {
                    $scope.fileChange();
                });
            }
        }
    };
});

mapApp.controller('ImageUploadController', ["$scope", "RouteDataService",
    function ($scope, RouteDataService) {

        $scope.uploadMulti = function () {

            angular.forEach($scope.files, function (file) {
                RouteDataService.saveImageToCurrentSelection(file);
            });
        };

        $scope.checkForFileAPISuuport = function () {
            if (window.File && window.FileReader && window.FileList && window.Blob) {
                alert('The File APIs fully supported :)');
            } else {
                alert('The File APIs are not fully supported in this browser.');
            }
        };

    }]);
