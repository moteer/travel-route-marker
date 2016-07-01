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

mapApp.controller('ImageUploadController', ["$scope",
    function ($scope) {

        $scope.fileUrls = [];

        $scope.uploadMulti = function () {
            angular.forEach($scope.files, function (file) {
                var fileUrl = window.URL.createObjectURL(file);
                console.log(fileUrl);
                $scope.fileUrls.push(fileUrl);
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

