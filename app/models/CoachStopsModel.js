angular
    .module('loxon.stops')
    .service('CoachStopsModel',
        function ($http, info) {
            var service = this;
            //var MODEL = "/stories/";

            for (var route in OXFORD_COACH_ROUTES) {
                var route_id = route.get('id');

                $http({
                    method: 'GET',
                    url: 'GET_STOPS_SERVICE_URL' + route_id
                }).then(function successCallback(response) {
                    console.log(response);
                    // this callback will be called asynchronously
                    // when the response is available
                }, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
            }

        }
    );