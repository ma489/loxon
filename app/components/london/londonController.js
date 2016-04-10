'use strict';

angular
    .module('loxon.london', ['ngRoute', 'loxon.stops', 'loxon.info', 'loxon.utils'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/london', {
            templateUrl: 'components/london/londonView.html',
            controller: 'londonController'
        });
    }])
    .controller('londonController', ['$scope', '$q', 'CoachStopService', 'LONDON_COACH_ROUTES', 'COACH_SERVICES', '$interval', 'UtilitiesService',
        function($scope, $q, CoachStopService, LONDON_COACH_ROUTES, COACH_SERVICES, $interval, UtilitiesService) {
            $scope.map = initialiseLondonMap();
            var route_ids = _.map(LONDON_COACH_ROUTES, function(route) {return route.id});
            var stopsPromise = _.map(route_ids, function(route_id) {return CoachStopService.getStops(route_id)});
            $q.all(stopsPromise).then(function(result) {
                $scope.stops = _.flatten(_.map(result, function(r) {return r.data.stops}));
                var stopLocationsPromises = _.map($scope.stops, function(s) {return CoachStopService.getStopLocations(s)});
                $q.all(stopLocationsPromises).then(function(res) {
                    var markers = UtilitiesService.processStopLocations(res, $scope, CoachStopService, COACH_SERVICES, filterForLondonStops);
                    $interval(UtilitiesService.displayDepartureTimes(markers, CoachStopService, COACH_SERVICES, $scope.map), 10000);
                });
            });
        }
    ]);

function initialiseLondonMap() {
    const LONDON_LATITUDE = 51.5050041;
    const LONDON_LONGITUDE = -0.169797;
    const ZOOM_LEVEL = 14;
    var mapOptions = {
        zoom: ZOOM_LEVEL,
        center: new google.maps.LatLng(LONDON_LATITUDE, LONDON_LONGITUDE),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    return new google.maps.Map(document.getElementById('londonMap'), mapOptions);
}

function filterForLondonStops(stopLocationsInfo) {
    stopLocationsInfo = _.filter(stopLocationsInfo, function (x) {
        return parseFloat(x.lng) > -0.4
    });
    return stopLocationsInfo;
}
