angular
    .module('loxon.stops', ['loxon.info'])
    .service('CoachStopService', ['$http', 'GET_STOPS_SERVICE_URL', 'GET_STOP_LOCATIONS_SERVICE_URL',
        function ($http, GET_STOPS_SERVICE_URL, GET_STOP_LOCATIONS_SERVICE_URL) {

            this.getOxfordStops = function(routes) {
                console.log("Called CoachStopService");
                console.log(routes);
                var stops = [];
                for (var i = 0; i < routes.length; i++) {
                    var route = routes[i];
                    var route_id = route['id'];

                    $http.jsonp(GET_STOPS_SERVICE_URL   + route_id)
                        .success(function(response) {
                            console.log("Retrieved stops!");
                            console.log(response);
                            var retrievedStops = response['stops'];
                            stops = stops.concat(retrievedStops);
                        });
                }
                return stops;
            }

            this.getStopLocations = function(stops) {
                //$http.jsonp(GET_STOP_LOCATIONS_SERVICE_URL   + route_id)
                //    .success(function(response) {
                //        console.log("Retrieved stops!");
                //        console.log(response);
                //        var retrievedStops = response['stops'];
                //        stops = stops.concat(retrievedStops);
                //    });
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