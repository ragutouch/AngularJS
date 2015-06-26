angular.module('myApp',[])

.controller('myCtrl', function($scope, $filter){
	$scope.string = $filter('uppercase')("Start to study");
	$scope.string2 = "angular.js";
	$scope.decimalPoint = $filter('number')(83.738732748,3);
	$scope.decimalPoint2 = "4276543.87632748";
	
	var updateClock = function() {
		$scope.today = new Date();
	};
	setInterval(function() {
		$scope.$apply(updateClock);
	}, 89);
	updateClock();

	$scope.isCapitalized = function(str) { 
		return str[0] == str[0].toUpperCase(); 
	}

});

