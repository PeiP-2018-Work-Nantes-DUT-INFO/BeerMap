const Categorie = require('../model/categorie');

const daoCommon = require('./commons/daoCommon'); // fonctions de DAO communes à tous les DAO
const DaoError = require('./commons/daoError'); // pour gérer les erreurs

/**
 * DAO permettant de récupérer les catégories selon différents critères, en faisant des requêtes dans la base de données.
 */
class CategorieDAO {

    constructor() {
        this.common = new daoCommon();
    }

    //
    findAll() {
        const sqlRequest = "SELECT * FROM categorie";

        return this.common.findAll(sqlRequest)
            .then(rows => {
                const categories = rows.map(row => new Categorie(row));
                return categories;
            })
            .catch(err => err);
    };

    findById(id) {
        id = parseInt(id); // on vérifie que l'id fourni peut bien être casté en entier
        if(isNaN(id)){
            throw new DaoError(31,"Integer required");
        }
        let sqlRequest = "SELECT * FROM categorie WHERE id=$id";
        let sqlParams = {$id: id};
        return this.common.findOne(sqlRequest, sqlParams)
            .then(row => new Categorie(row))
            .catch(err => err);
    };
    findByName(name) {
        let sqlRequest = "SELECT * FROM categorie WHERE cat_name=$name COLLATE NOCASE";
        let sqlParams = {$name: name};
        return this.common.findOne(sqlRequest, sqlParams)
            .then(row => new Categorie(row))
            .catch(err => err);
    };

    findAllByName(name){
        let sqlRequest = "SELECT * FROM categorie WHERE UPPER(cat_name) LIKE '%"+name+"%' ORDER BY cat_name ASC LIMIT 5"
        return this.common.findAll(sqlRequest)
            .then(row => row.map(beer => new Categorie(beer)))
            .catch(err => err);
    }

    create(categorie) {
        const sqlRequest = "INSERT INTO categorie(" +
            "id,cat_name,last_mod) " +
            "VALUES ($id,$catName,$lastMod)";
        const sqlParams = {
            $id: categorie.id,
            $catName: categorie.catName,
            $lastMod : categorie.lastMod
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    deleteById(id) {
        let sqlRequest = "DELETE FROM categorie WHERE id=$id";
        let sqlParams = {$id: id};
        return this.common.run(sqlRequest, sqlParams);
    };

    update(categorie) {
        let sqlRequest = "UPDATE categorie SET " +
            "cat_name=$catName, " +
            "last_mod=$lastMod " +
            "WHERE id=$id";

        let sqlParams = {
            $catName: categorie.catName,
            $lastMod: categorie.lastMod,
            $id: categorie.id
        };
        return this.common.run(sqlRequest, sqlParams);
    };

}

module.exports = CategorieDAO;