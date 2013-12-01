angular.module('canalapp').controller('MoreInfoCtrl', ['$scope', '$compile', '$q', 'ckConsole', '$route', '$routeParams', '$location', function($scope, $compile, $q, ckConsole, $route, $routeParams, $location){
	$scope.$route = $route;
	$scope.$location = $location;
	$scope.$routeParams = $routeParams;
	
	$scope.backToMap = function(){
		$location.path('/map');
	};
	
	ckConsole.getExpandedData($route.current.params.itemId).then(function(val){
		$scope.item = val;
		console.log(val);
	});
	ckConsole.getForm($route.current.params.formId).then(function(val){
		$scope.mainForm = val;
	});
	
	var formIdFromType = {};
	$q.all({
		"MERGE Canal Segments": ckConsole.getForm("30075bc4-1887-ff9c-a0a8-c2057d8e7fd7")
	}).then(function(map){formIdFromType = map;});
	var iconClassFromType = {
		"MERGE Canal Segments": {
			icon: "icon-stack",
			color: "rgb(6, 151, 0)"
		}
	};
	
	$scope.formFromType = function(item){
		return formIdFromType[item.birth_certificate.type];
	};
	$scope.iconClassFromType = function(subitem){
		return iconClassFromType[subitem.birth_certificate.type].icon;
	};
	$scope.colorFromType = function(subitem){
		return iconClassFromType[subitem.birth_certificate.type].color;
	};
	
	$scope.visibleSubgroup = 0;
	$scope.toggleVisibleSubgroup = function(index){
		if($scope.visibleSubgroup == index)
			$scope.visibleSubgroup = -1;
		else
			$scope.visibleSubgroup = index;
	};
	
}]);