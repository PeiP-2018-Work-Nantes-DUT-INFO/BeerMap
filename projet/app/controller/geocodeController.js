const GeocodeDAO = require('../dao/geocodeDAO');
const Geocode = require('../model/geocode');

/* Load Controller Common function */
const ControllerCommon = require('./common/controllerCommon');

class GeocodeController {

    constructor() {
        this.geocodeDAO = new GeocodeDAO();
        this.common = new ControllerCommon();
    }


    findAll(res) {
        this.geocodeDAO.findAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    }

    findById(req, res) {
        let id = req.params.id;
        this.geocodeDAO.findById(id)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };
    findByName(req, res) {
        let name = req.params.name;
        this.geocodeDAO.findByName(name)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };
}


module.exports = GeocodeController;