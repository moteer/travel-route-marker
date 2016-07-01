/*
 * Copyright (c) 2003 - 2016 Tyro Payments Limited.
 * Lv1, 155 Clarence St, Sydney NSW 2000.
 * All rights reserved.
 */
mapApp.directive('imageUpload', function () {
        return {
            templateUrl:'partials/templates/image-upload.html',
            restrict: 'E',
            transclude: true,
            replace: true,
        }
    }
);
