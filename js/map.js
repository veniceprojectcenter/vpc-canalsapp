angular.module('canalapp').controller('MapCtrl', ['$scope', '$compile', '$q', 'ckConsole', 'ckConsoleMap', '$location', function($scope, $compile, $q, ckConsole, ckConsoleMap, $location){
	var htmlContent = '<span><div ng-include src="\'views/infopopup.html\'"></div></span>';
	var compiledPopup = $compile(htmlContent)($scope);
	$scope.infoPopup = L.popup().setContent(compiledPopup[0]);
		
	$( document ).ready(function() {
		$('#loadingPanel').css('background-color','rgba(0,0,0,0.5)');
		$('#spinner').spin('large', '#fff');
		
		$scope.map = L.map("map-canvas", {minZoom: 14}).setView([45.436 , 12.334], 14);
		$scope.baseLayer = new L.TileLayer(
			'http://{s}.tiles.mapbox.com/v3/bennlich.map-8ds9rdrc/{z}/{x}/{y}.png',
			{ attribution: 'Map tiles © MapBox' }
			).addTo($scope.map);
		L.control.scale().addTo($scope.map);
		
		$scope.layerControl = L.control.layers({"Map": $scope.baseLayer}, {}).addTo($scope.map);
		
		var styles = {
			"MERGE Ponti": {fillColor: '#FF0000',color: '#FF0000',
					fillOpacity: 1.0, weight: 8, opacity: 1.0},
			"MERGE Canal Segments":  {fillColor: '#00FF00',color: '#000000',
					fillOpacity: 1.0, weight: 1, opacity: 1.0},
			"MERGE Canals":  {fillColor: '#0000FF',color: '#0000FF',
					fillOpacity: 1.0, weight: 1, opacity: 1.0},
		};
		var names = {
			"MERGE Ponti": "Bridges",
			"MERGE Canal Segments":  "Canal Segments",
			"MERGE Canals":  "Canals",
		};
		ckConsoleMap.createMapLayersFromMapData($scope.map, ckConsole.getMap("map-408fc81f-c4ec-2ffe-b476-7290cdf8d9b3", true), function(groupname, layer){
			layer.setStyle(styles[groupname]);
			layer.on('click', showInfoBox);
			$scope.layerControl.addOverlay(layer.getLayer(), names[groupname]);
			
			$('#loadingPanel').hide();
			$('#spinner').spin(false);
		}).then(function(map){
			console.log(map);
			$('#loadingPanel').hide();
			$('#spinner').spin(false);
		});
		
		
		function showInfoBox(e, member, marker, layer){
			$scope.popupLayer= layer;
			$scope.popupItem = member;
			$scope.$apply();//make sure to update popup before displaying it
			$scope.infoPopup.setLatLng(e.latlng).openOn($scope.map);
		}
		
		$scope.showMoreInfo = function(){
			$location.path('/moreInfo/'+$scope.popupLayer.properties.moreLink.id+'/'+$scope.popupItem.birth_certificate.ckID);
		}
		
		$scope.visitVenipedia = function(){
			var pageTitle = $scope.popupItem.data.wiki_title;
			window.open("http://venipedia.org/wiki/index.php?title="+pageTitle);
		}
	});
}]);