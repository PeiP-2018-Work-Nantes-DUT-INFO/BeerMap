const express = require('express');
const router = express.Router();

const BreweryController = require('../../controller/breweryController');
const breweryController = new BreweryController();


// Toutes les brasseries
router.get('/', function (req, res) {
    breweryController.findAll(req, res);
});

// La brasserie d'un certain id
router.get('/id/:id', function (req, res) {
    breweryController.findById(req, res);
});

// La brasserie d'un certain nom
router.get('/name/:name', function (req, res) {
    breweryController.findByName(req, res);
});

// Les brasserie d'une certaine ville
router.get('/city/:city', function (req, res) {
    breweryController.findAllByCity(req, res);
});

module.exports = router;