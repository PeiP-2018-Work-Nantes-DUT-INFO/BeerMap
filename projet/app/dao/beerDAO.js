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

    findAll() {
        const sqlRequest = "SELECT * FROM beer";

        return this.common.findAll(sqlRequest)
            .then(rows => rows.map(row => new Beer(row)))
            .catch(err => err);
    };

    findById(id) {
        id = parseInt(id); // on vérifie que l'id fourni peut bien être casté en entier
        if(isNaN(id)){
            throw new DaoError(400,"Integer required");
        }
        let sqlRequest = "SELECT * FROM beer WHERE id=$id";
        let sqlParams = {$id: id};
        return this.common.findOne(sqlRequest, sqlParams)
            .then(row => new Beer(row))
            .catch(err => err);
    };
    
    findByName(name) {
        let sqlRequest = "SELECT * FROM beer WHERE name = $name COLLATE NOCASE"
        let sqlParams = {$name: name};
        return this.common.findOne(sqlRequest, sqlParams)
            .then(row => new Beer(row))
            .catch(err => err);
    };

    findAllByName(name){
        let sqlRequest = "SELECT * FROM beer WHERE UPPER(name) LIKE '%"+name+"%' ORDER BY name ASC LIMIT 5"
        return this.common.findAll(sqlRequest)
            .then(row => row.map(beer => new Beer(beer)))
            .catch(err => err);
    }

    findByVolumeHigherThan(volume) {
        volume = parseInt(volume); // on vérifie que le volume fourni peut bien être casté en entier
        if(isNaN(volume)){
            throw new DaoError(400,"Integer required");
        }

        let sqlRequest = "SELECT * FROM beer WHERE alcohol_by_volume >= $volume";
        let sqlParams = {$volume: volume};
        return this.common.findAllWithParams(sqlRequest, sqlParams)
            .then(row => row.map(beer => new Beer(beer)))
            .catch(err => err);
    };

    findByVolumeLowerThan(volume) {
        volume = parseInt(volume); // on vérifie que le volume fourni peut bien être casté en entier
        if(isNaN(volume)){
            throw new DaoError(400,"Integer required");
        }
        
        let sqlRequest = "SELECT * FROM beer WHERE alcohol_by_volume <= $volume";
        let sqlParams = {$volume: volume};
        return this.common.findAllWithParams(sqlRequest, sqlParams)
            .then(row => row.map(beer => new Beer(beer)))
            .catch(err => err);
    };

    findByCountry(country) {
        let sqlRequest = "SELECT * FROM beer WHERE country = $country  COLLATE NOCASE";
        let sqlParams = {$country: country};
        return this.common.findOne(sqlRequest, sqlParams)
            .then(row => row.map(beer => new Beer(beer)))
            .catch(err => err);
    };

    findByCity(city) {
        let sqlRequest = "SELECT * FROM beer WHERE city = $city COLLATE NOCASE";
        let sqlParams = {$city: city};
        return this.common.findAllWithParams(sqlRequest, sqlParams)
            .then(row => row.map(beer => new Beer(beer)))
            .catch(err => err);
    };

    findByCategory(categorie) {
        let sqlRequest = `SELECT b.name, b.id, b.brewery_id, b.cat_id, b.style_id, b.alcohol_by_volume, b.international_bitterness_units, 
        b.standard_reference_method, b.universal_product_code, b.filepath, b.description, b.add_user, b.last_mod,b.style,b.category,b.brewer,
        b.address, b.city, b.state, b.country, b.coordinates, b.website FROM beer b, categorie c WHERE b.cat_id = c.id AND c.cat_name = $categorie COLLATE NOCASE
        `;
        let sqlParams = {$categorie: categorie};
        return this.common.findAllWithParams(sqlRequest, sqlParams)
            .then(row => row.map(beer => new Beer(beer)))
            .catch(err => err);
    };
}

module.exports = BeerDAO;