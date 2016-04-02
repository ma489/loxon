'use strict';

angular
    .module('loxon.london', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/london', {
            templateUrl: 'components/london/londonView.html',
            controller: 'londonController'
        });
    }])
    .controller('londonController', [function($scope) {
        var map = initialiseLondonMap();
    }]);

function initialiseLondonMap() {
    const LONDON_LATITUDE = 51.5050041;
    const LONDON_LONGITUDE = -0.1981156;
    const ZOOM_LEVEL = 14;
    var mapOptions = {
        zoom: ZOOM_LEVEL,
        center: new google.maps.LatLng(LONDON_LATITUDE, LONDON_LONGITUDE),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    return new google.maps.Map(document.getElementById('londonMap'), mapOptions);
}