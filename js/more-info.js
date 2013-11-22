angular.module('canalapp').controller('MoreInfoCtrl', ['$scope', '$compile', '$q', '$ckConsole', '$route', '$routeParams', '$location', function($scope, $compile, $q, $ckConsole, $route, $routeParams, $location){
	$scope.$route = $route;
	$scope.$location = $location;
	$scope.$routeParams = $routeParams;
	
	$scope.backToMap = function(){
		$location.path('/map');
	};
	
	var dataId = $route.current.params.itemId;
	$ckConsole.getData(dataId).then(function(data){
		$scope.data = data;
	});
}]);