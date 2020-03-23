const GeocodeDAO = require('../dao/geocodeDAO');
const arcgis = require('../extern/arcgis');

/* Load Controller Common function */
const ControllerCommon = require('./common/controllerCommon');// fonctions communes pour le contrôleur

/**
 * Contrôleur permettant de récupérer les géocodes de la base de données en utilisant le DAO associé
 */
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
            res.status(400);
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
            res.status(400);
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
        arcgis.searchByName(name)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };
}

module.exports = GeocodeController;