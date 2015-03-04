/**
 * Created by asen on 2/28/2015.
 */
var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    morgan = require('morgan'),
    port = process.env.PORT || 3000;

var cspProvider = require('./cloud-services-provider');
var restifyProvider = require('./restify-client-provider');

module.exports = app;

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    console.log('Intercepted ' + req.path)
    next();
});

app.get('/', function(req, res) {
    res.json({message:'Welcome to ECX API'});
});

app.get('/csp', function(req, res) {
    var cloudServices = cspProvider.getCloudServices();
    res.json(cloudServices);
});

app.post('/csp', function(req, res) {
    var name = req.body.name;
    var ucmid = req.body.ucmid;
    var uuid = cspProvider.createCloudService(name, ucmid);
    res.json({message:'CSP Create Successfully.', uuid:uuid});
});

app.get('/restify', function(req, res) {
    restifyProvider.callService(res);
});

if(require.main === module) {
    app.listen(port, function() {
        console.log('Server listening on port %s', port);
    });
}