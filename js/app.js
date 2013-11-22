angular.module('canalapp', ['uiSlider', 'ckServices', 'ngRoute'])
	.config(function($routeProvider, $locationProvider) {
		$routeProvider.when('/map', {
			templateUrl: 'views/map.html',
			controller: 'MapCtrl'
		});
		$routeProvider.when('/moreInfo/:formId/:itemId', {
			templateUrl: 'views/moreInfo.html',
			controller: 'MoreInfoCtrl'
		});
		$routeProvider.otherwise({
			redirectTo: '/map'
		});
	});