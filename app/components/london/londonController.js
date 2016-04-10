'use strict';

angular
    .module('loxon.london', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/london', {
            templateUrl: 'components/london/londonView.html',
            controller: 'londonController'
        });
    }])
    .controller('londonController', ['$scope', '$q', 'CoachStopService', 'LONDON_COACH_ROUTES', 'COACH_SERVICES',
        function($scope, $q, CoachStopService, LONDON_COACH_ROUTES, COACH_SERVICES) {
            $scope.map = initialiseLondonMap();
            var route_ids = _.map(LONDON_COACH_ROUTES, function(route) {return route.id});
            var stopsPromise = _.map(route_ids, function(route_id) {return CoachStopService.getStops(route_id)});
            $q.all(stopsPromise).then(function(result) {
                $scope.stops = _.flatten(_.map(result, function(r) {return r.data.stops}));
                var stopLocationsPromises = _.map($scope.stops, function(s) {return CoachStopService.getStopLocations(s)});
                $q.all(stopLocationsPromises).then(function(res) { processStopLocations(res, $scope, CoachStopService, COACH_SERVICES, filterForLondonStops); });
            });
        }
    ]);

function initialiseLondonMap() {
    const LONDON_LATITUDE = 51.5050041;
    //const LONDON_LONGITUDE = -0.1981156;
    const LONDON_LONGITUDE = -0.169797;
    const ZOOM_LEVEL = 14;
    var mapOptions = {
        zoom: ZOOM_LEVEL,
        center: new google.maps.LatLng(LONDON_LATITUDE, LONDON_LONGITUDE),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    return new google.maps.Map(document.getElementById('londonMap'), mapOptions);
}

function processStopLocations(res, $scope, CoachStopService, COACH_SERVICES, filterFunction) {
    var allStopLocationCandidates = _.flatten(_.map(res, function (r) {
        return r.data.result
    }));
    var stopIdStrings = _.map($scope.stops, function (t) {
        return t.stopId.toString()
    });
    var stopLocations = _.filter(allStopLocationCandidates, function (s) {
        return _.contains(stopIdStrings, s.stopId)
    });
    var stopLocationsInfo = _.map(stopLocations, function (s) {
        var stopInfo = {};
        stopInfo.id = s.stopId;
        stopInfo.name = s.stopName;
        stopInfo.lat = s.lat;
        stopInfo.lng = s.lng;
        stopInfo.desc = s.LongName;
        return stopInfo;
    });
    stopLocationsInfo = _.uniq(stopLocationsInfo, function(item, key, id) { return item.id; });
    stopLocationsInfo = filterFunction(stopLocationsInfo);
    setMarkers($scope.map, stopLocationsInfo, CoachStopService, COACH_SERVICES);
}

function filterForLondonStops(stopLocationsInfo) {
    stopLocationsInfo = _.filter(stopLocationsInfo, function (x) {
        return parseFloat(x.lng) > -0.4
    });
    return stopLocationsInfo;
}

function setMarkers(map, stopLocations, CoachStopService, COACH_SERVICES) {

    var markers = _.map(stopLocations, function (sl) {
        return {
            stop: sl,
            marker: new google.maps.Marker({
                position: {lat: parseFloat(sl.lat), lng: parseFloat(sl.lng)},
                map: map,
                title: sl.name,
                label: sl.name.charAt(0)
            })
        };
    });

    _.map(markers, function (m) {
        m.marker.setMap(map)
    });

    _.map(markers, function (m) {
        CoachStopService.getStopDepartures(m.stop.id).then(function (response) {
            //var departureTimes = '<ol>';
            var departureTimes = '';
            $(response.data).find('.rowServiceDeparture').each(function (index) {
                if (_.contains(COACH_SERVICES, $(this).find('.colServiceName').text())) {
                    departureTimes += '• ' + $(this).find('.colServiceName').text() + ' - '
                        + $(this).find('.colDepartureTime').text() + '<br/>';
                }
            });
            //departureTimes += '</ol>';
            if (departureTimes !== '') {
                var content = m.marker.title + '<br/>' + departureTimes;
                m.marker.info = new google.maps.InfoWindow({
                    content: content
                });
                m.marker.info.open(map, m.marker);
            }

        });
    });
}