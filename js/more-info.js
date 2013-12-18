angular.module('canalapp').controller('MoreInfoCtrl', ['$scope', '$compile', '$q', 'ckConsole', '$route', '$routeParams', '$location', function($scope, $compile, $q, ckConsole, $route, $routeParams, $location){
	$scope.$route = $route;
	$scope.$location = $location;
	$scope.$routeParams = $routeParams;
	
	$scope.backToMap = function(){
		$location.path('/map');
	};
	
	ckConsole.getExpandedData($route.current.params.itemId).then(function(val){
		$scope.item = val;
		$scope.hasImage = false;
	});
	ckConsole.getForm($route.current.params.formId).then(function(val){
		$scope.mainForm = val;
	});
	
	var formIdFromType = {};
	$q.all({
		"MERGE Canal Segments": ckConsole.getForm("30075bc4-1887-ff9c-a0a8-c2057d8e7fd7"),
		"DATA Segment Boat Traffic": ckConsole.getForm("30075bc4-1887-ff9c-a0a8-c2057d8e7fd7"),
	}).then(function(map){formIdFromType = map;});
	var subgroupDataFromType = {
		"MERGE Canal Segments": {
			icon: "icon-stack",
			color: "rgb(6, 151, 0)",
			formId: "39757f24-38a9-7a7c-dcc8-41ee3abdbeff",
		},
		"DATA Job Items": {
			icon: "icon-document",
			color: "rgb(100, 20, 0)",
			formId: "9bf8a58e-27b3-19b2-cc4c-235cc999f825",
		},
		"DATA Segment Boat Traffic": {
			icon: "icon-document",
			color: "rgb(1, 34, 66)",
			formId: "2c67a823-76a4-9f05-c4f9-ddafbf3ac8c9",
		},
	};
	var subgroupFormQuery = {};
	for(var type in subgroupDataFromType){
		var formId = subgroupDataFromType[type].formId;
		if(formId)
			subgroupFormQuery[type] = ckConsole.getForm(formId);
	}
	$q.all(subgroupFormQuery).then(function(subgroupForms){
		for(var type in subgroupForms){
			subgroupDataFromType[type].form = subgroupForms[type];
		}
		console.log(subgroupDataFromType);
	});
	
	$scope.formFromType = function(item){
		return subgroupDataFromType[item.birth_certificate.type].form;
	};
	$scope.iconClassFromType = function(item){
		return subgroupDataFromType[item.birth_certificate.type].icon;
	};
	$scope.colorFromType = function(item){
		return subgroupDataFromType[item.birth_certificate.type].color;
	};
	
	
	$scope.visibleSubgroup = 0;
	$scope.toggleVisibleSubgroup = function(index){
		if($scope.visibleSubgroup == index)
			$scope.visibleSubgroup = -1;
		else
			$scope.visibleSubgroup = index;
	};
	
}]);