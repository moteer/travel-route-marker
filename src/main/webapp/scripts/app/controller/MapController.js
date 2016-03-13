mapModule.controller('MapController', function ($scope) {
	$scope.currentPoint;
		$scope.onMapClick = function (lat, lng) {
		$scope.currentPoint = {lat:lat, lng:lng};
	};
});

