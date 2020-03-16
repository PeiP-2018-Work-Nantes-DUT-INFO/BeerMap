const express = require('express');
const router = express.Router();

const GeocodeController = require('../../controller/geocodeController');
const geocodeController = new GeocodeController();

router.get('/', function (req, res) {
    geocodeController.findAll(req, res);
});

router.get('/id/:id', function (req, res) {
    geocodeController.findById(req, res);
});

router.get('/brewery-id/:id', function (req, res) {
    geocodeController.findByBreweryId(req, res);
});

router.get('/brewery-name/:name', function (req, res) {
    geocodeController.findByBreweryName(req, res);
});

router.get('/city/:name', function (req, res) {
    geocodeController.findCity(req, res);
});

module.exports = router;