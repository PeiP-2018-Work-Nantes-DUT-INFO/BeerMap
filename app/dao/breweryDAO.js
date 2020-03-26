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
    findAllByName(name) {
        let sqlRequest = "SELECT * FROM brewery WHERE UPPER(breweries) LIKE '%" + name + "%' ORDER BY breweries ASC LIMIT 5"
        return this.common.findAll(sqlRequest)
            .then(row => row.map(beer => new Brewery(beer)))
            .catch(err => err);
    }

    // Trouver la brasserie d'un certain id
    findById(id) {
        id = parseInt(id); // on vérifie que l'id fourni peut bien être casté en entier
        if (isNaN(id)) {
            throw new DaoError(31, "Integer required");
        }

        let sqlRequest = "SELECT * FROM brewery WHERE id=$id";
        let sqlParams = { $id: id };
        return this.common.findOne(sqlRequest, sqlParams)
            .then(row => new Brewery(row))
            .catch(err => err);
    };

    // Trouver la brasserie d'un certain nom
    findByName(name) {
        let sqlRequest = "SELECT * FROM brewery WHERE breweries=$name COLLATE NOCASE";
        let sqlParams = { $name: name };
        return this.common.findOne(sqlRequest, sqlParams)
            .then(row => new Brewery(row))
            .catch(err => err);
    };

    // Trouver les brasseries d'une certaine ville
    findAllByCity(city) {
        let sqlParams = { $city: city };
        const sqlRequest = "SELECT * FROM brewery WHERE city = $city COLLATE NOCASE"

        return this.common.findAllWithParams(sqlRequest, sqlParams)
            .then(rows => rows.map(row => new Brewery(row)))
            .catch(err => err);
    };

    // Ajout d'une brasserie
    create(brewery) {
        const sqlRequest = "INSERT INTO brewery(" +
            "id, breweries, address1, address2, city,state,code,country,phone,website,filepath,descript,last_mod,coordinates) " +
            "VALUES ($id, $breweries, $address1, $address2, $city, $state, $code, $country, $phone, $website, $filepath, $descript, $last_mod, $coordinates)";

        const sqlParams = {
            $id: brewery.id,
            $breweries: brewery.breweries,
            $address1: brewery.address1,
            $address2: brewery.address2,
            $city: brewery.city,
            $state: brewery.state,
            $code: brewery.code,
            $country: brewery.country,
            $phone: brewery.phone,
            $website: brewery.website,
            $filepath: brewery.filepath,
            $descript: brewery.descript,
            $last_mod: brewery.last_mod,
            $coordinates: brewery.coordinates
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    // Suppression d'une brasserie
    deleteById(id) {
        let sqlRequest = "DELETE FROM brewery WHERE id=$id";
        let sqlParams = { $id: id };
        return this.common.run(sqlRequest, sqlParams);
    };

    // Mise à jour d'une brasserie
    update(brewery) {
        const sqlRequest = "UPDATE brewery SET " +
            "breweries=$breweries, " +
            "address1=$address1, " +
            "address2=$address2, " +
            "city=$city, " +
            "state=$state, " +
            "code=$code, " +
            "country=$country, " +
            "phone=$phone, " +
            "website=$website, " +
            "filepath=$filepath, " +
            "descript=$descript, " +
            "last_mod=$last_mod, " +
            "coordinates=$coordinates " +
            "WHERE id=$id";

        const sqlParams = {
            $id: brewery.id,
            $breweries: brewery.breweries,
            $address1: brewery.address1,
            $address2: brewery.address2,
            $city: brewery.city,
            $state: brewery.state,
            $code: brewery.code,
            $country: brewery.country,
            $phone: brewery.phone,
            $website: brewery.website,
            $filepath: brewery.filepath,
            $descript: brewery.descript,
            $last_mod: brewery.last_mod,
            $coordinates: brewery.coordinates
        };
        return this.common.run(sqlRequest, sqlParams);
    };
}

module.exports = BreweryDAO;