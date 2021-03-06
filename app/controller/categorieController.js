const CategorieDAO = require('../dao/categorieDAO');
const Categorie = require('../model/categorie');

const ControllerCommon = require('./common/controllerCommon');// fonctions communes pour le contrôleur

/**
 * Contrôleur permettant de récupérer les catégories de la base de données en utilisant le DAO associé
 */
class CategorieController {

    constructor() {
        this.categorieDAO = new CategorieDAO();
        this.common = new ControllerCommon();
    }


    findAll(req, res) {
        this.categorieDAO.findAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    }

    findById(req, res) {
        try {
            let id = req.params.id;
            this.categorieDAO.findById(id)
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
        this.categorieDAO.findByName(name)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    create(req, res) {
        let categorie = new Categorie(req.body);
        return this.categorieDAO.create(categorie)
            .then(() => this.categorieDAO.findById(categorie.id))
            .then((categorie) => {
                res.status(201);
                res.json(categorie);
            })
            .catch(this.common.serverError(res));

    }

    deleteById(req, res) {
        let id = req.params.id;

        this.categorieDAO.deleteById(id)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };

    update(req, res) {
        let categorie = new Categorie();
        /*categorie.id = req.body.id;
        categorie.catName = req.body.catName;
        categorie.lastMod = req.body.lastMod;*/
        categorie = Object.assign(categorie, req.body);


        return this.categorieDAO.update(categorie)
            .then(this.categorieDAO.findById(req.params.id))
            .then(() => this.categorieDAO.findById(categorie.id))
            .then((categorie) => {
                res.status(201);
                res.json(categorie);
            })
            .catch(this.common.serverError(res));

    };
}


module.exports = CategorieController;