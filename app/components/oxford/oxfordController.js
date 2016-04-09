'use strict';

angular
    .module('loxon.oxford', ['ngRoute', 'loxon.stops', 'loxon.info'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/oxford', {
            templateUrl: 'components/oxford/oxfordView.html',
            controller: 'oxfordController'
        });
    }])
    .controller('oxfordController', ['$scope', '$q', 'CoachStopService', 'OXFORD_COACH_ROUTES',
        function ($scope, $q, CoachStopService, OXFORD_COACH_ROUTES) {
            $scope.map = initialiseOxfordMap();
            var route_ids = _.map(OXFORD_COACH_ROUTES, function(route) {return route.id});
            var stopsPromise = _.map(route_ids, function(route_id) {return CoachStopService.getStops(route_id)});
            $q.all(stopsPromise).then(function(result) {
                $scope.stops = _.flatten(_.map(result, function(r) {return r.data.stops}));
                var stopLocationsPromises = _.map($scope.stops, function(s) {return CoachStopService.getStopLocations(s)});
                $q.all(stopLocationsPromises).then(function(res) { processStopLocations(res, $scope); });
            });
        }
    ]);

//TODO a separate function to update stop times periodically


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

function processStopLocations(res, $scope) {
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
    //TODO filter unique stops
    //TODO filter for oxford stops
    setMarkers($scope.map, stopLocationsInfo, $scope.mapCentre);
}

function setMarkers(map, stopLocations, mapCentre) {

    var markers = _.map(stopLocations, function(sl) {
                        return new google.maps.Marker({
                            position: {lat: parseFloat(sl.lat), lng: parseFloat(sl.lng)},
                            map: map,
                            title: sl.name,
                            label: sl.name.charAt(0)
                        });
                    });

    _.map(markers, function (m) {m.setMap(map)});

    var marker_info = _.map(markers, function (m) {
        var content = m.title + '<br/>Tube: 6mins';
        m.info = new google.maps.InfoWindow({
            content: content
        });
        m.info.open(map, m);
        return m.info;
    });

}
