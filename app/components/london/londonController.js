'use strict';

angular.module('myApp.view3', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/london', {
        templateUrl: 'components/london/londonView.html',
        controller: 'View3Ctrl'
    });
}])

.controller('View3Ctrl', [function($scope) {
    var mapOptions = {
        zoom: 14,
        center: new google.maps.LatLng(51.5050041, -0.1981156),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
}]);