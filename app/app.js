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
        'loxon.utils',
        'loxon.version'
    ])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/home'});
    }]);
