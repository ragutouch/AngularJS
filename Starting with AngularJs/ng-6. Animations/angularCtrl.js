angular.module('myApp',['ngAnimate'])

.controller('myCtrl', function($scope){
	$scope.items=[];
	$scope.addItems= function(){
		for(i=10;i--;)
		{
			$scope.items.push({'title':'item' + i})
		}
	}
	$scope.clearItems= function(){
		$scope.items=[];
	}
	$scope.removeItem= function(index){
		$scope.items.splice(index, 1)
	}
});