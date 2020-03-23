const express = require('express');
const router = express.Router();

const GeocodeController = require('../../controller/geocodeController');
const geocodeController = new GeocodeController();

// Tous les géocodes
router.get('/', function (req, res) {
    geocodeController.findAll(req, res);
});

// Le géocode d'un certain id
router.get('/id/:id', function (req, res) {
    geocodeController.findById(req, res);
});

// Le géocode selon l'id de la brasserie associée
router.get('/brewery-id/:id', function (req, res) {
    geocodeController.findByBreweryId(req, res);
});

// Le géocode selon le nom de la brasserie associée
router.get('/brewery-name/:name', function (req, res) {
    geocodeController.findByBreweryName(req, res);
});

// Ajouter un géocode
router.post('/', function (req, res) {
    geocodeController.create(req,res);
});

// Mettre à jour un géocode
router.put('/id/:id', function (req, res) {
    geocodeController.update(req, res)
});

// Supprimer un géocode
router.delete('/id/:id', function (req, res) {
    geocodeController.deleteById(req, res)
});


/*------------------------------------------------------------*/

// N'utilise pas notre API REST mais utilise une API externe pour trouver une ville
router.get('/city/:name', function (req, res) {
    geocodeController.findCity(req, res);
});

module.exports = router;