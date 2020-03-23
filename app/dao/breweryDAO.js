const Brewery = require('../model/brewery');

const daoCommon = require('./commons/daoCommon'); // fonctions de DAO communes à tous les DAO
const DaoError = require('./commons/daoError'); // pour gérer les erreurs

/**
 * DAO permettant de récupérer les brasseries selon différents critères, en faisant des requêtes dans la base de données.
 */
class BreweryDAO {

    constructor() {
        this.common = new daoCommon();
    }

    // Trouver toutes les brasseries
    findAll() {
        const sqlRequest = "SELECT * FROM brewery";
        return this.common.findAll(sqlRequest)
            .then(rows => rows.map(row => new Brewery(row)))
            .catch(err => err);
    };

    // Trouver les brasseries dont le nom en paramètre est inclus dans le nom de la brasserie
    findAllByName(name){
        let sqlRequest = "SELECT * FROM brewery WHERE UPPER(breweries) LIKE '%"+name+"%' ORDER BY breweries ASC LIMIT 5"
        return this.common.findAll(sqlRequest)
            .then(row => row.map(beer => new Brewery(beer)))
            .catch(err => err);
    }

    // Trouver la brasserie d'un certain id
    findById(id) {
        id = parseInt(id); // on vérifie que l'id fourni peut bien être casté en entier
        if(isNaN(id)){
            throw new DaoError(31,"Integer required");
        }
        
        let sqlRequest = "SELECT * FROM brewery WHERE id=$id";
        let sqlParams = {$id: id};
        return this.common.findOne(sqlRequest, sqlParams)
            .then(row => new Brewery(row))
            .catch(err => err);
    };

    // Trouver la brasserie d'un certain nom
    findByName(name) {
        let sqlRequest = "SELECT * FROM brewery WHERE breweries=$name COLLATE NOCASE";
        let sqlParams = {$name: name};
        return this.common.findOne(sqlRequest, sqlParams)
            .then(row => new Brewery(row))
            .catch(err => err);
    };

    // Trouver les brasseries d'une certaine ville
    findAllByCity(city) {
        let sqlParams = {$city: city};
        const sqlRequest = "SELECT * FROM brewery WHERE city = $city COLLATE NOCASE"

        return this.common.findAllWithParams(sqlRequest,sqlParams)
            .then(rows => rows.map(row => new Brewery(row)))
            .catch(err => err);
    };
        
}

module.exports = BreweryDAO;