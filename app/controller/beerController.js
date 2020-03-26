const BeerDAO = require('../dao/beerDAO');
const Beer = require('../model/beer');

const ControllerCommon = require('./common/controllerCommon');// fonctions communes pour le contrôleur

/**
 * Contrôleur permettant de récupérer les bières de la base de données en utilisant le DAO associé
 */
class BeerController {

    constructor() {
        this.beerDAO = new BeerDAO();
        this.common = new ControllerCommon();
    }


    findAll(req, res) {
        this.beerDAO.findAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    }

    findById(req, res) {
        try {
            let id = req.params.id;
            this.beerDAO.findById(id)
                .then(this.common.findSuccess(res))
                .catch(this.common.findError(res));
        }
        catch (err) {
            res.status(400);
            res.json(err);
        }
    };

    findAllByBrewery(req, res) {
        try {
            let brewery_id = req.params.brewery_id;
            this.beerDAO.findAllByBrewery(brewery_id)
                .then(this.common.findSuccess(res))
                .catch(this.common.findError(res));
        }
        catch (err) {
            res.status(400);
            res.json(err);
        }
    }

    findByName(req, res) {
        let name = req.params.name;
        this.beerDAO.findByName(name)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    findByVolumeHigherThan(req, res) {
        try {
            let alcolholVolume = req.params.volume;
            this.beerDAO.findByVolumeHigherThan(alcolholVolume)
                .then(this.common.findSuccess(res))
                .catch(this.common.findError(res));
        }
        catch (err) {
            res.status(400);
            res.json(err);
        }
    };

    findByVolumeLowerThan(req, res) {
        try {
            let alcolholVolume = req.params.volume;
            this.beerDAO.findByVolumeLowerThan(alcolholVolume)
                .then(this.common.findSuccess(res))
                .catch(this.common.findError(res));
        }
        catch (err) {
            res.status(400);
            res.json(err);
        }
    };

    findByCountry(req, res) {
        let country = req.params.country;
        this.beerDAO.findByCountry(country)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };
    
    findByCity(req, res) {
        let city = req.params.city;
        this.beerDAO.findByCity(city)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    findByCategory(req, res) {
        try {
            let categorie = req.params.categorie;
            this.beerDAO.findByCategory(categorie)
                .then(this.common.findSuccess(res))
                .catch(this.common.findError(res));
        }
        catch (err) {
            res.status(400);
            res.json(err);
        }    
    };

    create(req, res) {
        let beer = new Beer(req.body);
        return this.beerDAO.create(beer)
            .then(() => this.beerDAO.findById(beer.id))
            .then((beer) => {
                res.status(201);
                res.json(beer);
            })
            .catch(this.common.serverError(res));

    }

    deleteById(req, res) {
        let id = req.params.id;

        this.beerDAO.deleteById(id)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };

    update(req, res) {
        let beer = new Beer();
        beer = Object.assign(beer, req.body);

        return this.beerDAO.update(beer)
            .then(this.beerDAO.findById(req.params.id))
            .then(() => this.beerDAO.findById(beer.id))
            .then((beer) => {
                res.status(201);
                res.json(beer);
            })
            .catch(this.common.serverError(res));

    };
}


module.exports = BeerController;