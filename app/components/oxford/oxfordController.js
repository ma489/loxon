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
            var map = initialiseOxfordMap();

            //var routeIds = getRouteIds(OXFORD_COACH_ROUTES);

            //var routes = [];
            //var x90Stops = CoachStopService.getStops(OXFORD_COACH_ROUTES[0]['id']);
            //var tubeStops = CoachStopService.getStops(OXFORD_COACH_ROUTES[1]['id']);

            //$scope.stops = [];

            var route_ids = _.map(OXFORD_COACH_ROUTES, function(route) {return route.id});
            var stopsPromise = _.map(route_ids, function(route_id) {return CoachStopService.getStops(route_id)});
            $q.all(stopsPromise).then(function(result) {
                //... This callback would be called when all promised would be resolved
                    $scope.stops = _.flatten(_.map(result, function(r) {return r.data.stops}));
                    var stopLocationsPromises = _.map($scope.stops, function(s) {return CoachStopService.getStopLocations(s)});
                    $q.all(stopLocationsPromises).then(function(res) {
                        console.log("noooo");
                        //console.log($scope.stops);
                        //console.log(res);
                        var allStopLocationCandidates = _.flatten(_.map(res, function(r) {return r.data.result }));
                        var stopIdStrings = _.map($scope.stops, function (t) { return t.stopId.toString() });
                        var stopLocations = _.filter(allStopLocationCandidates, function (s) {
                            return _.contains(stopIdStrings, s.stopId)});
                        var stopLocationsInfo = _.map(stopLocations, function (s) {
                            var stopInfo = {};
                            stopInfo.id = s.stopId;
                            stopInfo.name = s.stopName;
                            stopInfo.lat = s.lat;
                            stopInfo.lng = s.lng;
                            stopInfo.desc = s.LongName;
                            return stopInfo;
                        });
                        console.log(stopLocationsInfo);
                        //TODO filter unique
                    });
                //console.log(stops);
                //var stops = result[0].data.stops;
                //stops = stops.concat(result[1].data.stops);
                //$scope.stops = $scope.stops.concat(result[1].data.stops);
                //console.log();
            });

            //for (var i = 0; i < OXFORD_COACH_ROUTES.length; i++) {
            //    var routeId = OXFORD_COACH_ROUTES[i]['id'];
            //    CoachStopService.getStops(routeId)
            //        .then(function (returnedStops) {
                        //if (!angular.isDefined($scope.stops)) {
                        //    $scope.stops = [];
                        //}
                        //$scope.stops = $scope.stops.concat(returnedStops.data.stops);
                    //});
                //routes.push(route_id);
            //}

            //for (var i = 0; i < routeIds.length; i++) {
            //    var routeId = routeIds[i];
            //    CoachStopService.getStops(routeId)
            //        .then(function (returnedStops) {
            //            if (!angular.isDefined($scope.stops)) {
            //                $scope.stops = [];
            //            }
            //            $scope.stops = $scope.stops.concat(returnedStops.data.stops);
            //        });
            //}
            //return routes;
            //$scope.stops = [];
            //getStops($scope, routeIds, CoachStopService).success(function (data) {
            //    console.log("haha");
            //    console.log(data);
            //});

            $scope.stopLocations = [];
                $scope.$watch('stops', function (stops) {
                if (angular.isDefined(stops)) {
                    //console.info("$scope.stops has data");
                    //console.log(stops);
                    $scope.stopLocations = $scope.stopLocations.concat(CoachStopService.getStopLocations($scope.stops));
                    //console.log(stopLocations);
                }
            });
            $scope.$watch('stopLocations', function (stopLocations) {
                //console.log($scope.stopLocations);
            });
            //console.log(stopLocations);
            setMarkers(map, $scope.stopLocations);
            //setMarkers(map);
        }
    ]);

//TODO a separate function to update stop times periodically

function initialiseOxfordMap() {
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

function getRouteIds(coach_routes) {

}

function getStops($scope, routeIds, CoachStopService) {
    //var stops = [];
    for (var i = 0; i < routeIds.length; i++) {
        var routeId = routeIds[i];
        CoachStopService.getStops(routeId)
            .then(function (returnedStops) {
                if (!angular.isDefined($scope.stops)) {
                    $scope.stops = [];
                }
                $scope.stops = $scope.stops.concat(returnedStops.data.stops);
            });
    }
    //return stops;
}

function setMarkers(map, stopLocations) {

    var stop_ids = [1, 2, 3, 4, 5, 6];

    var stop_positions = {1: 0, 2: 1};

    //TODO cleanup this code

    var marker_gloucester_green = new google.maps.Marker({
        position: {lat: 51.7538029, lng: -1.2625571},
        map: map,
        title: 'Gloucester Green',
        label: 'G'
    });
    marker_gloucester_green.setMap(map);

    marker_gloucester_green.info = new google.maps.InfoWindow({
        content: 'Tube: 6mins <br/> X90: &nbsp;&nbsp;8mins'
    });
    marker_gloucester_green.info.open(map, marker_gloucester_green);

    var marker2 = new google.maps.Marker({
        position: {lat: 51.7605924, lng: -1.2112261},
        map: map,
        title: 'Headington Shops',
        label: 'H'
    });
    marker2.setMap(map);

    marker2.info = new google.maps.InfoWindow({
        content: 'Tube: 7mins <br/> X90: &nbsp;&nbsp;9mins'
    });
    marker2.info.open(map, marker2);
}
