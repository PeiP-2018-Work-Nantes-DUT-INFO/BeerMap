const GeocodeDAO = require('../dao/geocodeDAO');
const geocodeApi = require('../../geocodeApi');

/* Load Controller Common function */
const ControllerCommon = require('./common/controllerCommon');

class GeocodeController {

    constructor() {
        this.geocodeDAO = new GeocodeDAO();
        this.common = new ControllerCommon();
    }


    findAll(req, res) {
        this.geocodeDAO.findAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    }

    findById(req, res) {
        try {
            let id = req.params.id;
            this.geocodeDAO.findById(id)
                .then(this.common.findSuccess(res))
                .catch(this.common.findError(res));
        }
        catch (err) {
            res.status(err.errorCode);
            res.json(err);
        }
    };

    findByBreweryId(req, res) {
        try {
            let id = req.params.id;
            this.geocodeDAO.findByBreweryId(id)
                .then(this.common.findSuccess(res))
                .catch(this.common.findError(res));
        }
        catch (err) {
            res.status(err.errorCode);
            res.json(err);
        }
    };

    findByBreweryName(req, res) {
        let name = req.params.name;
        this.geocodeDAO.findByBreweryName(name)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    findCity(req, res) {
        let name = req.params.name;
        geocodeApi.searchByName(name)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };
}

module.exports = GeocodeController;