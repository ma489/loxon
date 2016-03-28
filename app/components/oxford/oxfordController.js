'use strict';

angular.module('myApp.view2', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/oxford', {
            templateUrl: 'components/oxford/oxfordView.html',
            controller: 'View2Ctrl'
        });
    }])

    .controller('View2Ctrl', [function () {
        var mapOptions = {
            zoom: 14,
            center: new google.maps.LatLng(51.7568262, -1.2281289),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(document.getElementById('map'), mapOptions);

        //var myLatLng = ;
        var marker = new google.maps.Marker({
            position: {lat: 51.7538029, lng: -1.2625571},
            map: map,
            title: 'Gloucester Green',
            label: 'G'
        });
        marker.setMap(map);

        marker.info = new google.maps.InfoWindow({
            content: 'Tube: 6mins <br/> X90: &nbsp;&nbsp;8mins'
        });
        marker.info.open(map, marker);

        var marker2 = new google.maps.Marker({
            position: {lat: 51.7605924,lng: -1.2112261},
            map: map,
            title: 'Headington Shops',
            label: 'H'
        });
        marker2.setMap(map);

        marker2.info = new google.maps.InfoWindow({
            content: 'Tube: 7mins <br/> X90: &nbsp;&nbsp;9mins'
        });
        marker2.info.open(map, marker2);

    }]);