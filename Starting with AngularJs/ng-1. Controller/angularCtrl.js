angular.module('myApp',[])
.run(function($rootScope){
	$rootScope.name="RAGU";
})

.controller('myCtrl', function($scope){
	$scope.string="Good work";
	$scope.funcTest=function(){
		alert("dsf");
	}
});