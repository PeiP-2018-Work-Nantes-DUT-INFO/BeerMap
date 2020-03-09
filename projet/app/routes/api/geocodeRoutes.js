const express = require('express');
const router = express.Router();

const GeocodeController = require('../../controller/geocodeController');
const geocodeController = new GeocodeController();

router.get('/', function (req, res) {
    geocodeController.findAll(res);
});

router.get('/id/:id', function (req, res) {
    geocodeController.findById(req, res);
});

router.get('/name/:name', function (req, res) {
    geocodeController.findByName(req, res);
});

module.exports = router;