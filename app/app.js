'use strict';

// Declare app level module which depends on views, and components
angular
    .module('loxon', [
        'ngRoute',
        'ngMaterial',
        'ngAnimate',
        'ngAria',
        'loxon.home',
        'loxon.oxford',
        'loxon.london',
        'loxon.info',
        'loxon.version'
    ])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/home'});
    }]);

//loxon.service('StopService',
//    function ($rootScope) {
//      var service = this;
//
//      service.setLoading = function (loading) {
//        $rootScope.loadingView = loading;
//      };
//    });