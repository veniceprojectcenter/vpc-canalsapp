angular.module('canalapp', ['uiSlider', 'ckServices', 'ngRoute', 'ngAnimate'])
	.config(function($routeProvider, $locationProvider, $rootScopeProvider) {
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
		$rootScopeProvider.digestTtl(30);
	});