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
            .catch(err => err);
    };

    findById(id) {
        id = parseInt(id,10);
        if(isNaN(id)){
            throw new DaoError(400,"Integer required");
        }
        
        let sqlRequest = "SELECT * FROM brewery WHERE id=$id";
        let sqlParams = {$id: id};
        return this.common.findOne(sqlRequest, sqlParams)
            .then(row => new Brewery(row))
            .catch(err => err);
    };

    findByName(name) {
        let sqlRequest = "SELECT * FROM brewery WHERE breweries=$name";
        let sqlParams = {$name: name};
        return this.common.findOne(sqlRequest, sqlParams)
            .then(row => new Brewery(row))
            .catch(err => err);
    };

    findAllByCity(city) {
        let sqlParams = {$city: city};
        const sqlRequest = "SELECT * FROM brewery WHERE city = $city";

        return this.common.findAllWithParams(sqlRequest,sqlParams)
            .then(rows => {
                const breweries = rows.map(row => new Brewery(row));
                return breweries;
            })
            .catch(err => err);
    };
}

module.exports = BreweryDAO;