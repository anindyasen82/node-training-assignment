/**
 * Created by asen on 2/23/2015.
 */
var uuid = require('node-uuid');

var cloudServices = [];

function CloudServices(cloud_services) {
    this.cloud_services = cloud_services
}

function CloudService(name, ucm_id) {
    this.name = name;
    this.ucm_id = ucm_id;
    this.uuid = uuid.v1();
}

function getCloudServices() {
    return new CloudServices(cloudServices);
}

function createCloudService(name, ucm_id) {
    var _cloudService = new CloudService(name, ucm_id);
    cloudServices.push(_cloudService);

    return _cloudService.uuid;
};

module.exports.getCloudServices = getCloudServices;
module.exports.createCloudService = createCloudService;
