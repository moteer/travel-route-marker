mapApp.controller('EditModalController', ["$scope", "RouteDataService", "$modal", "$rootScope",
    function ($scope, RouteDataService, $modal, $rootScope) {
        $scope.someVar = "hier bin ich im EditModalController";
        $scope.openEditModal = function () {

            var modalInstance = $modal.open({
                templateUrl: 'partials/templates/edit-modal-content.html',
                controller: ModalInstanceCtrl,
                resolve: {
                    routePoint: function () {
                        //return {city:"some city", titel:"sometitel", description:"somedescription"};
                        return RouteDataService.getCurrentlySelectedRouteTableEntry();
                    }
                }
            });

            modalInstance.result.then(function (routePoint) {
                $scope.selected = routePoint;
                $rootScope.$broadcast("modal.save", routePoint);
            }, function () {
                //$log.info('Modal dismissed at: ' + new Date());
            });
        };

        var ModalInstanceCtrl = function ($scope, $modalInstance, routePoint) {

            $scope.selected = {
                city: routePoint.latLng.city,
                titel: routePoint.content.titel,
                description: routePoint.content.description
            };

            $scope.ok = function () {
                $modalInstance.close($scope.selected);
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        };
    }]);

//http://tombatossals.github.io/angular-leaflet-directive/examples/0000-viewer.html#/basic/first-example
