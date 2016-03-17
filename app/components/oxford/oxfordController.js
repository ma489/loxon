'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/oxford', {
    templateUrl: 'components/oxford/oxfordView.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', [function($scope) {
  var mapOptions = {
    zoom: 14,
    center: new google.maps.LatLng(51.7568262, -1.2281289),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
}]);