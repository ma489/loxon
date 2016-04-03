angular
    .module('loxon.stops', ['loxon.info'])
    .service('CoachStopService', ['$http', 'GET_STOPS_SERVICE_URL', 'GET_STOP_LOCATIONS_SERVICE_URL',
        function ($http, GET_STOPS_SERVICE_URL, GET_STOP_LOCATIONS_SERVICE_URL) {

            this.getStops = function(routeId) {
                console.log("Called CoachStopService");
                console.log(routeId);
                //var stops = [];
                //for (var i = 0; i < routes.length; i++) {
                //    var route = routes[i];
                //    var route_id = route['id'];

                    return $http.jsonp(GET_STOPS_SERVICE_URL + routeId)
                        .success(function(response) {
                            //console.log("Retrieved stops!");
                            //console.log(response);
                            return response['stops'];
                            //stops = stops.concat(retrievedStops);
                        });
                //}
                //return stops;
            }

            this.getStopLocations = function(stops) {
                var stopsInfo = [];
                for (var i = 0; i < stops.length; i++) {
                    var stop = stops[i];
                    var stopInfo = {};
                    stopInfo.stopId = stop.stopId;
                    stopInfo.stopName = stop.stopName;
                    $http.jsonp(GET_STOP_LOCATIONS_SERVICE_URL   + stop.stopName)
                        .success(function(response) {
                            console.log(response);
                            //TODO filter reponse by stop.stopId
                            //stopInfo.stopLongitude = ...
                            //stopInfo.stopLatitude = ...
                        });
                }
            }

        }]
    );

function stopsCallBack(data) {
    //console.log(data);
    //output = [];
    //$.each(data.stops, function (idx) {
    //    output.push('<option value="' + data.stops[idx].stopId + '">' + data.stops[idx].stopName + '</option>');
    //});
}