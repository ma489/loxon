angular
    .module('loxon.info', [])
    .constant('COACH_SERVICES', [
        'TUBE', 'X90'
    ])
    .constant('OXFORD_COACH_ROUTES', [
        {id: 8602, service: 'Tube', name: 'Oxford - London', origin: 'Oxford'},
        {id: 8547, service: 'X90', name: 'Gloucester Green Bus Station - Green Line Coach Station', origin: 'Oxford'}
    ])
    .constant('LONDON_COACH_ROUTES', [
        {id: 8603, service: 'Tube', name: 'London - Oxford', origin: 'London'},
        {id: 8548, service: 'X90', name: 'Green Line Coach Station - Gloucester Green Bus Station', origin: 'London'}
    ])
    .constant('GET_STOPS_SERVICE_URL',
        'http://www.buscms.com/Nimbus/operatorpages/widgets/departureboard/ssi.aspx?method=updateRouteStops&callback=JSON_CALLBACK&routeid=')
    .constant('GET_STOP_LOCATIONS_SERVICE_URL',
        'http://www.buscms.com/api/rest/ent/stop.aspx?clientid=Nimbus&method=searchexact&callback=JSON_CALLBACK&q=')
    .constant('GET_DEPARTURES_SERVICE_URL',
        'http://www.buscms.com/api/REST/html/departureboard.aspx?clientid=Nimbus&cachebust=123&sourcetype=siri&callback=JSON_CALLBACK&stopid=');