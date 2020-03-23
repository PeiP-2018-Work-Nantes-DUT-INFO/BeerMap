/**
 * Utilise une API pour trouver une ville
 */
const axios = require("axios");

const base_url = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?f=json"

function searchByName(search) {
    return new Promise((resolve, reject) => {

        const url = base_url + "&singleLine=" + search + "&maxLocations=3"

        axios.get(url).then(data => {
            resolve(data.data.candidates)
        }).catch(reject)
    })
}

module.exports.searchByName = searchByName