angular
    .module('loxon.stops', ['loxon.info'])
    .service('CoachStopService', ['$http', 'GET_STOPS_SERVICE_URL', 'GET_STOP_LOCATIONS_SERVICE_URL',
        function ($http, GET_STOPS_SERVICE_URL, GET_STOP_LOCATIONS_SERVICE_URL) {

            this.getStops = function(routeId) {
                //console.log("Called CoachStopService");
                //console.log(routeId);

                    return $http.jsonp(GET_STOPS_SERVICE_URL + routeId)
                        .success(function(response) {
                            return response['stops'];
                        });
            };

            //this.stopsInfo = [];

            this.getStopLocations = function(stops) {
                var stopsInfo = [];
                angular.forEach(stops, function(thisStop, index, obj) {
                    $http
                        .jsonp(GET_STOP_LOCATIONS_SERVICE_URL   + thisStop.stopName)
                        .success(function(response) {
                            //console.log(thisStop, response);
                            var stopInfoResponse =
                                response.result.filter(function(candidate) {
                                    var stopIdString = thisStop.stopId.toString();
                                    return candidate.stopId === stopIdString; })[0]; //TODO check response size?
                            var stopInfo = {};
                            stopInfo.id = thisStop.stopId;
                            stopInfo.name = thisStop.stopName;
                            stopInfo.lat = stopInfoResponse.lat;
                            stopInfo.lng = stopInfoResponse.lng;
                            stopInfo.desc = stopInfoResponse.LongName;
                            //console.log(stopInfo);
                            stopsInfo.push(stopInfo);
                            console.log("stopsInfo", stopsInfo);
                        //    TODO return stopsInfo
                        });
                });
                return stopsInfo;
            };

        }]
    );