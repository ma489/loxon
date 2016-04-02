'use strict';

// Declare app level module which depends on views, and components
angular.module('loxon', [
  'ngRoute',
  'ngMaterial',
  'ngAnimate',
  'ngAria',
  'loxon.home',
  'loxon.oxford',
  'loxon.london',
  'loxon.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/home'});
}]);

loxon.value('COACH_ROUTES', [
  {id: 8602, service: 'Tube', name: 'Oxford - London', origin: 'Oxford'},
  {id: 8603, service: 'Tube', name: 'London - Oxford', origin: 'London'},
  {id: 8547, service: 'X90', name: 'Gloucester Green Bus Station - Green Line Coach Station', origin: 'Oxford'},
  {id: 8548, service: 'X90', name: 'Green Line Coach Station - Gloucester Green Bus Station', origin: 'London'}
]);