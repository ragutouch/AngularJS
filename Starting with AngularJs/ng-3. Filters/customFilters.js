angular.module('myApp',[])

.controller('myCtrl', function($scope, $filter){
	$scope.string = "ginger LOVES dog treats";


})

.filter('capitalize', function(){
	return function(input){
		if(input){
			return input[0].toUpperCase()+input.slice(1);
		}
	}
});

