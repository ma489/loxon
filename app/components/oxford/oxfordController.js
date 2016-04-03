'use strict';



angular
    .module('loxon.oxford', ['ngRoute', 'loxon.stops', 'loxon.info'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/oxford', {
            templateUrl: 'components/oxford/oxfordView.html',
            controller: 'oxfordController'
        });
    }])
    .controller('oxfordController', ['$scope', 'CoachStopService', 'OXFORD_COACH_ROUTES',
        function ($scope, CoachStopService, OXFORD_COACH_ROUTES) {
            var map = initialiseOxfordMap();

            var routeIds = getRouteIds(OXFORD_COACH_ROUTES);
            //$scope.stops = [];
            getStops($scope, routeIds, CoachStopService);
            var stopLocations;
                $scope.$watch('stops', function (stops) {
                // When $scope.avengers.cast has data, then run these functions
                if (angular.isDefined(stops)) {
                    console.info("$scope.stops has data");
                    console.log(stops);
                    stopLocations = CoachStopService.getStopLocations($scope.stops);
                }
            });
            //console.log("GOT STOPS");

            //console.log("called CoachStopService from oxfordController");
            //console.log(stops);

            //TODO filter stops?
            //setMarkers(map, stopLocations);
            setMarkers(map);
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
    var routes = [];
    for (var i = 0; i < coach_routes.length; i++) {
        var route = coach_routes[i];
        var route_id = route['id'];
        routes.push(route_id);
    }
    return routes;
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

function setMarkers(map) {

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