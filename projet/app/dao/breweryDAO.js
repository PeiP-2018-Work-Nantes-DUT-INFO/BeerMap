const Brewery = require('../model/brewery');

const daoCommon = require('./commons/daoCommon');

class BreweryDAO {

    constructor() {
        this.common = new daoCommon();
    }

    findAll() {
        const sqlRequest = "SELECT * FROM brewery";

        return this.common.findAll(sqlRequest)
            .then(rows => {
                const breweries = rows.map(row => new Brewery(row));
                return breweries;
            })
            .catch(err=> console.log(err));
    };

    findById(id) {
        let sqlRequest = "SELECT * FROM brewery WHERE id=$id";
        let sqlParams = {$id: id};
        return this.common.findOne(sqlRequest, sqlParams)
            .then(row => new Brewery(row))

    };
    findByName(name) {
        let sqlRequest = "SELECT * FROM brewery WHERE breweries=$name";
        let sqlParams = {$name: name};
        return this.common.findOne(sqlRequest, sqlParams)
            .then(row => new Brewery(row))

    };
}

module.exports = BreweryDAO;