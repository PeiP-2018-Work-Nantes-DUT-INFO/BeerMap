const express = require('express');
const router = express.Router();

const BreweryController = require('../../controller/breweryController');
const breweryController = new BreweryController();

router.get('/', function (req, res) {
    breweryController.findAll(req, res);
});

router.get('/id/:id', function (req, res) {
    breweryController.findById(req, res);
});

router.get('/name/:name', function (req, res) {
    breweryController.findByName(req, res);
});

router.get('/city/:city', function (req, res) {
    breweryController.findAllByCity(req, res);
});

module.exports = router;