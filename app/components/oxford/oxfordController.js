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

        var myLatLng = {lat: 51.7538029, lng: -1.2625571};
        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: 'Gloucester Green',
            label: 'G'
        });
        marker.setMap(map);

        marker.info = new google.maps.InfoWindow({
            content: 'Tube: 6mins <br/> X90: 8mins'
        });
        marker.info.open(map, marker);

    }]);