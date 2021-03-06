'use strict';

angular
    .module('loxon.london', ['ngRoute', 'loxon.stops', 'loxon.info', 'loxon.utils'])
    .constant('LONDON_LATITUDE', 51.5050041)
    .constant('LONDON_LONGITUDE', -0.169797)
    .constant('LONDON_MAP_ID', 'londonMap')
    .constant('REFRESH_TIME_MILLIS', 60000)
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/london', {
            templateUrl: 'components/london/londonView.html',
            controller: 'londonController'
        });
    }])
    .controller('londonController',
        ['$scope', '$q', 'CoachStopService', 'LONDON_COACH_ROUTES', 'COACH_SERVICES', '$interval', 'UtilitiesService', 'REFRESH_TIME_MILLIS', 'LONDON_LATITUDE', 'LONDON_LONGITUDE', 'LONDON_MAP_ID',
        function($scope, $q, CoachStopService, LONDON_COACH_ROUTES, COACH_SERVICES, $interval, UtilitiesService, REFRESH_TIME_MILLIS, LONDON_LATITUDE, LONDON_LONGITUDE, LONDON_MAP_ID) {
            $scope.map = UtilitiesService.initialiseMap(LONDON_LATITUDE, LONDON_LONGITUDE, LONDON_MAP_ID);
            var route_ids = _.map(LONDON_COACH_ROUTES, function(route) {return route.id});
            var stopsPromise = _.map(route_ids, function(route_id) {return CoachStopService.getStops(route_id)});
            $q.all(stopsPromise).then(function(result) {
                $scope.stops = _.flatten(_.map(result, function(r) {return r.data.stops}));
                var stopLocationsPromises = _.map($scope.stops, function(s) {return CoachStopService.getStopLocations(s)});
                $q.all(stopLocationsPromises).then(function(res) {
                    var stopFilter = function (x) { return parseFloat(x.lng) > -0.4  };
                    var markers = UtilitiesService.processStopLocations(res, $scope, CoachStopService, COACH_SERVICES, stopFilter);
                    $interval(function() {UtilitiesService.displayDepartureTimes(markers, CoachStopService, COACH_SERVICES, $scope.map);}, REFRESH_TIME_MILLIS);
                });
            });
        }
    ]);

