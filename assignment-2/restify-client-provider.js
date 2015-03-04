/**
 * Created by asen on 2/23/2015.
 */
var restify = require('restify');

var client = restify.createJsonClient('http://api.geonames.org/citiesJSON?north=44.1&south=-9.9&east=-22.4&west=55.2&lang=de&username=demo');

function callService(res) {
    client.get('', function (err, req, _res, obj) {
        console.log('%j', obj);
        res.json(obj);
    });
}

module.exports.callService = callService;
