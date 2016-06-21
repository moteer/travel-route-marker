mapApp.directive('editModal', function () {
        return {
            templateUrl:'partials/templates/edit-modal-content.html',
            restrict: 'E',
            transclude: true,
            replace: true,
        }
    }
);
