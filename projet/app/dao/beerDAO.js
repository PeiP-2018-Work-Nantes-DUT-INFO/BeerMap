const Beer = require('../model/beer');

const daoCommon = require('./commons/daoCommon');

const DaoError = require('./commons/daoError');

class BeerDAO {

    constructor() {
        this.common = new daoCommon();
    }

    findAll() {
        const sqlRequest = "SELECT * FROM beer";

        return this.common.findAll(sqlRequest)
            .then(rows => {
                const beers = rows.map(row => new Beer(row));
                return beers;
            })
            .catch(err => err);
    };

    findById(id) {
        id = parseInt(id,10);
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
        let sqlRequest = "SELECT * FROM beer WHERE name=$name";
        let sqlParams = {$name: name};
        return this.common.findOne(sqlRequest, sqlParams)
            .then(row => new Beer(row))
            .catch(err => err);
    };

    findByVolumeHigherThan(volume) {
        volume = parseInt(volume,10);
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
        volume = parseInt(volume,10);
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
        let sqlRequest = "SELECT * FROM beer WHERE country = $country";
        let sqlParams = {$country: country};
        return this.common.findAllWithParams(sqlRequest, sqlParams)
            .then(row => row.map(beer => new Beer(beer)))
            .catch(err => err);
    };

    findByCity(city) {
        let sqlRequest = "SELECT * FROM beer WHERE city = $city";
        let sqlParams = {$city: city};
        return this.common.findAllWithParams(sqlRequest, sqlParams)
            .then(row => row.map(beer => new Beer(beer)))
            .catch(err => err);
    };
}

module.exports = BeerDAO;