angular
    .module('loxon.stops', ['loxon.info'])
    .service('CoachStopService', ['$http', 'GET_STOPS_SERVICE_URL', 'GET_STOP_LOCATIONS_SERVICE_URL',
        function ($http, GET_STOPS_SERVICE_URL, GET_STOP_LOCATIONS_SERVICE_URL) {

            this.getStops = function(routeId) {
                //console.log("Called CoachStopService");
                //console.log(routeId);

                    return $http.jsonp(GET_STOPS_SERVICE_URL + routeId);
                        //.success(function(response) {
                        //    return response['stops'];
                        //});
            };

            //this.stopsInfo = [];

            this.getStopLocations = function(stop) {
                //var stopsInfo = [];
                //angular.forEach(stops, function(thisStop, index, obj) {
                    return $http
                        .jsonp(GET_STOP_LOCATIONS_SERVICE_URL   + stop.stopName);
                        //.success(function(response) {
                        //    //console.log(thisStop, response);
                        //    //TODO check response size?
                        //    var stopInfoResponse =
                        //        _.filter(response.result, function(s) {return s.stopId === stop.stopId.toString()})[0];
                        //    var stopInfo = {};
                        //    stopInfo.id = stop.stopId;
                        //    stopInfo.name = stop.stopName;
                        //    stopInfo.lat = stopInfoResponse.lat;
                        //    stopInfo.lng = stopInfoResponse.lng;
                        //    stopInfo.desc = stopInfoResponse.LongName;
                        //    return stopInfo;
                        //    //console.log(stopInfo);
                        //    //stopsInfo.push(stopInfo);
                        //    //console.log("stopsInfo", stopsInfo);
                        ////    TODO return stopsInfo
                        //});
                //});
                //return stopsInfo;
            };

        }]
    );