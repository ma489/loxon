'use strict';

angular
    .module('loxon.oxford', ['ngRoute', 'loxon.stops', 'loxon.info', 'loxon.utils'])
    .constant('OXFORD_LATITUDE', 51.7568262)
    .constant('OXFORD_LONGITUDE', -1.2281289)
    .constant('OXFORD_MAP_ID', 'oxfordMap')
    .constant('REFRESH_TIME_MILLIS', 60000)
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/oxford', {
            templateUrl: 'components/oxford/oxfordView.html',
            controller: 'oxfordController'
        });
    }])
    .controller('oxfordController',
        ['$scope', '$q', 'CoachStopService', 'OXFORD_COACH_ROUTES', 'COACH_SERVICES', '$interval', 'UtilitiesService', 'OXFORD_LATITUDE', 'OXFORD_LONGITUDE', 'OXFORD_MAP_ID', 'REFRESH_TIME_MILLIS',
        function ($scope, $q, CoachStopService, OXFORD_COACH_ROUTES, COACH_SERVICES, $interval, UtilitiesService, OXFORD_LATITUDE, OXFORD_LONGITUDE, OXFORD_MAP_ID, REFRESH_TIME_MILLIS) {
            $scope.map = UtilitiesService.initialiseMap(OXFORD_LATITUDE, OXFORD_LONGITUDE, OXFORD_MAP_ID);
            var route_ids = _.map(OXFORD_COACH_ROUTES, function(route) {return route.id});
            var stopsPromise = _.map(route_ids, function(route_id) {return CoachStopService.getStops(route_id)});
            $q.all(stopsPromise).then(function(result) {
                $scope.stops = _.flatten(_.map(result, function(r) {return r.data.stops}));
                var stopLocationsPromises = _.map($scope.stops, function(s) {return CoachStopService.getStopLocations(s)});
                $q.all(stopLocationsPromises).then(function(res) {
                    var stopFilter = function (x) { return parseFloat(x.lng) < -1 };
                    var markers = UtilitiesService.processStopLocations(res, $scope, CoachStopService, COACH_SERVICES, stopFilter);
                    $interval(function() {UtilitiesService.displayDepartureTimes(markers, CoachStopService, COACH_SERVICES, $scope.map);}, REFRESH_TIME_MILLIS);
                });
            });
        }
    ]);
