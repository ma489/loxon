'use strict';

angular.module('loxon.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'components/home/homeView.html',
    controller: 'homeController'
  });
}])

.controller('homeController', [function() {

}]);