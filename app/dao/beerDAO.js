const Beer = require('../model/beer');

const daoCommon = require('./commons/daoCommon'); // fonctions de DAO communes à tous les DAO
const DaoError = require('./commons/daoError'); // pour gérer les erreurs

/**
 * DAO permettant de récupérer les bières selon différents critères, en faisant des requêtes dans la base de données.
 */
class BeerDAO {

    constructor() {
        this.common = new daoCommon();
    }

    // Trouver toutes les bières
    findAll() {
        const sqlRequest = "SELECT * FROM beer";

        return this.common.findAll(sqlRequest)
            .then(rows => rows.map(row => new Beer(row)))
            .catch(err => err);
    };

    // Trouver la bière d'un certain id
    findById(id) {
        id = parseInt(id); // on vérifie que l'id fourni peut bien être casté en entier
        if(isNaN(id)){
            throw new DaoError(31,"Integer required");
        }
        let sqlRequest = "SELECT * FROM beer WHERE id=$id";
        let sqlParams = {$id: id};
        return this.common.findOne(sqlRequest, sqlParams)
            .then(row => new Beer(row))
            .catch(err => err);
    };
    
    // Trouver les bières d'une brasserie
    findAllByBrewery(brewery_id) {
        brewery_id = parseInt(brewery_id);
        if(isNaN(brewery_id)){
            throw new DaoError(31, "Integer required");
        }
        let sqlRequest = "SELECT * FROM beer WHERE brewery_id=$brewery_id";
        let sqlParams = {$brewery_id: brewery_id};
        return this.common.findAllWithParams(sqlRequest, sqlParams)
            .then(row => row.map(beer => new Beer(beer)))
            .catch(err => err);
    }

    // Trouver la bière d'un certain nom
    findByName(name) {
        let sqlRequest = "SELECT * FROM beer WHERE name = $name COLLATE NOCASE"
        let sqlParams = {$name: name};
        return this.common.findOne(sqlRequest, sqlParams)
            .then(row => new Beer(row))
            .catch(err => err);
    };

    // Trouver les bières dont le nom en paramètre est inclus dans le nom de la bière
    findAllByName(name){
        let sqlRequest = "SELECT * FROM beer WHERE UPPER(name) LIKE '%"+name+"%' ORDER BY name ASC LIMIT 5"
        return this.common.findAll(sqlRequest)
            .then(row => row.map(beer => new Beer(beer)))
            .catch(err => err);
    }

    // Trouver les bières ayant un degré d'alcool supérieur ou égal au volume ene paramètre
    findByVolumeHigherThan(volume) {
        volume = parseInt(volume); // on vérifie que le volume fourni peut bien être casté en entier
        if(isNaN(volume)){
            throw new DaoError(31,"Integer required");
        }

        let sqlRequest = "SELECT * FROM beer WHERE alcohol_by_volume >= $volume";
        let sqlParams = {$volume: volume};
        return this.common.findAllWithParams(sqlRequest, sqlParams)
            .then(row => row.map(beer => new Beer(beer)))
            .catch(err => err);
    };

    // Trouver les bières ayant un degré d'alcool inférieur ou égal au volume ene paramètre
    findByVolumeLowerThan(volume) {
        volume = parseInt(volume); // on vérifie que le volume fourni peut bien être casté en entier
        if(isNaN(volume)){
            throw new DaoError(31,"Integer required");
        }
        
        let sqlRequest = "SELECT * FROM beer WHERE alcohol_by_volume <= $volume";
        let sqlParams = {$volume: volume};
        return this.common.findAllWithParams(sqlRequest, sqlParams)
            .then(row => row.map(beer => new Beer(beer)))
            .catch(err => err);
    };

    // Trouver les bières venant d'un pays
    findByCountry(country) {
        let sqlRequest = "SELECT * FROM beer WHERE country = $country  COLLATE NOCASE";
        let sqlParams = {$country: country};
        return this.common.findOne(sqlRequest, sqlParams)
            .then(row => row.map(beer => new Beer(beer)))
            .catch(err => err);
    };

    // Trouver les bières venant d'une ville
    findByCity(city) {
        let sqlRequest = "SELECT * FROM beer WHERE city = $city COLLATE NOCASE";
        let sqlParams = {$city: city};
        return this.common.findAllWithParams(sqlRequest, sqlParams)
            .then(row => row.map(beer => new Beer(beer)))
            .catch(err => err);
    };

    // Trouver les bières d'une catégorie
    findByCategory(categorie) {
        if(isNaN(categorie)){
            throw new DaoError(31,"Integer required");
        }
        let sqlRequest = `SELECT * FROM beer WHERE cat_id = $categorie`;
        let sqlParams = {$categorie: categorie};
        return this.common.findAllWithParams(sqlRequest, sqlParams)
            .then(row => row.map(beer => new Beer(beer)))
            .catch(err => err);
    };
}

module.exports = BeerDAO;