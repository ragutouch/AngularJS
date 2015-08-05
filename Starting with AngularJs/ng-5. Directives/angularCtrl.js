angular.module('myApp',[])

.directive('elementDirective', function(){
	return{
		restrict:'E',
		replace: true,
		template:"<h1>My first Directive using Element</h1>"
	}
})
.directive('attributeDirective', function(){
	return{
		restrict:'A',
		replace: true,
		template:"<h1>My Directive using Attribute</h1>"
	}
})
.directive('classDirective', function(){
	return{
		restrict:'C',
		replace: true,
		template:"<h1>My Directive using Class</h1>"
	}
})


.directive('myDataDirective', function() {
	return {
		restrict: 'A',
		replace: true,
		scope:{
			myUrl: '=someAttr',
			myLinkText: '@'
		},
		template: '\
				<div>\
				<label>My Url Field:</label>\
				<input type="text"\
				ng-model="myUrl" />\
				<a href="{{myUrl}}">{{myLinkText}}</a>\
				</div>'
	}
})
;