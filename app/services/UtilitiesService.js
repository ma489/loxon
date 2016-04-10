angular
    .module('loxon.utils', [])
    .service('UtilitiesService', ['CoachStopService', 'COACH_SERVICES',
        function (CoachStopService, COACH_SERVICES) {

            this.initialiseMap = function(latitude, longitude, elementId) {
                var mapOptions = {
                    zoom: 14,
                    center: new google.maps.LatLng(latitude, longitude),
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                return new google.maps.Map(document.getElementById(elementId), mapOptions);
            };

            this.processStopLocations = function(res, $scope, CoachStopService, COACH_SERVICES, stopFilter) {
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
                stopLocationsInfo = _.filter(stopLocationsInfo, stopFilter);
                return this.setMarkers($scope.map, stopLocationsInfo, CoachStopService, COACH_SERVICES);
            };

            this.setMarkers = function(map, stopLocations, CoachStopService, COACH_SERVICES) {

                var markers = _.map(stopLocations, function (sl) {
                    return {
                        stop: sl,
                        marker: new google.maps.Marker({
                            position: {lat: parseFloat(sl.lat), lng: parseFloat(sl.lng)},
                            map: map,
                            title: sl.name,
                            label: sl.name.charAt(0),
                        })
                    };
                });

                _.map(markers, function (m) {
                    m.marker.setMap(map)
                });

                this.displayDepartureTimes(markers, CoachStopService, COACH_SERVICES, map);

                return markers;

            };

            this.displayDepartureTimes = function(markers, CoachStopService, COACH_SERVICES, map) {
                _.map(markers, function (m) {
                    CoachStopService.getStopDepartures(m.stop.id).then(function (response) {
                        var departureTimes = '';
                        $(response.data).find('.rowServiceDeparture').each(function (index) {
                            if (_.contains(COACH_SERVICES, $(this).find('.colServiceName').text())) {
                                departureTimes += '• ' + $(this).find('.colServiceName').text() + ' - '
                                    + $(this).find('.colDepartureTime').text() + '<br/>';
                            }
                        });
                        if (departureTimes !== '') {
                            if (m.marker.info != null) { m.marker.info.close(); }
                            var content = m.marker.title + '<br/>' + departureTimes;
                            m.marker.info = new google.maps.InfoWindow({
                                content: content,
                            });
                            m.marker.info.open(map, m.marker);
                        }

                    });
                });
            };

        }]
    );



