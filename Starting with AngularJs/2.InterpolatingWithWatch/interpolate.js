var app = angular.module('myApp',[])

app.controller('myCtrl', function($scope, $interpolate){
	$scope.$watch('emailBody', function(body){
		if (body) {
			var template=$interpolate(body);
			$scope.previewText=template({to: $scope.to})
		};
	});
});