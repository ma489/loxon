angular
    .module('loxon.stops', ['loxon.info'])
    .service('CoachStopService', ['$http', 'OXFORD_COACH_ROUTES', 'GET_STOPS_SERVICE_URL',
        function ($http, OXFORD_COACH_ROUTES, GET_STOPS_SERVICE_URL) {
            this.getOxfordStops = function () {
                console.log("Called CoachStopService");
                console.log(OXFORD_COACH_ROUTES);
                for (var i = 0; i < OXFORD_COACH_ROUTES.length; i++) {
                    var route = OXFORD_COACH_ROUTES[i];
                    var route_id = route['id'];

                    $http.jsonp(GET_STOPS_SERVICE_URL + route_id)
                        .success(function(response) {
                            console.log("Retrieved stops!");
                            console.log(response);
                            //return response;
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