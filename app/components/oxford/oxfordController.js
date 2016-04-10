'use strict';

angular
    .module('loxon.oxford', ['ngRoute', 'loxon.stops', 'loxon.info', 'loxon.utils'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/oxford', {
            templateUrl: 'components/oxford/oxfordView.html',
            controller: 'oxfordController'
        });
    }])
    .controller('oxfordController', ['$scope', '$q', 'CoachStopService', 'OXFORD_COACH_ROUTES', 'COACH_SERVICES', '$interval', 'UtilitiesService',
        function ($scope, $q, CoachStopService, OXFORD_COACH_ROUTES, COACH_SERVICES, $interval, UtilitiesService) {
            $scope.map = initialiseOxfordMap();
            var route_ids = _.map(OXFORD_COACH_ROUTES, function(route) {return route.id});
            var stopsPromise = _.map(route_ids, function(route_id) {return CoachStopService.getStops(route_id)});
            $q.all(stopsPromise).then(function(result) {
                $scope.stops = _.flatten(_.map(result, function(r) {return r.data.stops}));
                var stopLocationsPromises = _.map($scope.stops, function(s) {return CoachStopService.getStopLocations(s)});
                $q.all(stopLocationsPromises).then(function(res) {
                    var markers = UtilitiesService.processStopLocations(res, $scope, CoachStopService, COACH_SERVICES, filterForOxfordStops);
                    const REFRESH_TIME_MILLIS = 60000;
                    $interval(function() {UtilitiesService.displayDepartureTimes(markers, CoachStopService, COACH_SERVICES, $scope.map);}, REFRESH_TIME_MILLIS);
                });
            });
        }
    ]);

function initialiseOxfordMap() {
    //TODO move these constants?
    const OXFORD_LATITUDE = 51.7568262;
    const OXFORD_LONGITUDE = -1.2281289;
    const MAP_ZOOM_LEVEL = 14;

    var mapOptions = {
        zoom: MAP_ZOOM_LEVEL,
        center: new google.maps.LatLng(OXFORD_LATITUDE, OXFORD_LONGITUDE),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    return new google.maps.Map(document.getElementById('oxfordMap'), mapOptions);
}

function filterForOxfordStops(stopLocationsInfo) {
    stopLocationsInfo = _.filter(stopLocationsInfo, function (x) {
        return parseFloat(x.lng) < -1
    });
    return stopLocationsInfo;
}
