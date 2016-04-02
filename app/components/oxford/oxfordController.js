'use strict';

angular
    .module('loxon.oxford', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/oxford', {
            templateUrl: 'components/oxford/oxfordView.html',
            controller: 'oxfordController'
        });
    }])
    .controller('oxfordController', [
        function (COACH_ROUTES) {
            var map = initialiseOxfordMap();
            setMarkers(map);
        }
    ]);

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