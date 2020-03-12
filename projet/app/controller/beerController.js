const BeerDAO = require('../dao/beerDAO');
const Beer = require('../model/beer');

/* Load Controller Common function */
const ControllerCommon = require('./common/controllerCommon');

class BeerController {

    constructor() {
        this.beerDAO = new BeerDAO();
        this.common = new ControllerCommon();
    }


    findAll(req,res) {
        this.beerDAO.findAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    }

    findById(req, res) {
        try{
            let id =  req.params.id;
            this.beerDAO.findById(id)
                .then(this.common.findSuccess(res))
                .catch(this.common.findError(res));
        }
        catch(err){
            res.status(404);
            res.json(err);
        }
    };

    findByName(req, res) {
        let name = req.params.name;
        this.beerDAO.findByName(name)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));  
    };

    findByVolumeHigherThan(req, res) {
        try{
            let alcolholVolume = req.params.volume;
            this.beerDAO.findByVolumeHigherThan(alcolholVolume)
                .then(this.common.findSuccess(res))
                .catch(this.common.findError(res));
        }
        catch(err){
            res.status(404);
            res.json(err);
        }
    };

    findByVolumeLowerThan(req, res) {
        try{
            let alcolholVolume = req.params.volume;
            this.beerDAO.findByVolumeLowerThan(alcolholVolume)
                .then(this.common.findSuccess(res))
                .catch(this.common.findError(res));
        }
        catch(err){
            res.status(404);
            res.json(err);
        }
    };

    findByState(req, res) {
        let state = req.params.state;
        this.beerDAO.findByState(state)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };
}


module.exports = BeerController;