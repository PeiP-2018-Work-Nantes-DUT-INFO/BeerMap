const Geocode = require('../model/geocode');

const daoCommon = require('./commons/daoCommon'); // fonctions de DAO communes à tous les DAO
const DaoError = require('./commons/daoError'); // pour gérer les erreurs

/**
 * DAO permettant de récupérer les géocodes selon différents critères, en faisant des requêtes dans la base de données.
 */
class GeocodeDAO {

    constructor() {
        this.common = new daoCommon();
    }

    findAll() {
        const sqlRequest = "SELECT * FROM geocode";

        return this.common.findAll(sqlRequest)
            .then(rows => rows.map(row => new Geocode(row)))
            .catch(err => err);
    };

    findById(id) {
        id = parseInt(id); // on vérifie que l'id fourni peut bien être casté en entier
        if(isNaN(id)){
            throw new DaoError(31,"Integer required");
        }

        let sqlRequest = "SELECT * FROM geocode WHERE id=$id";
        let sqlParams = {$id: id};
        return this.common.findOne(sqlRequest, sqlParams)
            .then(row => new Geocode(row))
            .catch(err => err);
    };

    findByBreweryId(brewery_id) {
        brewery_id = parseInt(brewery_id); // on vérifie que l'id fourni peut bien être casté en entier
        if(isNaN(brewery_id)){
            throw new DaoError(31,"Integer required");
        }

        let sqlRequest = "SELECT * FROM geocode WHERE brewery_id=$brewery_id";
        let sqlParams = {$brewery_id: brewery_id};
        return this.common.findOne(sqlRequest, sqlParams)
            .then(row => new Geocode(row))
            .catch(err => err);
    };

    findByBreweryName(name) {
        let sqlParams = {$name: name};
        let sqlRequest = "SELECT g.id, g.brewery_id, g.latitude, g.longitude, g.accuracy, g.coordinates FROM geocode g, brewery b WHERE g.brewery_id = b.id AND b.breweries = $name COLLATE NOCASE";
        return this.common.findOne(sqlRequest, sqlParams)
            .then(row => new Geocode(row))
            .catch(err => err);        
    };
}

module.exports = GeocodeDAO;