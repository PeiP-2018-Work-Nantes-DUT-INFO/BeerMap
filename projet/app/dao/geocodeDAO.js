const Geocode = require('../model/geocode');

const daoCommon = require('./commons/daoCommon');

class GeocodeDAO {

    constructor() {
        this.common = new daoCommon();
    }

    findAll() {
        const sqlRequest = "SELECT * FROM geocode";

        return this.common.findAll(sqlRequest)
            .then(rows => {
                const geocodes = rows.map(row => new Geocode(row));
                return geocodes;
            })
            .catch(err=> console.log(err));
    };

    findById(id) {
        let sqlRequest = "SELECT * FROM geocode WHERE id=$id";
        let sqlParams = {$id: id};
        return this.common.findOne(sqlRequest, sqlParams)
            .then(row => new Geocode(row))

    };
    findByName(name) {
        let sqlRequest = "SELECT * FROM geocode WHERE breweries=$name";
        let sqlParams = {$name: name};
        return this.common.findOne(sqlRequest, sqlParams)
            .then(row => new Geocode(row))

    };
}

module.exports = GeocodeDAO;