angular
    .module('loxon.stops', ['loxon.info'])
    .service('CoachStopService', ['$http', 'GET_STOPS_SERVICE_URL', 'GET_STOP_LOCATIONS_SERVICE_URL', 'GET_DEPARTURES_SERVICE_URL',
        function ($http, GET_STOPS_SERVICE_URL, GET_STOP_LOCATIONS_SERVICE_URL, GET_DEPARTURES_SERVICE_URL) {

            this.getStops = function(routeId) {
                return $http.jsonp(GET_STOPS_SERVICE_URL + routeId, {cache: true});
            };


            this.getStopLocations = function(stop) {
                return $http.jsonp(GET_STOP_LOCATIONS_SERVICE_URL   + stop.stopName, {cache: true});
            };

            this.getStopDepartures = function(stopId) {
                return $http.jsonp(GET_DEPARTURES_SERVICE_URL + stopId);
            }

        }]
    );