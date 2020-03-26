const BreweryDAO = require('../dao/breweryDAO');
const Brewery = require('../model/brewery');

const ControllerCommon = require('./common/controllerCommon');// fonctions communes pour le contrôleur

/**
 * Contrôleur permettant de récupérer les brasseries de la base de données en utilisant le DAO associé
 */
class BreweryController {

    constructor() {
        this.breweryDAO = new BreweryDAO();
        this.common = new ControllerCommon();
    }


    findAll(req, res) {
        this.breweryDAO.findAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    }

    findById(req, res) {
        try {
            let id = req.params.id;
            this.breweryDAO.findById(id)
                .then(this.common.findSuccess(res))
                .catch(this.common.findError(res));
        }
        catch (err) {
            res.status(400);
            res.json(err);
        }
    };

    findByName(req, res) {
        let name = req.params.name;
        this.breweryDAO.findByName(name)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    findAllByCity(req, res) {
        let city = req.params.city;
        this.breweryDAO.findAllByCity(city)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    create(req, res) {
        let brewery = new Brewery(req.body);
        return this.breweryDAO.create(brewery)
            .then(() => this.breweryDAO.findById(brewery.id))
            .then((brewery) => {
                res.status(201);
                res.json(brewery);
            })
            .catch(this.common.serverError(res));

    }

    deleteById(req, res) {
        let id = req.params.id;

        this.breweryDAO.deleteById(id)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };

    update(req, res) {
        let brewery = new Brewery();
        brewery = Object.assign(brewery, req.body);

        return this.breweryDAO.update(brewery)
            .then(this.breweryDAO.findById(req.params.id))
            .then(() => this.breweryDAO.findById(brewery.id))
            .then((brewery) => {
                res.status(201);
                res.json(brewery);
            })
            .catch(this.common.serverError(res));

    };
}

module.exports = BreweryController;